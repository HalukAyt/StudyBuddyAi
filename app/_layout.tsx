import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1, backgroundColor: "#1e293b" }}>
      <StatusBar style="light"  />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
