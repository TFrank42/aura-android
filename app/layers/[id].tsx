import { ScrollView, Text, View, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

const LAYER_DETAILS: Record<string, any> = {
  scout: {
    num: "1",
    name: "THE SCOUT",
    desc: "Device Inspector · Hardware Profiler",
    color: "#39ff14",
    status: "READY",
    content: [
      { label: "Device Model", value: "Samsung Galaxy S24" },
      { label: "OS Version", value: "Android 14" },
      { label: "CPU", value: "Snapdragon 8 Gen 3" },
      { label: "RAM", value: "12 GB" },
      { label: "Storage", value: "256 GB" },
      { label: "Battery", value: "85%" },
      { label: "Collectors Active", value: "11" },
    ],
  },
  forge: {
    num: "2",
    name: "THE FORGE",
    desc: "Server-Side Compiler · Config Engine",
    color: "#ffb300",
    status: "STANDBY",
    content: [
      { label: "Pipeline Stage", value: "Idle" },
      { label: "Last Build", value: "2 hours ago" },
      { label: "Build Status", value: "Success" },
      { label: "Config Version", value: "v3.2.1" },
      { label: "Compilation Time", value: "45ms" },
      { label: "Optimization Level", value: "O2" },
    ],
  },
  core: {
    num: "3",
    name: "THE CORE",
    desc: "Adaptive AI Runtime · Task Router",
    color: "#00e5ff",
    status: "ACTIVE",
    content: [
      { label: "Runtime Status", value: "Online" },
      { label: "Active Tasks", value: "3" },
      { label: "Task Queue", value: "5 pending" },
      { label: "AI Model", value: "GPT-4 Turbo" },
      { label: "Response Time", value: "245ms" },
      { label: "Uptime", value: "12h 34m" },
    ],
  },
  mesh: {
    num: "4",
    name: "THE MESH",
    desc: "Detachable Architecture · Portability",
    color: "#ff00ff",
    status: "SYNC",
    content: [
      { label: "Connected Peers", value: "0" },
      { label: "Sync Status", value: "Idle" },
      { label: "Network Mode", value: "Local" },
      { label: "Replication", value: "Disabled" },
      { label: "Last Sync", value: "Never" },
      { label: "Detach Status", value: "Attached" },
    ],
  },
};

export default function LayerScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();

  const layer = LAYER_DETAILS[id || "scout"];

  if (!layer) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text style={{ color: colors.error }}>Layer not found</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView className="flex-1 bg-background">
        {/* Header */}
        <View
          className="bg-surface border-b p-4 flex-row items-center justify-between"
          style={{
            borderBottomColor: colors.border,
            backgroundColor: layer.color + "20",
          }}
        >
          <Pressable
            onPress={() => router.back()}
            className="px-3 py-2 active:opacity-70"
          >
            <Text
              className="text-lg font-bold font-mono"
              style={{ color: colors.primary }}
            >
              ‹ Back
            </Text>
          </Pressable>

          <View className="flex-1 items-center">
            <Text
              className="text-sm font-bold font-mono"
              style={{ color: layer.color }}
            >
              {layer.name}
            </Text>
          </View>

          <View
            className="border px-2 py-1"
            style={{
              borderColor: layer.color,
              backgroundColor: `${layer.color}20`,
            }}
          >
            <Text
              className="text-xs font-mono"
              style={{ color: layer.color }}
            >
              {layer.status}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View className="p-3 gap-3">
          {/* Layer Info */}
          <View
            className="bg-surface border p-3"
            style={{ borderColor: colors.border, borderLeftColor: layer.color, borderLeftWidth: 2 }}
          >
            <View className="flex-row items-center gap-2 mb-2">
              <View
                className="w-8 h-8 items-center justify-center border"
                style={{ borderColor: `${layer.color}80` }}
              >
                <Text
                  className="text-sm font-bold font-mono"
                  style={{ color: layer.color }}
                >
                  {layer.num}
                </Text>
              </View>
              <View>
                <Text
                  className="text-sm font-bold font-mono"
                  style={{ color: layer.color }}
                >
                  {layer.name}
                </Text>
                <Text
                  className="text-xs font-mono"
                  style={{ color: `${colors.primary}66` }}
                >
                  {layer.desc}
                </Text>
              </View>
            </View>
          </View>

          {/* Details */}
          <View>
            <Text
              className="text-xs tracking-widest font-mono mb-2 px-1"
              style={{ color: `${colors.primary}80` }}
            >
              LAYER DETAILS
            </Text>

            {layer.content.map((item: any, idx: number) => (
              <View
                key={idx}
                className="bg-surface border p-3 mb-1.5"
                style={{ borderColor: colors.border }}
              >
                <View className="flex-row justify-between items-center">
                  <Text
                    className="text-xs font-mono"
                    style={{ color: `${colors.primary}80` }}
                  >
                    {item.label}
                  </Text>
                  <Text
                    className="text-xs font-mono font-bold"
                    style={{ color: colors.primary }}
                  >
                    {item.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Status Indicator */}
          <View
            className="bg-surface border p-3"
            style={{
              borderColor: colors.border,
              borderLeftColor: layer.color,
              borderLeftWidth: 2,
            }}
          >
            <View className="flex-row items-center gap-2">
              <View
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: layer.color }}
              />
              <Text
                className="text-xs font-mono flex-1"
                style={{ color: colors.primary }}
              >
                {layer.name} is {layer.status.toLowerCase()}
              </Text>
            </View>
          </View>

          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
