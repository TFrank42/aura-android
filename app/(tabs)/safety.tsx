import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function SafetyScreen() {
  const colors = useColors();

  return (
    <ScreenContainer className="p-3">
      <ScrollView className="flex-1">
        <Text
          className="text-lg font-bold font-mono mb-3"
          style={{ color: colors.primary }}
        >
          SECURITY & SAFETY
        </Text>

        {/* Security Status */}
        <View
          className="bg-surface border p-3 mb-3"
          style={{ borderColor: colors.border }}
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text
              className="text-sm font-bold font-mono"
              style={{ color: colors.foreground }}
            >
              Overall Status
            </Text>
            <View
              className="border px-2 py-1"
              style={{
                borderColor: colors.success,
                backgroundColor: `${colors.success}20`,
              }}
            >
              <Text
                className="text-xs font-mono"
                style={{ color: colors.success }}
              >
                SECURE
              </Text>
            </View>
          </View>

          <View className="gap-1">
            <View className="flex-row justify-between">
              <Text
                className="text-xs font-mono"
                style={{ color: `${colors.primary}80` }}
              >
                Threat Level
              </Text>
              <Text
                className="text-xs font-mono"
                style={{ color: colors.success }}
              >
                LOW
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text
                className="text-xs font-mono"
                style={{ color: `${colors.primary}80` }}
              >
                Last Scan
              </Text>
              <Text
                className="text-xs font-mono"
                style={{ color: colors.primary }}
              >
                2 hours ago
              </Text>
            </View>
          </View>
        </View>

        {/* Permissions */}
        <View
          className="bg-surface border p-3 mb-3"
          style={{ borderColor: colors.border }}
        >
          <Text
            className="text-sm font-bold font-mono mb-2"
            style={{ color: colors.foreground }}
          >
            Permissions
          </Text>

          {[
            { name: "Camera", granted: true },
            { name: "Microphone", granted: true },
            { name: "Location", granted: false },
            { name: "Contacts", granted: true },
            { name: "Calendar", granted: true },
          ].map((perm) => (
            <View key={perm.name} className="flex-row justify-between mb-2">
              <Text
                className="text-xs font-mono"
                style={{ color: `${colors.primary}80` }}
              >
                {perm.name}
              </Text>
              <View
                className="border px-2 py-0.5"
                style={{
                  borderColor: perm.granted ? colors.success : colors.warning,
                  backgroundColor: perm.granted
                    ? `${colors.success}20`
                    : `${colors.warning}20`,
                }}
              >
                <Text
                  className="text-xs font-mono"
                  style={{
                    color: perm.granted ? colors.success : colors.warning,
                  }}
                >
                  {perm.granted ? "GRANTED" : "DENIED"}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Audit Log */}
        <View
          className="bg-surface border p-3"
          style={{ borderColor: colors.border }}
        >
          <Text
            className="text-sm font-bold font-mono mb-2"
            style={{ color: colors.foreground }}
          >
            Recent Activity
          </Text>

          {[
            "System scan completed - No threats detected",
            "Permission granted: Camera access",
            "Background service started",
            "Security update installed",
            "Device encryption verified",
          ].map((activity, idx) => (
            <Text
              key={idx}
              className="text-xs font-mono mb-1"
              style={{ color: `${colors.primary}80` }}
            >
              • {activity}
            </Text>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
