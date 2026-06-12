/**
 * Program: SoloScape
 * Description: A personalized, incremental fantasy adventure RPG that serves as a digital escape.
 * Author: Jacqueline Rael
 * Date Created: 06/12/2026
 */

import React from "react";
import { View, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "expo-image";
import { useGameState } from "@/context/GameStateContext";

export default function Index() {
  const { hasPlayed, isLoaded, startGame } = useGameState();

  React.useEffect(() => {
    if (isLoaded && hasPlayed) {
      router.replace("/(tabs)/game");
    }
  }, [isLoaded, hasPlayed]);

  // Render a clean black screen while loading status or if redirecting, preventing layout flickering
  if (!isLoaded || hasPlayed) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  const handleStartGame = () => {
    startGame();
    router.replace("/(tabs)/game");
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
      
      {/* Background Image */}
      <Image 
        source={require("../assets/images/startPage.png")} 
        style={{ width: "100%", height: "100%", position: "absolute" }}
        contentFit="cover"
      />

      {/* Title - Positioned at the top 18% of the screen, styled as a retro signboard banner in Velvet Cherry GB colors */}
      <View 
        style={{ 
          position: "absolute", 
          top: "18%",
          backgroundColor: "#2d162c",
          borderColor: "#683a68",
        }}
        className="border-4 p-4 px-6 rounded-sm shadow-[6px_6px_0px_0px_#412752]"
      >
        <View style={{ position: "relative" }}>
          {/* 3D Pixel Drop-Shadow Layer */}
          <Text 
            style={{ 
              fontFamily: "PressStart2P", 
              fontSize: 32, 
              color: "#412752", 
              position: "absolute",
              top: 4,
              left: 4,
            }}
          >
            SoloScape
          </Text>
          {/* Main Foreground Text */}
          <Text 
            style={{ 
              fontFamily: "PressStart2P", 
              fontSize: 32, 
              color: "#9775a6", 
            }}
          >
            SoloScape
          </Text>
        </View>
      </View>

      {/* Start Button - Positioned at the bottom 30% of the screen */}
      <Pressable 
        onPress={handleStartGame} 
        style={{
          position: "absolute",
          bottom: "30%",
          width: "45%",
          aspectRatio: 3,
        }}
        className="active:scale-95"
      >
        <Image 
          source={require("../assets/images/button.png")} 
          style={{ width: "100%", height: "100%" }}
          contentFit="contain"
        />
      </Pressable>

    </SafeAreaView>
  );
}
