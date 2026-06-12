import "@/global.css";
import { Stack } from "expo-router";
import { GameStateProvider } from "@/context/GameStateContext";

export default function RootLayout() {
  return (
    <GameStateProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GameStateProvider>
  );
}
