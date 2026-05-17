package com.zachary.aura

import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.provider.ContactsContract
import android.provider.CallLog
import android.database.Cursor
import android.os.Build
import android.telephony.TelephonyManager
import android.net.wifi.WifiManager
import android.bluetooth.BluetoothAdapter
import android.location.LocationManager
import kotlinx.coroutines.*

/**
 * AURA Device Scanner
 * Scans device for apps, contacts, system info
 * Author: Zachary McCulloch
 */
object DeviceScanner {

    private lateinit var context: Context
    private val scope = CoroutineScope(Dispatchers.Default + Job())

    data class DeviceProfile(
        val deviceName: String,
        val androidVersion: String,
        val manufacturer: String,
        val model: String,
        val installedApps: List<AppInfo>,
        val contacts: List<ContactInfo>,
        val callHistory: List<CallInfo>,
        val systemInfo: SystemInfo,
        val lastScanTime: Long = System.currentTimeMillis()
    )

    data class AppInfo(
        val packageName: String,
        val appName: String,
        val isSystemApp: Boolean,
        val isDefault: Boolean = false
    )

    data class ContactInfo(
        val name: String,
        val phoneNumber: String,
        val email: String?,
        val frequency: Int = 0
    )

    data class CallInfo(
        val contactName: String,
        val phoneNumber: String,
        val duration: Long,
        val timestamp: Long,
        val type: Int // 1=incoming, 2=outgoing, 3=missed
    )

    data class SystemInfo(
        val wifiEnabled: Boolean,
        val bluetoothEnabled: Boolean,
        val gpsEnabled: Boolean,
        val batteryPercentage: Int,
        val storageUsed: Long,
        val storageTotal: Long
    )

    fun initialize(ctx: Context) {
        context = ctx
    }

    /**
     * Perform full device scan
     */
    suspend fun scanDevice(): DeviceProfile = withContext(Dispatchers.Default) {
        return@withContext DeviceProfile(
            deviceName = Build.DEVICE,
            androidVersion = Build.VERSION.RELEASE,
            manufacturer = Build.MANUFACTURER,
            model = Build.MODEL,
            installedApps = scanInstalledApps(),
            contacts = scanContacts(),
            callHistory = scanCallHistory(),
            systemInfo = getSystemInfo()
        )
    }

    /**
     * Scan installed apps
     */
    private fun scanInstalledApps(): List<AppInfo> {
        val packageManager = context.packageManager
        val apps = mutableListOf<AppInfo>()

        val packages = packageManager.getInstalledApplications(PackageManager.GET_META_DATA)

        for (app in packages) {
            val appName = packageManager.getApplicationLabel(app).toString()
            val isSystemApp = (app.flags and ApplicationInfo.FLAG_SYSTEM) != 0

            apps.add(
                AppInfo(
                    packageName = app.packageName,
                    appName = appName,
                    isSystemApp = isSystemApp
                )
            )
        }

        // Mark default apps
        markDefaultApps(apps)

        return apps
    }

    /**
     * Mark default apps
     */
    private fun markDefaultApps(apps: MutableList<AppInfo>) {
        val defaultApps = mapOf(
            "messaging" to listOf("com.android.messaging", "com.whatsapp"),
            "email" to listOf("com.google.android.gm", "com.microsoft.office.outlook"),
            "phone" to listOf("com.android.phone", "com.google.android.dialer"),
            "maps" to listOf("com.google.android.apps.maps"),
            "music" to listOf("com.spotify.music", "com.apple.music")
        )

        for ((type, packages) in defaultApps) {
            for (app in apps) {
                if (packages.contains(app.packageName)) {
                    app.copy(isDefault = true)
                    break
                }
            }
        }
    }

    /**
     * Scan contacts
     */
    private fun scanContacts(): List<ContactInfo> {
        val contacts = mutableListOf<ContactInfo>()
        val cursor: Cursor? = context.contentResolver.query(
            ContactsContract.Contacts.CONTENT_URI,
            null,
            null,
            null,
            null
        )

        cursor?.use {
            while (it.moveToNext()) {
                val id = it.getString(it.getColumnIndex(ContactsContract.Contacts._ID))
                val name = it.getString(it.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME))

                // Get phone number
                val phoneCursor: Cursor? = context.contentResolver.query(
                    ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                    null,
                    ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = ?",
                    arrayOf(id),
                    null
                )

                var phoneNumber = ""
                phoneCursor?.use { pc ->
                    if (pc.moveToFirst()) {
                        phoneNumber = pc.getString(
                            pc.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER)
                        )
                    }
                }

                contacts.add(
                    ContactInfo(
                        name = name,
                        phoneNumber = phoneNumber,
                        email = null
                    )
                )
            }
        }

        return contacts
    }

    /**
     * Scan call history
     */
    private fun scanCallHistory(): List<CallInfo> {
        val calls = mutableListOf<CallInfo>()
        val cursor: Cursor? = context.contentResolver.query(
            CallLog.Calls.CONTENT_URI,
            null,
            null,
            null,
            CallLog.Calls.DATE + " DESC LIMIT 50"
        )

        cursor?.use {
            while (it.moveToNext()) {
                val name = it.getString(it.getColumnIndex(CallLog.Calls.CACHED_NAME))
                val number = it.getString(it.getColumnIndex(CallLog.Calls.NUMBER))
                val duration = it.getLong(it.getColumnIndex(CallLog.Calls.DURATION))
                val timestamp = it.getLong(it.getColumnIndex(CallLog.Calls.DATE))
                val type = it.getInt(it.getColumnIndex(CallLog.Calls.TYPE))

                calls.add(
                    CallInfo(
                        contactName = name ?: "Unknown",
                        phoneNumber = number,
                        duration = duration,
                        timestamp = timestamp,
                        type = type
                    )
                )
            }
        }

        return calls
    }

    /**
     * Get system info
     */
    private fun getSystemInfo(): SystemInfo {
        val wifiManager = context.getSystemService(Context.WIFI_SERVICE) as WifiManager
        val bluetoothAdapter = BluetoothAdapter.getDefaultAdapter()
        val locationManager = context.getSystemService(Context.LOCATION_SERVICE) as LocationManager
        val telephonyManager = context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager

        return SystemInfo(
            wifiEnabled = wifiManager.isWifiEnabled,
            bluetoothEnabled = bluetoothAdapter?.isEnabled ?: false,
            gpsEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER),
            batteryPercentage = getBatteryPercentage(),
            storageUsed = getStorageUsed(),
            storageTotal = getStorageTotal()
        )
    }

    /**
     * Get battery percentage
     */
    private fun getBatteryPercentage(): Int {
        val batteryManager = context.getSystemService(Context.BATTERY_SERVICE) as android.os.BatteryManager
        return batteryManager.getIntProperty(android.os.BatteryManager.BATTERY_PROPERTY_CAPACITY)
    }

    /**
     * Get storage used
     */
    private fun getStorageUsed(): Long {
        val stat = android.os.StatFs(android.os.Environment.getExternalStorageDirectory().path)
        return (stat.blockCountLong - stat.availableBlocksLong) * stat.blockSizeLong
    }

    /**
     * Get storage total
     */
    private fun getStorageTotal(): Long {
        val stat = android.os.StatFs(android.os.Environment.getExternalStorageDirectory().path)
        return stat.blockCountLong * stat.blockSizeLong
    }
}
