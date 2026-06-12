import React from "react";
import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image } from "expo-image";
import { useGameState } from "@/context/GameStateContext";

// 8-bit letter pixel matrices (5x5 grid)
const letterGrids = {
  S: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  o: [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
  ],
  l: [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0],
  ],
  c: [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0],
  ],
  a: [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
  ],
  p: [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0],
  ],
  e: [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0],
  ],
};

const logoLetters = [
  { char: "S", size: 8, color: "#34d399" },
  { char: "o", size: 5, color: "#10b981" },
  { char: "l", size: 6.5, color: "#10b981" },
  { char: "o", size: 5, color: "#10b981" },
  { char: "S", size: 8, color: "#34d399" },
  { char: "c", size: 5, color: "#10b981" },
  { char: "a", size: 5.5, color: "#10b981" },
  { char: "p", size: 6.5, color: "#10b981" },
  { char: "e", size: 5, color: "#10b981" },
];

function PixelLetter({ char, pixelSize, color }) {
  const grid = letterGrids[char];
  if (!grid) return null;

  return (
    <View style={{ width: pixelSize * 5, height: pixelSize * 5, marginHorizontal: 2 }}>
      {/* 3D Pixel Shadow Layer */}
      <View style={{ position: "absolute", top: pixelSize / 2, left: pixelSize / 2 }}>
        {grid.map((row, rowIndex) => (
          <View key={`sh-${rowIndex}`} style={{ flexDirection: "row", height: pixelSize }}>
            {row.map((pixel, colIndex) => (
              <View
                key={`sh-${colIndex}`}
                style={{
                  width: pixelSize,
                  height: pixelSize,
                  backgroundColor: pixel === 1 ? "#064e3b" : "transparent",
                }}
              />
            ))}
          </View>
        ))}
      </View>
      {/* Front Pixel Layer */}
      <View style={{ position: "absolute", top: 0, left: 0 }}>
        {grid.map((row, rowIndex) => (
          <View key={`fr-${rowIndex}`} style={{ flexDirection: "row", height: pixelSize }}>
            {row.map((pixel, colIndex) => (
              <View
                key={`fr-${colIndex}`}
                style={{
                  width: pixelSize,
                  height: pixelSize,
                  backgroundColor: pixel === 1 ? color : "transparent",
                }}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

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

      {/* Title - Positioned at the top 20% of the screen */}
      {/* Title logo - AI built this custom 8-bit pixel renderer for SoloScape so it looks retro for now. I'll swap this out when I find the font I want to use. */}
      <View style={{ position: "absolute", top: "20%", flexDirection: "row", alignItems: "flex-end" }}>
        {logoLetters.map((item, index) => (
          <PixelLetter 
            key={index}
            char={item.char}
            pixelSize={item.size}
            color={item.color}
          />
        ))}
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
