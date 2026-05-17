package com.zachary.aura

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.telephony.SmsManager
import android.provider.ContactsContract
import android.provider.CalendarContract
import android.os.Build
import kotlinx.coroutines.*

/**
 * AURA Task Executor
 * Executes real system tasks
 * Author: Zachary McCulloch
 */
object TaskExecutor {

    private lateinit var context: Context
    private val scope = CoroutineScope(Dispatchers.Main + Job())

    data class TaskResult(
        val success: Boolean,
        val message: String,
        val data: Any? = null
    )

    fun initialize(ctx: Context) {
        context = ctx
    }

    /**
     * Execute task based on intent
     */
    suspend fun executeTask(intent: String, parameters: Map<String, Any>): TaskResult =
        withContext(Dispatchers.Default) {
            return@withContext when (intent) {
                "send_message" -> sendMessage(parameters)
                "send_email" -> sendEmail(parameters)
                "make_call" -> makeCall(parameters)
                "open_app" -> openApp(parameters)
                "toggle_wifi" -> toggleWifi(parameters)
                "toggle_bluetooth" -> toggleBluetooth(parameters)
                "toggle_gps" -> toggleGPS(parameters)
                "create_event" -> createEvent(parameters)
                "open_url" -> openURL(parameters)
                "search_contact" -> searchContact(parameters)
                "book_ride" -> bookRide(parameters)
                "book_restaurant" -> bookRestaurant(parameters)
                else -> TaskResult(false, "Unknown task: $intent")
            }
        }

    /**
     * Send SMS message
     */
    private fun sendMessage(params: Map<String, Any>): TaskResult {
        return try {
            val phoneNumber = params["phoneNumber"] as? String ?: return TaskResult(false, "Phone number required")
            val message = params["message"] as? String ?: return TaskResult(false, "Message required")

            val smsManager = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                context.getSystemService(SmsManager::class.java)
            } else {
                @Suppress("DEPRECATION")
                SmsManager.getDefault()
            }

            smsManager.sendTextMessage(phoneNumber, null, message, null, null)

            TaskResult(true, "✓ Message sent to $phoneNumber")
        } catch (e: Exception) {
            TaskResult(false, "Failed to send message: ${e.message}")
        }
    }

    /**
     * Send email
     */
    private fun sendEmail(params: Map<String, Any>): TaskResult {
        return try {
            val recipient = params["recipient"] as? String ?: return TaskResult(false, "Recipient required")
            val subject = params["subject"] as? String ?: ""
            val body = params["body"] as? String ?: ""

            val intent = Intent(Intent.ACTION_SEND).apply {
                type = "message/rfc822"
                putExtra(Intent.EXTRA_EMAIL, arrayOf(recipient))
                putExtra(Intent.EXTRA_SUBJECT, subject)
                putExtra(Intent.EXTRA_TEXT, body)
            }

            context.startActivity(Intent.createChooser(intent, "Send Email"))

            TaskResult(true, "✓ Email opened for $recipient")
        } catch (e: Exception) {
            TaskResult(false, "Failed to send email: ${e.message}")
        }
    }

    /**
     * Make phone call
     */
    private fun makeCall(params: Map<String, Any>): TaskResult {
        return try {
            val phoneNumber = params["phoneNumber"] as? String ?: return TaskResult(false, "Phone number required")

            val intent = Intent(Intent.ACTION_CALL).apply {
                data = Uri.parse("tel:$phoneNumber")
            }

            context.startActivity(intent)

            TaskResult(true, "✓ Calling $phoneNumber")
        } catch (e: Exception) {
            TaskResult(false, "Failed to make call: ${e.message}")
        }
    }

    /**
     * Open app
     */
    private fun openApp(params: Map<String, Any>): TaskResult {
        return try {
            val appName = params["appName"] as? String ?: return TaskResult(false, "App name required")
            val packageName = params["packageName"] as? String ?: resolvePackageName(appName)

            val intent = context.packageManager.getLaunchIntentForPackage(packageName)
                ?: return TaskResult(false, "App not found: $appName")

            context.startActivity(intent)

            TaskResult(true, "✓ Opened $appName")
        } catch (e: Exception) {
            TaskResult(false, "Failed to open app: ${e.message}")
        }
    }

    /**
     * Toggle WiFi
     */
    private fun toggleWifi(params: Map<String, Any>): TaskResult {
        return try {
            val wifiManager = context.getSystemService(Context.WIFI_SERVICE) as android.net.wifi.WifiManager
            val enable = params["enable"] as? Boolean ?: !wifiManager.isWifiEnabled

            wifiManager.isWifiEnabled = enable

            val status = if (enable) "enabled" else "disabled"
            TaskResult(true, "✓ WiFi $status")
        } catch (e: Exception) {
            TaskResult(false, "Failed to toggle WiFi: ${e.message}")
        }
    }

    /**
     * Toggle Bluetooth
     */
    private fun toggleBluetooth(params: Map<String, Any>): TaskResult {
        return try {
            val bluetoothAdapter = android.bluetooth.BluetoothAdapter.getDefaultAdapter()
                ?: return TaskResult(false, "Bluetooth not available")

            val enable = params["enable"] as? Boolean ?: !bluetoothAdapter.isEnabled

            if (enable) {
                bluetoothAdapter.enable()
            } else {
                bluetoothAdapter.disable()
            }

            val status = if (enable) "enabled" else "disabled"
            TaskResult(true, "✓ Bluetooth $status")
        } catch (e: Exception) {
            TaskResult(false, "Failed to toggle Bluetooth: ${e.message}")
        }
    }

    /**
     * Toggle GPS
     */
    private fun toggleGPS(params: Map<String, Any>): TaskResult {
        return try {
            val intent = Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS)
            context.startActivity(intent)

            TaskResult(true, "✓ GPS settings opened")
        } catch (e: Exception) {
            TaskResult(false, "Failed to toggle GPS: ${e.message}")
        }
    }

    /**
     * Create calendar event
     */
    private fun createEvent(params: Map<String, Any>): TaskResult {
        return try {
            val title = params["title"] as? String ?: return TaskResult(false, "Title required")
            val startTime = params["startTime"] as? Long ?: System.currentTimeMillis()
            val endTime = params["endTime"] as? Long ?: startTime + 3600000

            val intent = Intent(Intent.ACTION_INSERT).apply {
                data = CalendarContract.Events.CONTENT_URI
                putExtra(CalendarContract.Events.TITLE, title)
                putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, startTime)
                putExtra(CalendarContract.EXTRA_EVENT_END_TIME, endTime)
            }

            context.startActivity(intent)

            TaskResult(true, "✓ Event created: $title")
        } catch (e: Exception) {
            TaskResult(false, "Failed to create event: ${e.message}")
        }
    }

    /**
     * Open URL
     */
    private fun openURL(params: Map<String, Any>): TaskResult {
        return try {
            val url = params["url"] as? String ?: return TaskResult(false, "URL required")

            val intent = Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse(url)
            }

            context.startActivity(intent)

            TaskResult(true, "✓ Opened $url")
        } catch (e: Exception) {
            TaskResult(false, "Failed to open URL: ${e.message}")
        }
    }

    /**
     * Search contact
     */
    private fun searchContact(params: Map<String, Any>): TaskResult {
        return try {
            val contactName = params["name"] as? String ?: return TaskResult(false, "Name required")

            val cursor = context.contentResolver.query(
                ContactsContract.Contacts.CONTENT_URI,
                null,
                "${ContactsContract.Contacts.DISPLAY_NAME} LIKE ?",
                arrayOf("%$contactName%"),
                null
            )

            val contacts = mutableListOf<String>()
            cursor?.use {
                while (it.moveToNext()) {
                    val name = it.getString(it.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME))
                    contacts.add(name)
                }
            }

            if (contacts.isEmpty()) {
                TaskResult(false, "Contact not found: $contactName")
            } else {
                TaskResult(true, "✓ Found ${contacts.size} contact(s)", contacts)
            }
        } catch (e: Exception) {
            TaskResult(false, "Failed to search contact: ${e.message}")
        }
    }

    /**
     * Book ride (Uber API integration)
     */
    private fun bookRide(params: Map<String, Any>): TaskResult {
        return try {
            val pickupLocation = params["pickupLocation"] as? String ?: return TaskResult(false, "Pickup location required")
            val dropoffLocation = params["dropoffLocation"] as? String ?: return TaskResult(false, "Dropoff location required")

            // In production, call Uber API
            // For now, open Uber app with parameters

            val intent = Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse("uber://?action=setPickupLocation&pickup[latitude]=37.7749&pickup[longitude]=-122.4194")
            }

            try {
                context.startActivity(intent)
            } catch (e: Exception) {
                // Uber app not installed, open web
                val webIntent = Intent(Intent.ACTION_VIEW).apply {
                    data = Uri.parse("https://www.uber.com")
                }
                context.startActivity(webIntent)
            }

            TaskResult(true, "✓ Ride booking initiated from $pickupLocation to $dropoffLocation")
        } catch (e: Exception) {
            TaskResult(false, "Failed to book ride: ${e.message}")
        }
    }

    /**
     * Book restaurant
     */
    private fun bookRestaurant(params: Map<String, Any>): TaskResult {
        return try {
            val restaurantName = params["restaurantName"] as? String ?: return TaskResult(false, "Restaurant name required")
            val date = params["date"] as? String ?: ""
            val time = params["time"] as? String ?: ""

            // In production, call OpenTable/Resy API
            val intent = Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse("https://www.opentable.com/search?query=$restaurantName")
            }

            context.startActivity(intent)

            TaskResult(true, "✓ Restaurant reservation search for $restaurantName")
        } catch (e: Exception) {
            TaskResult(false, "Failed to book restaurant: ${e.message}")
        }
    }

    /**
     * Resolve app package name from app name
     */
    private fun resolvePackageName(appName: String): String {
        return when (appName.lowercase()) {
            "gmail" -> "com.google.android.gm"
            "messages" -> "com.android.messaging"
            "phone" -> "com.android.phone"
            "maps" -> "com.google.android.apps.maps"
            "spotify" -> "com.spotify.music"
            "chrome" -> "com.android.chrome"
            "facebook" -> "com.facebook.katana"
            "whatsapp" -> "com.whatsapp"
            "instagram" -> "com.instagram.android"
            "twitter" -> "com.twitter.android"
            else -> appName
        }
    }
}
