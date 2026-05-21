import { ScrollView, Text, View, Switch, Pressable } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function SettingsScreen() {
  const colors = useColors();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <ScreenContainer className="p-3">
      <ScrollView className="flex-1">
        <Text
          className="text-lg font-bold font-mono mb-3"
          style={{ color: colors.primary }}
        >
          SETTINGS
        </Text>

        {/* Theme Settings */}
        <View
          className="bg-surface border p-3 mb-3"
          style={{ borderColor: colors.border }}
        >
          <Text
            className="text-sm font-bold font-mono mb-2"
            style={{ color: colors.foreground }}
          >
            Display
          </Text>

          <View className="flex-row items-center justify-between">
            <Text
              className="text-xs font-mono"
              style={{ color: `${colors.primary}80` }}
            >
              Dark Mode
            </Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{
                false: `${colors.border}80`,
                true: `${colors.primary}80`,
              }}
              thumbColor={darkMode ? colors.primary : colors.muted}
            />
          </View>
        </View>

        {/* Notification Settings */}
        <View
          className="bg-surface border p-3 mb-3"
          style={{ borderColor: colors.border }}
        >
          <Text
            className="text-sm font-bold font-mono mb-2"
            style={{ color: colors.foreground }}
          >
            Notifications
          </Text>

          <View className="flex-row items-center justify-between mb-2">
            <Text
              className="text-xs font-mono"
              style={{ color: `${colors.primary}80` }}
            >
              Push Notifications
            </Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{
                false: `${colors.border}80`,
                true: `${colors.primary}80`,
              }}
              thumbColor={notifications ? colors.primary : colors.muted}
            />
          </View>

          <View className="flex-row items-center justify-between">
            <Text
              className="text-xs font-mono"
              style={{ color: `${colors.primary}80` }}
            >
              Analytics
            </Text>
            <Switch
              value={analytics}
              onValueChange={setAnalytics}
              trackColor={{
                false: `${colors.border}80`,
                true: `${colors.primary}80`,
              }}
              thumbColor={analytics ? colors.primary : colors.muted}
            />
          </View>
        </View>

        {/* API Configuration */}
        <View
          className="bg-surface border p-3 mb-3"
          style={{ borderColor: colors.border }}
        >
          <Text
            className="text-sm font-bold font-mono mb-2"
            style={{ color: colors.foreground }}
          >
            API Configuration
          </Text>

          <Text
            className="text-xs font-mono mb-1"
            style={{ color: `${colors.primary}80` }}
          >
            Backend Endpoint
          </Text>
          <View
            className="border p-2 mb-2"
            style={{ borderColor: colors.border }}
          >
            <Text
              className="text-xs font-mono"
              style={{ color: colors.primary }}
            >
              https://api.aura.local:3000
            </Text>
          </View>

          <Text
            className="text-xs font-mono mb-1"
            style={{ color: `${colors.primary}80` }}
          >
            API Key
          </Text>
          <View
            className="border p-2"
            style={{ borderColor: colors.border }}
          >
            <Text
              className="text-xs font-mono"
              style={{ color: colors.primary }}
            >
              ••••••••••••••••••••••••
            </Text>
          </View>
        </View>

        {/* About */}
        <View
          className="bg-surface border p-3"
          style={{ borderColor: colors.border }}
        >
          <Text
            className="text-sm font-bold font-mono mb-2"
            style={{ color: colors.foreground }}
          >
            About AURA
          </Text>

          <View className="gap-1">
            {[
              ["App Version", "1.0.0"],
              ["Build", "Genesis"],
              ["Platform", "Android / Expo"],
              ["Author", "Zachary McCulloch"],
              ["Organization", "Teviathan's Design"],
            ].map(([label, value]) => (
              <View key={label} className="flex-row justify-between">
                <Text
                  className="text-xs font-mono"
                  style={{ color: `${colors.primary}80` }}
                >
                  {label}
                </Text>
                <Text
                  className="text-xs font-mono"
                  style={{ color: colors.primary }}
                >
                  {value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
