import { Stack } from "expo-router";

export default function LayersLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
