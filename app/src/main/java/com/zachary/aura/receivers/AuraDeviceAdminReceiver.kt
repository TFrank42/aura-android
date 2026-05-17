package com.zachary.aura.receivers

import android.app.admin.DeviceAdminReceiver
import android.content.Context
import android.content.Intent

/**
 * AURA Device Admin Receiver
 * Handles device admin callbacks
 * Author: Zachary McCulloch
 */
class AuraDeviceAdminReceiver : DeviceAdminReceiver() {

    override fun onEnabled(context: Context, intent: Intent) {
        super.onEnabled(context, intent)
        // Device admin enabled
    }

    override fun onDisabled(context: Context, intent: Intent) {
        super.onDisabled(context, intent)
        // Device admin disabled
    }

    override fun onPasswordChanged(context: Context, intent: Intent) {
        super.onPasswordChanged(context, intent)
        // Password changed
    }

    override fun onPasswordFailed(context: Context, intent: Intent) {
        super.onPasswordFailed(context, intent)
        // Password failed
    }

    override fun onPasswordSucceeded(context: Context, intent: Intent) {
        super.onPasswordSucceeded(context, intent)
        // Password succeeded
    }
}
