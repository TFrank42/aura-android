import { ScrollView, Text, View, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Capsule {
  id: string;
  name: string;
  status: "running" | "stopped" | "error";
  uptime: string;
  cpu: number;
  memory: number;
}

const CAPSULES: Capsule[] = [
  {
    id: "1",
    name: "Email Monitor",
    status: "running",
    uptime: "2h 34m",
    cpu: 12,
    memory: 45,
  },
  {
    id: "2",
    name: "Calendar Sync",
    status: "running",
    uptime: "1h 15m",
    cpu: 8,
    memory: 32,
  },
  {
    id: "3",
    name: "File Backup",
    status: "stopped",
    uptime: "0m",
    cpu: 0,
    memory: 0,
  },
];

export default function CapsulesScreen() {
  const colors = useColors();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return colors.success;
      case "stopped":
        return colors.warning;
      case "error":
        return colors.error;
      default:
        return colors.muted;
    }
  };

  const renderCapsule = (capsule: Capsule) => (
    <View
      key={capsule.id}
      className="bg-surface border p-3 mb-2"
      style={{ borderColor: colors.border }}
    >
      <View className="flex-row items-center justify-between mb-2">
        <Text
          className="text-sm font-bold font-mono flex-1"
          style={{ color: colors.foreground }}
        >
          {capsule.name}
        </Text>
        <View
          className="border px-2 py-1"
          style={{
            borderColor: getStatusColor(capsule.status),
            backgroundColor: `${getStatusColor(capsule.status)}20`,
          }}
        >
          <Text
            className="text-xs font-mono"
            style={{ color: getStatusColor(capsule.status) }}
          >
            {capsule.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View className="gap-1.5">
        <View className="flex-row justify-between">
          <Text
            className="text-xs font-mono"
            style={{ color: `${colors.primary}80` }}
          >
            Uptime
          </Text>
          <Text
            className="text-xs font-mono"
            style={{ color: colors.primary }}
          >
            {capsule.uptime}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text
            className="text-xs font-mono"
            style={{ color: `${colors.primary}80` }}
          >
            CPU
          </Text>
          <Text
            className="text-xs font-mono"
            style={{ color: colors.primary }}
          >
            {capsule.cpu}%
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text
            className="text-xs font-mono"
            style={{ color: `${colors.primary}80` }}
          >
            Memory
          </Text>
          <Text
            className="text-xs font-mono"
            style={{ color: colors.primary }}
          >
            {capsule.memory}MB
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScreenContainer className="p-3">
      <View className="flex-1">
        <Text
          className="text-lg font-bold font-mono mb-3"
          style={{ color: colors.primary }}
        >
          AUTONOMOUS CAPSULES
        </Text>

        <FlatList
          data={CAPSULES}
          renderItem={({ item }) => renderCapsule(item)}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScreenContainer>
  );
}
