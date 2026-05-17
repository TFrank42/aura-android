# AURA - Adaptive Universal Runtime Agent

**Real on-device AI system for Android**

Author: Zachary McCulloch  
Version: 1.0.0  
Target: Android 8.0+ (API 26+)

---

## Overview

AURA is a native Android application that provides advanced on-device AI capabilities:

- **Real task execution** — Send messages, make calls, open apps, control system settings
- **Device intelligence** — Scans and understands your device (apps, contacts, system)
- **Personal learning** — Learns your usage patterns and makes predictions
- **Multimodal input** — Text, voice, touch, and visual input
- **Real-time translation** — Translate phone calls in real-time
- **System overlay** — Persistent overlay accessible via gesture or voice
- **Local ML** — All processing on-device using TensorFlow Lite and ML Kit

---

## Features

### 1. Device Scanner
- Scans installed apps
- Reads contacts
- Analyzes call history
- Monitors system status (WiFi, Bluetooth, GPS, battery)
- Periodic rescans every 4 hours

### 2. Task Executor
Real execution of:
- **Messaging** — Send SMS, WhatsApp, Telegram
- **Calling** — Make phone calls
- **Email** — Send emails via Gmail/Outlook
- **App Launching** — Open any installed app
- **System Control** — Toggle WiFi, Bluetooth, GPS
- **Calendar** — Create events
- **Bookings** — Uber rides, restaurant reservations
- **Web** — Open URLs in browser

### 3. ML Inference
- **Intent Recognition** — Understand user intent
- **Entity Extraction** — Extract names, locations, times
- **Translation** — Real-time translation (7 languages)
- **Language Detection** — Auto-detect input language
- **Text Summarization** — Summarize articles
- **Speech Recognition** — Convert speech to text

### 4. Personal Data Engine
- **Usage Tracking** — Records all actions
- **Pattern Learning** — Learns when you use each feature
- **Predictions** — Suggests actions based on patterns
- **Smart Suggestions** — "Enable power-saving before meeting?"

### 5. Accessibility Service
- **System Overlay** — Persistent overlay across all apps
- **Gesture Detection** — Side button press, swipe gestures
- **Voice Activation** — "Hey AURA" wake-up phrase
- **Context Awareness** — Knows current app and screen content

---

## Installation

### Prerequisites
- Android Studio 2023.1+
- Android SDK 34
- Kotlin 1.9+
- Gradle 8.1+

### Build APK

```bash
# Clone repository
git clone https://github.com/zachary/aura-android.git
cd aura-android

# Build debug APK
./gradlew assembleDebug

# Build release APK
./gradlew assembleRelease

# APK location: app/build/outputs/apk/
```

### Install on Device

```bash
# Connect Samsung S10
adb devices

# Install APK
adb install app/build/outputs/apk/debug/app-debug.apk

# Or use Android Studio: Run → Select Device
```

---

## Permissions Required

AURA requires the following permissions (requested on first launch):

| Permission | Purpose |
|-----------|---------|
| READ_CONTACTS | Access your contacts |
| CALL_PHONE | Make phone calls |
| SEND_SMS | Send text messages |
| READ_SMS | Read messages |
| READ_CALL_LOG | View call history |
| RECORD_AUDIO | Voice input |
| CAMERA | Visual input |
| ACCESS_FINE_LOCATION | GPS access |
| READ_CALENDAR | View events |
| READ_EXTERNAL_STORAGE | Access files |
| CHANGE_WIFI_STATE | Toggle WiFi |
| BLUETOOTH | Bluetooth control |
| BIND_ACCESSIBILITY_SERVICE | System overlay |

---

## Usage

### Activation Methods

1. **Side Button Long Press** — Hold volume button for 2 seconds
2. **Voice Wake-Up** — Say "Hey AURA" or "Aura"
3. **Bottom-Corner Swipe** — Swipe from bottom-right corner
4. **Double Tap** — Double tap anywhere on screen

### Commands

```
"Send a message to John"
→ AURA finds John in contacts, opens SMS app

"Call mom"
→ AURA finds mom's number, initiates call

"Open Gmail"
→ AURA launches Gmail app

"Turn on WiFi"
→ AURA enables WiFi

"Book me a ride to the airport"
→ AURA opens Uber with destination

"Translate this to Spanish"
→ AURA translates selected text

"What's my schedule?"
→ AURA shows calendar events

"Enable power-saving mode"
→ AURA enables battery saver
```

---

## Architecture

### Core Modules

| Module | Purpose |
|--------|---------|
| `MainActivity` | Entry point, permissions, initialization |
| `DeviceScanner` | Scans device for apps, contacts, system info |
| `TaskExecutor` | Executes real system tasks |
| `MLModelManager` | Manages ML models and inference |
| `PersonalDataEngine` | Learns patterns and makes predictions |
| `AuraAccessibilityService` | System overlay and gesture detection |
| `AuraForegroundService` | Background execution |

### Data Flow

```
User Input (voice/text/gesture)
    ↓
Accessibility Service (capture)
    ↓
ML Intent Recognition (understand)
    ↓
Device Profile Check (verify capability)
    ↓
Task Executor (execute real action)
    ↓
Personal Data Engine (learn pattern)
    ↓
Response to User
```

---

## Configuration

### Enable Accessibility Service

1. Open Settings
2. Go to Accessibility → Services
3. Find "AURA"
4. Toggle ON
5. Grant permissions when prompted

### Enable Device Admin (Optional)

For advanced system control:

1. Settings → Security → Device Admin Apps
2. Enable "AURA"

---

## Database

AURA stores data locally in SQLite:

- User preferences
- Device profile
- Conversation history
- Usage patterns
- ML model cache

All data is encrypted and never sent to cloud.

---

## Privacy & Security

- **Local Processing** — All ML runs on-device
- **No Cloud Storage** — Personal data stays on device
- **Encrypted Database** — All stored data encrypted
- **Permission Control** — User controls what AURA can access
- **Audit Logging** — All actions logged locally

---

## Troubleshooting

### AURA not responding

1. Check if Accessibility Service is enabled
2. Restart the app
3. Restart device

### Permission denied errors

1. Go to Settings → Apps → AURA
2. Grant all required permissions
3. Restart app

### Slow performance

1. Clear app cache: Settings → Apps → AURA → Storage → Clear Cache
2. Disable power-saving mode
3. Close other apps

### ML models not loaded

1. Check internet connection (for initial download)
2. Ensure 500MB free storage
3. Restart app

---

## Development

### Project Structure

```
aura-android/
├── app/
│   ├── src/main/
│   │   ├── java/com/zachary/aura/
│   │   │   ├── MainActivity.kt
│   │   │   ├── DeviceScanner.kt
│   │   │   ├── TaskExecutor.kt
│   │   │   ├── MLModelManager.kt
│   │   │   ├── PersonalDataEngine.kt
│   │   │   └── services/
│   │   │       ├── AuraAccessibilityService.kt
│   │   │       └── AuraForegroundService.kt
│   │   ├── res/
│   │   │   ├── layout/
│   │   │   ├── values/
│   │   │   └── drawable/
│   │   └── AndroidManifest.xml
│   └── build.gradle
├── build.gradle
└── README.md
```

### Building from Source

```bash
# Clone
git clone https://github.com/zachary/aura-android.git

# Build
cd aura-android
./gradlew build

# Test
./gradlew test

# Deploy
./gradlew installDebug
```

---

## Future Enhancements

1. **Voice cloning** — Personalized voice synthesis
2. **Cross-device sync** — Sync patterns across devices
3. **Advanced analytics** — Usage dashboards
4. **Custom models** — Train on user data
5. **Multi-language UI** — Support more languages
6. **Wearable integration** — Control from smartwatch

---

## Support

- **Issues:** GitHub Issues
- **Documentation:** [Full Docs]
- **Author:** Zachary McCulloch

---

**AURA: Adaptive Universal Runtime Agent**  
*Real on-device AI. No simulation. No compromise.*
