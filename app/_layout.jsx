/**
 * File: app/_layout.jsx
 * Description: Root layout component that handles app-wide GameState Context wrapping, 
 *              asynchronous loading of the PressStart2P custom retro font, and splash screen visibility.
 * Author: Jacqueline Rael
 * Date Created: 06/12/2026
 */

import "@/global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GameStateProvider } from "@/context/GameStateContext";

// Keep the splash screen visible while loading resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "PressStart2P": require("../assets/fonts/PressStart2P-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GameStateProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GameStateProvider>
  );
}
