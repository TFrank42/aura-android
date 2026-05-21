import { ScrollView, Text, View, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

type LayerId = "scout" | "forge" | "core" | "mesh";

interface Layer {
  id: LayerId;
  num: string;
  name: string;
  desc: string;
  color: string;
  status: string;
  metric: string;
}

const LAYERS: Layer[] = [
  {
    id: "scout",
    num: "1",
    name: "THE SCOUT",
    desc: "Device Inspector · Hardware Profiler",
    color: "#39ff14",
    status: "READY",
    metric: "11 collectors",
  },
  {
    id: "forge",
    num: "2",
    name: "THE FORGE",
    desc: "Server-Side Compiler · Config Engine",
    color: "#ffb300",
    status: "STANDBY",
    metric: "5-stage pipeline",
  },
  {
    id: "core",
    num: "3",
    name: "THE CORE",
    desc: "Adaptive AI Runtime · Task Router",
    color: "#00e5ff",
    status: "ACTIVE",
    metric: "TaskRouter online",
  },
  {
    id: "mesh",
    num: "4",
    name: "THE MESH",
    desc: "Detachable Architecture · Portability",
    color: "#ff00ff",
    status: "SYNC",
    metric: "0 peers",
  },
];

const QUICK_STATS = [
  { label: "MODULES", value: "15", unit: "loaded" },
  { label: "LINES", value: "5,018", unit: "total" },
  { label: "CAPSULES", value: "0", unit: "active" },
  { label: "MODELS", value: "0", unit: "indexed" },
];

export default function DashboardScreen() {
  const router = useRouter();
  const colors = useColors();
  const [cpuVal, setCpuVal] = useState(23);
  const [memVal, setMemVal] = useState(41);
  const [storageVal, setStorageVal] = useState(62);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuVal((v) => Math.max(5, Math.min(95, v + (Math.random() - 0.5) * 10)));
      setMemVal((v) => Math.max(20, Math.min(80, v + (Math.random() - 0.5) * 5)));
      setStorageVal((v) => Math.max(50, Math.min(75, v + (Math.random() - 0.5) * 3)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const navigateToLayer = (layerId: LayerId) => {
    router.push(`/layers/${layerId}`);
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView className="flex-1 bg-background">
        {/* Hero Banner */}
        <View
          className="h-40 flex items-center justify-center bg-surface border-b"
          style={{ borderBottomColor: colors.border }}
        >
          <View className="absolute inset-0 opacity-20" style={{ backgroundColor: colors.primary }} />
          <View className="relative z-10 items-center">
            <Text
              className="text-4xl font-bold tracking-widest"
              style={{ color: colors.primary }}
            >
              AURA
            </Text>
            <Text
              className="text-xs tracking-widest mt-1"
              style={{ color: `${colors.primary}B3` }}
            >
              ADAPTIVE UNIVERSAL RUNTIME AGENT
            </Text>
            <View className="flex-row items-center gap-2 mt-3">
              <View
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.success }}
              />
              <Text
                className="text-xs font-mono"
                style={{ color: colors.success }}
              >
                SYSTEM ONLINE
              </Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="p-3 gap-3">
          {/* Quick Stats */}
          <View className="grid grid-cols-4 gap-1.5">
            {QUICK_STATS.map((stat) => (
              <View
                key={stat.label}
                className="bg-surface border p-2 items-center"
                style={{ borderColor: colors.border }}
              >
                <Text
                  className="text-sm font-bold"
                  style={{ color: colors.primary }}
                >
                  {stat.value}
                </Text>
                <Text
                  className="text-xs mt-0.5"
                  style={{ color: `${colors.primary}66` }}
                >
                  {stat.label}
                </Text>
                <Text
                  className="text-xs"
                  style={{ color: `${colors.primary}40` }}
                >
                  {stat.unit}
                </Text>
              </View>
            ))}
          </View>

          {/* Live Metrics */}
          <View
            className="bg-surface border p-3 gap-2"
            style={{ borderColor: colors.border }}
          >
            <Text
              className="text-xs tracking-widest font-mono"
              style={{ color: `${colors.primary}80` }}
            >
              SYSTEM METRICS
            </Text>

            {/* CPU */}
            <View>
              <View className="flex-row justify-between mb-1">
                <Text
                  className="text-xs font-mono"
                  style={{ color: `${colors.primary}B3` }}
                >
                  CPU
                </Text>
                <Text
                  className="text-xs font-mono"
                  style={{ color: colors.primary }}
                >
                  {cpuVal.toFixed(0)}%
                </Text>
              </View>
              <View
                className="h-1 bg-surface border"
                style={{ borderColor: colors.border }}
              >
                <View
                  className="h-full"
                  style={{
                    width: `${cpuVal}%`,
                    backgroundColor: colors.primary,
                  }}
                />
              </View>
            </View>

            {/* RAM */}
            <View>
              <View className="flex-row justify-between mb-1">
                <Text
                  className="text-xs font-mono"
                  style={{ color: `${colors.primary}B3` }}
                >
                  RAM
                </Text>
                <Text
                  className="text-xs font-mono"
                  style={{ color: colors.primary }}
                >
                  {memVal.toFixed(0)}%
                </Text>
              </View>
              <View
                className="h-1 bg-surface border"
                style={{ borderColor: colors.border }}
              >
                <View
                  className="h-full"
                  style={{
                    width: `${memVal}%`,
                    backgroundColor: colors.success,
                  }}
                />
              </View>
            </View>

            {/* Storage */}
            <View>
              <View className="flex-row justify-between mb-1">
                <Text
                  className="text-xs font-mono"
                  style={{ color: `${colors.primary}B3` }}
                >
                  STORAGE
                </Text>
                <Text
                  className="text-xs font-mono"
                  style={{ color: colors.warning }}
                >
                  {storageVal.toFixed(0)}%
                </Text>
              </View>
              <View
                className="h-1 bg-surface border"
                style={{ borderColor: colors.border }}
              >
                <View
                  className="h-full"
                  style={{
                    width: `${storageVal}%`,
                    backgroundColor: colors.warning,
                  }}
                />
              </View>
            </View>
          </View>

          {/* 4-Layer Architecture */}
          <View>
            <Text
              className="text-xs tracking-widest font-mono px-1 mb-2"
              style={{ color: `${colors.primary}80` }}
            >
              4-LAYER ARCHITECTURE
            </Text>
            <View className="gap-1.5">
              {LAYERS.map((layer) => (
                <Pressable
                  key={layer.id}
                  onPress={() => navigateToLayer(layer.id)}
                  className="flex-row items-center gap-3 bg-surface border p-3 active:opacity-80"
                  style={{
                    borderColor: layer.color,
                    borderLeftWidth: 2,
                  }}
                >
                  {/* Layer number */}
                  <View
                    className="w-7 h-7 items-center justify-center border"
                    style={{
                      borderColor: `${layer.color}80`,
                    }}
                  >
                    <Text
                      className="text-xs font-bold font-mono"
                      style={{ color: layer.color }}
                    >
                      {layer.num}
                    </Text>
                  </View>

                  {/* Info */}
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2 mb-0.5">
                      <Text
                        className="text-xs font-bold font-mono"
                        style={{ color: layer.color }}
                      >
                        {layer.name}
                      </Text>
                      <View
                        className="border px-1 py-0.5"
                        style={{
                          borderColor: `${layer.color}80`,
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
                    <Text
                      className="text-xs font-mono"
                      style={{ color: `${colors.primary}66` }}
                    >
                      {layer.desc}
                    </Text>
                  </View>

                  {/* Arrow */}
                  <Text
                    className="text-xs font-mono"
                    style={{ color: `${layer.color}99` }}
                  >
                    ›
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Architecture Diagram */}
          <View
            className="bg-surface border p-3"
            style={{ borderColor: colors.border }}
          >
            <Text
              className="text-xs tracking-widest font-mono mb-2"
              style={{ color: `${colors.primary}80` }}
            >
              ARCHITECTURE DIAGRAM
            </Text>
            <Text
              className="text-xs font-mono leading-4"
              style={{ color: `${colors.primary}99` }}
            >
{`┌──────────────────────────────┐
│  LAYER 4: THE MESH           │
│  Detachable · Portability    │
└──────────────┬───────────────┘
               │ sync/migrate
┌──────────────┴───────────────┐
│  LAYER 3: THE CORE           │
│  Adaptive AI Runtime         │
└──────────────┬───────────────┘
               │ AURA Capsule
┌──────────────┴───────────────┐
│  LAYER 2: THE FORGE          │
│  Config Compiler             │
└──────────────┬───────────────┘
               │ Device DNA
┌──────────────┴───────────────┐
│  LAYER 1: THE SCOUT          │
│  Device Inspector            │
└──────────────────────────────┘
               │
         [ HOST DEVICE ]`}
            </Text>
          </View>

          {/* Package Info */}
          <View
            className="bg-surface border p-3"
            style={{ borderColor: colors.border }}
          >
            <Text
              className="text-xs tracking-widest font-mono mb-2"
              style={{ color: `${colors.primary}80` }}
            >
              PACKAGE INFO
            </Text>
            <View className="gap-1">
              {[
                ["AUTHOR", "Zachary McCulloch"],
                ["ORG", "Teviathan's Design"],
                ["CODENAME", "Genesis"],
                ["MODULES", "15 core modules"],
                ["BUILT FOR", "Android / Termux"],
              ].map(([k, v]) => (
                <View key={k} className="flex-row gap-2">
                  <Text
                    className="text-xs font-mono w-20"
                    style={{ color: `${colors.primary}66` }}
                  >
                    {k}
                  </Text>
                  <Text
                    className="text-xs font-mono flex-1"
                    style={{ color: `${colors.primary}CC` }}
                  >
                    {v}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="h-4" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
