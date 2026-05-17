package com.zachary.aura

import android.content.Context
import android.content.SharedPreferences
import kotlinx.coroutines.*
import java.util.*

/**
 * AURA Personal Data Engine
 * Learns usage patterns and makes predictions
 * Author: Zachary McCulloch
 */
object PersonalDataEngine {

    private lateinit var context: Context
    private lateinit var prefs: SharedPreferences
    private val scope = CoroutineScope(Dispatchers.Default + Job())

    data class UsagePattern(
        val action: String,
        val frequency: Int,
        val timeOfDay: String,
        val dayOfWeek: String,
        val confidence: Double
    )

    data class Prediction(
        val action: String,
        val reason: String,
        val confidence: Double,
        val timestamp: Long = System.currentTimeMillis()
    )

    fun initialize(ctx: Context) {
        context = ctx
        prefs = ctx.getSharedPreferences("aura_personal_data", Context.MODE_PRIVATE)
    }

    /**
     * Record action
     */
    fun recordAction(action: String) {
        scope.launch {
            val key = "action_$action"
            val count = prefs.getInt(key, 0)
            prefs.edit().putInt(key, count + 1).apply()

            // Record time of day
            val hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY)
            val timeOfDay = when {
                hour < 6 -> "night"
                hour < 12 -> "morning"
                hour < 18 -> "afternoon"
                else -> "evening"
            }

            val timeKey = "time_${action}_$timeOfDay"
            val timeCount = prefs.getInt(timeKey, 0)
            prefs.edit().putInt(timeKey, timeCount + 1).apply()

            // Record day of week
            val dayOfWeek = Calendar.getInstance().get(Calendar.DAY_OF_WEEK)
            val dayKey = "day_${action}_$dayOfWeek"
            val dayCount = prefs.getInt(dayKey, 0)
            prefs.edit().putInt(dayKey, dayCount + 1).apply()
        }
    }

    /**
     * Get usage patterns
     */
    fun getUsagePatterns(): List<UsagePattern> {
        val patterns = mutableListOf<UsagePattern>()

        val allPrefs = prefs.all
        val actions = allPrefs.keys.filter { it.startsWith("action_") }
            .map { it.removePrefix("action_") }
            .distinct()

        for (action in actions) {
            val frequency = prefs.getInt("action_$action", 0)

            // Find most common time of day
            val times = listOf("morning", "afternoon", "evening", "night")
            var mostCommonTime = "afternoon"
            var maxTimeCount = 0

            for (time in times) {
                val count = prefs.getInt("time_${action}_$time", 0)
                if (count > maxTimeCount) {
                    maxTimeCount = count
                    mostCommonTime = time
                }
            }

            // Find most common day
            var mostCommonDay = "weekday"
            var maxDayCount = 0

            for (day in 1..7) {
                val count = prefs.getInt("day_${action}_$day", 0)
                if (count > maxDayCount) {
                    maxDayCount = count
                    mostCommonDay = getDayName(day)
                }
            }

            val confidence = minOf(1.0, frequency / 10.0)

            patterns.add(
                UsagePattern(
                    action = action,
                    frequency = frequency,
                    timeOfDay = mostCommonTime,
                    dayOfWeek = mostCommonDay,
                    confidence = confidence
                )
            )
        }

        return patterns.sortedByDescending { it.frequency }
    }

    /**
     * Generate predictions
     */
    fun generatePredictions(): List<Prediction> {
        val predictions = mutableListOf<Prediction>()
        val patterns = getUsagePatterns()
        val now = Calendar.getInstance()
        val currentHour = now.get(Calendar.HOUR_OF_DAY)
        val currentDay = now.get(Calendar.DAY_OF_WEEK)

        val currentTimeOfDay = when {
            currentHour < 6 -> "night"
            currentHour < 12 -> "morning"
            currentHour < 18 -> "afternoon"
            else -> "evening"
        }

        for (pattern in patterns) {
            // Predict based on time of day
            if (pattern.timeOfDay == currentTimeOfDay && pattern.frequency > 2) {
                predictions.add(
                    Prediction(
                        action = pattern.action,
                        reason = "You usually ${pattern.action} in the ${pattern.timeOfDay}",
                        confidence = pattern.confidence
                    )
                )
            }

            // Predict based on battery
            if (pattern.action == "enable_power_saving" && shouldEnablePowerSaving()) {
                predictions.add(
                    Prediction(
                        action = "enable_power_saving",
                        reason = "Battery is low, consider enabling power-saving mode",
                        confidence = 0.95
                    )
                )
            }

            // Predict based on calendar
            if (pattern.action == "enable_dnd" && hasUpcomingMeeting()) {
                predictions.add(
                    Prediction(
                        action = "enable_dnd",
                        reason = "You have an upcoming meeting, enable Do Not Disturb?",
                        confidence = 0.9
                    )
                )
            }
        }

        return predictions.sortedByDescending { it.confidence }
    }

    /**
     * Get learning summary
     */
    fun getLearningsSummary(): String {
        val patterns = getUsagePatterns()

        if (patterns.isEmpty()) {
            return "I'm still learning about your habits. Keep using AURA!"
        }

        val summary = StringBuilder("I've learned about your habits:\n")

        for ((index, pattern) in patterns.take(5).withIndex()) {
            summary.append("${index + 1}. You ${pattern.action} frequently (${pattern.frequency} times)\n")
            summary.append("   Usually ${pattern.timeOfDay}, ${pattern.dayOfWeek}\n")
        }

        return summary.toString()
    }

    /**
     * Should enable power saving
     */
    private fun shouldEnablePowerSaving(): Boolean {
        // Check battery percentage
        val batteryManager = context.getSystemService(Context.BATTERY_SERVICE) as android.os.BatteryManager
        val batteryPercentage = batteryManager.getIntProperty(android.os.BatteryManager.BATTERY_PROPERTY_CAPACITY)

        return batteryPercentage < 20
    }

    /**
     * Has upcoming meeting
     */
    private fun hasUpcomingMeeting(): Boolean {
        // Check calendar for events in next 30 minutes
        val now = System.currentTimeMillis()
        val thirtyMinutesLater = now + 30 * 60 * 1000

        try {
            val cursor = context.contentResolver.query(
                android.provider.CalendarContract.Events.CONTENT_URI,
                null,
                "${android.provider.CalendarContract.Events.DTSTART} > ? AND ${android.provider.CalendarContract.Events.DTSTART} < ?",
                arrayOf(now.toString(), thirtyMinutesLater.toString()),
                null
            )

            val hasEvent = cursor?.count ?: 0 > 0
            cursor?.close()

            return hasEvent
        } catch (e: Exception) {
            return false
        }
    }

    /**
     * Get day name
     */
    private fun getDayName(day: Int): String {
        return when (day) {
            1 -> "Sunday"
            2 -> "Monday"
            3 -> "Tuesday"
            4 -> "Wednesday"
            5 -> "Thursday"
            6 -> "Friday"
            7 -> "Saturday"
            else -> "Unknown"
        }
    }

    /**
     * Clear all data
     */
    fun clearAllData() {
        prefs.edit().clear().apply()
    }
}
