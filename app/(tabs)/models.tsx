import { ScrollView, Text, View, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Model {
  id: string;
  name: string;
  status: "active" | "standby" | "offline";
  performance: number;
  size: string;
}

const MODELS: Model[] = [
  {
    id: "1",
    name: "GPT-4 Turbo",
    status: "active",
    performance: 95,
    size: "175B params",
  },
  {
    id: "2",
    name: "Claude 3 Opus",
    status: "active",
    performance: 92,
    size: "200B params",
  },
  {
    id: "3",
    name: "Llama 2 70B",
    status: "standby",
    performance: 88,
    size: "70B params",
  },
  {
    id: "4",
    name: "Mistral 7B",
    status: "standby",
    performance: 85,
    size: "7B params",
  },
];

export default function ModelsScreen() {
  const colors = useColors();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return colors.success;
      case "standby":
        return colors.warning;
      default:
        return colors.error;
    }
  };

  const renderModel = (model: Model) => (
    <View
      key={model.id}
      className="bg-surface border p-3 mb-2"
      style={{ borderColor: colors.border }}
    >
      <View className="flex-row items-center justify-between mb-2">
        <Text
          className="text-sm font-bold font-mono flex-1"
          style={{ color: colors.foreground }}
        >
          {model.name}
        </Text>
        <View
          className="border px-2 py-1"
          style={{
            borderColor: getStatusColor(model.status),
            backgroundColor: `${getStatusColor(model.status)}20`,
          }}
        >
          <Text
            className="text-xs font-mono"
            style={{ color: getStatusColor(model.status) }}
          >
            {model.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View className="gap-1">
        <View className="flex-row justify-between">
          <Text
            className="text-xs font-mono"
            style={{ color: `${colors.primary}80` }}
          >
            Performance
          </Text>
          <Text
            className="text-xs font-mono"
            style={{ color: colors.primary }}
          >
            {model.performance}%
          </Text>
        </View>
        <View
          className="h-1 bg-surface border"
          style={{ borderColor: colors.border }}
        >
          <View
            className="h-full"
            style={{
              width: `${model.performance}%`,
              backgroundColor: colors.success,
            }}
          />
        </View>
      </View>

      <Text
        className="text-xs font-mono mt-2"
        style={{ color: `${colors.primary}66` }}
      >
        Size: {model.size}
      </Text>
    </View>
  );

  return (
    <ScreenContainer className="p-3">
      <View className="flex-1">
        <Text
          className="text-lg font-bold font-mono mb-3"
          style={{ color: colors.primary }}
        >
          AI MODELS
        </Text>

        <FlatList
          data={MODELS}
          renderItem={({ item }) => renderModel(item)}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScreenContainer>
  );
}
