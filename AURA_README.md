# AURA AI Mobile — Adaptive Universal Runtime Agent

A high-performance React Native mobile application for Android, featuring a cyberpunk HUD-style interface with office-literate AI conversational capabilities.

## Overview

AURA AI Mobile brings the Adaptive Universal Runtime Agent to your Android device with a sleek, futuristic interface inspired by system monitoring dashboards. The app provides intelligent task automation, system monitoring, and conversational AI with deep knowledge of enterprise software.

## Key Features

### **Maneuverability** — Fluid Transitions
- Smooth slide transitions between screens
- Fade transitions between tab navigation
- Responsive touch feedback with haptic support
- Intuitive gesture-based navigation

### **Runability** — Full Feature Implementation
- **Dashboard**: Real-time system metrics (CPU, RAM, Storage) with live updates
- **Chat Interface**: AI conversation with office software context
- **4-Layer Architecture**: Scout, Forge, Core, and Mesh layer screens
- **Models Management**: View and manage AI models with performance metrics
- **Capsules**: Monitor autonomous execution units
- **Safety & Security**: Security status, permissions, and audit logs
- **Settings**: Theme, notifications, and API configuration

### **AI Literacy** — Office Software Context
The AI understands and can assist with:
- **Microsoft Office**: Excel, Word, PowerPoint
- **Communication**: Outlook, Teams, Slack
- **System Tasks**: File management, automation, scheduling
- **Calendar & Scheduling**: Meeting management and reminders

## Architecture

### 4-Layer System Design

| Layer | Name | Purpose | Status |
|-------|------|---------|--------|
| 1 | **THE SCOUT** | Device Inspector & Hardware Profiler | READY |
| 2 | **THE FORGE** | Server-Side Compiler & Config Engine | STANDBY |
| 3 | **THE CORE** | Adaptive AI Runtime & Task Router | ACTIVE |
| 4 | **THE MESH** | Detachable Architecture & Portability | SYNC |

## Color Scheme

The app uses a cyberpunk HUD aesthetic with:
- **Primary**: Cyan (#00E5FF) — Main UI elements
- **Success**: Lime Green (#39FF14) — Status indicators
- **Warning**: Orange/Gold (#FFB300) — Warnings
- **Accent**: Magenta (#FF00FF) — Network elements
- **Background**: Deep Black (#0C0F12) — Dark theme

## Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS)
- **Navigation**: Expo Router
- **State Management**: React Context + AsyncStorage
- **Testing**: Vitest (26 tests passing)
- **Build**: Expo SDK 54

## Project Structure

```
app/
  _layout.tsx           ← Root layout with providers
  (tabs)/
    _layout.tsx         ← Tab navigation
    index.tsx           ← Dashboard screen
    chat.tsx            ← Chat/Conversation screen
    models.tsx          ← AI Models screen
    capsules.tsx        ← Autonomous Capsules screen
    safety.tsx          ← Security & Safety screen
    settings.tsx        ← Settings screen
  layers/
    _layout.tsx         ← Layer navigation
    [id].tsx            ← Dynamic layer screens (Scout, Forge, Core, Mesh)

components/
  screen-container.tsx  ← SafeArea wrapper
  ui/                   ← UI components

tests/
  aura-features.test.ts ← Comprehensive test suite

assets/images/          ← App icons and branding
```

## Getting Started

### Prerequisites
- Node.js 18+ with pnpm
- Expo CLI
- Android device or emulator

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Features Implemented

✅ Dashboard with HUD-style metrics
✅ Chat interface with AI responses
✅ 4-Layer architecture navigation
✅ Models management screen
✅ Capsules monitoring
✅ Safety & security dashboard
✅ Settings configuration
✅ Cyberpunk color scheme
✅ Fluid transitions and animations
✅ Office software literacy
✅ Comprehensive test suite (26 tests passing)
✅ Real-time system monitoring

## Testing

All 26 tests pass successfully covering:
- AI response generation
- Layer navigation
- System metrics
- Office software context
- UI components
- Message handling

Run tests with: `pnpm test`

## Customization

### Theme Colors
Edit `theme.config.js` to customize the color palette. Changes automatically apply throughout the app.

### App Branding
Update `app.config.ts` with:
- `appName`: Display name
- `appSlug`: Unique identifier
- `logoUrl`: S3 URL of app logo

### Screens
Add new screens in `app/(tabs)/` directory. They automatically appear in the tab bar once added to `_layout.tsx`.

## Performance

- Optimized for 60fps animations
- Lazy-loaded screens and data
- Memoized components to prevent unnecessary re-renders
- Efficient list rendering with FlatList
- Battery-optimized background tasks

## Security

- Secure credential storage with expo-secure-store
- Permission-based access control
- Audit logging for sensitive operations
- HTTPS-only API communication

## Author

**Zachary McCulloch** — Teviathan's Design

---

**AURA AI Mobile v1.0.0** — "Genesis"  
*Adapt. Learn. Execute.*
