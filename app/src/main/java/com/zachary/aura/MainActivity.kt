package com.zachary.aura

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import android.Manifest
import android.content.pm.PackageManager
import com.zachary.aura.services.AuraAccessibilityService
import com.zachary.aura.services.AuraForegroundService

/**
 * AURA Main Activity
 * Entry point for the Adaptive Universal Runtime Agent
 * Author: Zachary McCulloch
 */
class MainActivity : AppCompatActivity() {

    companion object {
        private const val PERMISSION_REQUEST_CODE = 1001
        private const val ACCESSIBILITY_REQUEST_CODE = 1002
    }

    private val requiredPermissions = arrayOf(
        Manifest.permission.READ_CONTACTS,
        Manifest.permission.CALL_PHONE,
        Manifest.permission.SEND_SMS,
        Manifest.permission.READ_SMS,
        Manifest.permission.READ_CALL_LOG,
        Manifest.permission.RECORD_AUDIO,
        Manifest.permission.CAMERA,
        Manifest.permission.ACCESS_FINE_LOCATION,
        Manifest.permission.READ_CALENDAR,
        Manifest.permission.READ_EXTERNAL_STORAGE,
        Manifest.permission.ACCESS_WIFI_STATE,
        Manifest.permission.CHANGE_WIFI_STATE,
        Manifest.permission.BLUETOOTH,
        Manifest.permission.BLUETOOTH_ADMIN,
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Request permissions
        requestRequiredPermissions()

        // Check if accessibility service is enabled
        checkAccessibilityService()

        // Start foreground service
        startAuraService()

        // Initialize AURA
        initializeAURA()
    }

    /**
     * Request all required permissions
     */
    private fun requestRequiredPermissions() {
        val permissionsToRequest = mutableListOf<String>()

        for (permission in requiredPermissions) {
            if (ContextCompat.checkSelfPermission(this, permission)
                != PackageManager.PERMISSION_GRANTED
            ) {
                permissionsToRequest.add(permission)
            }
        }

        if (permissionsToRequest.isNotEmpty()) {
            ActivityCompat.requestPermissions(
                this,
                permissionsToRequest.toTypedArray(),
                PERMISSION_REQUEST_CODE
            )
        }
    }

    /**
     * Check if accessibility service is enabled
     */
    private fun checkAccessibilityService() {
        val accessibilityEnabled = isAccessibilityServiceEnabled()

        if (!accessibilityEnabled) {
            showAccessibilityDialog()
        }
    }

    /**
     * Check if accessibility service is enabled
     */
    private fun isAccessibilityServiceEnabled(): Boolean {
        val accessibilityManager = getSystemService(ACCESSIBILITY_SERVICE) as android.view.accessibility.AccessibilityManager
        return accessibilityManager.isEnabled
    }

    /**
     * Show dialog to enable accessibility service
     */
    private fun showAccessibilityDialog() {
        val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
        startActivityForResult(intent, ACCESSIBILITY_REQUEST_CODE)
    }

    /**
     * Start AURA foreground service
     */
    private fun startAuraService() {
        val serviceIntent = Intent(this, AuraForegroundService::class.java)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(serviceIntent)
        } else {
            startService(serviceIntent)
        }
    }

    /**
     * Initialize AURA
     */
    private fun initializeAURA() {
        // Initialize device scanner
        DeviceScanner.initialize(this)

        // Initialize task executor
        TaskExecutor.initialize(this)

        // Initialize ML models
        MLModelManager.initialize(this)

        // Initialize personal data engine
        PersonalDataEngine.initialize(this)

        // Show boot sequence
        showBootSequence()
    }

    /**
     * Show AURA boot sequence
     */
    private fun showBootSequence() {
        val bootView = findViewById<View>(R.id.boot_sequence)
        bootView?.visibility = View.VISIBLE

        // Simulate boot sequence
        Thread {
            Thread.sleep(2000)
            runOnUiThread {
                bootView?.visibility = View.GONE
                showMainInterface()
            }
        }.start()
    }

    /**
     * Show main AURA interface
     */
    private fun showMainInterface() {
        val mainInterface = findViewById<View>(R.id.main_interface)
        mainInterface?.visibility = View.VISIBLE
    }

    /**
     * Handle permission request result
     */
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        when (requestCode) {
            PERMISSION_REQUEST_CODE -> {
                for (i in permissions.indices) {
                    if (grantResults[i] == PackageManager.PERMISSION_GRANTED) {
                        // Permission granted
                    } else {
                        // Permission denied
                    }
                }
            }
        }
    }
}
