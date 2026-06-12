import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

import FloatingText from "@/components/FloatingText";
import ForestRoom from "@/components/ForestRoom";
import MineRoom from "@/components/MineRoom";
import PotionRoom from "@/components/PotionRoom";
import BlacksmithRoom from "@/components/BlacksmithRoom";
import DungeonRoom from "@/components/DungeonRoom";
import { useGameState } from "@/context/GameStateContext";

export default function GameScreen() {
  const [currentRoom, setCurrentRoom] = useState("room");

  // Consume resources and functions from the context brain!
  const { 
    resources, 
    skills, // Added to detect reset events
    gatherWood, 
    gatherStone, 
    getWoodMultiplier, 
    getStoneMultiplier 
  } = useGameState();

  // Reset currentRoom back to house when the game save is cleared
  React.useEffect(() => {
    if (
      resources.wood === 0 && 
      resources.stone === 0 && 
      skills.woodcutting.level === 1 && 
      skills.mining.level === 1
    ) {
      setCurrentRoom("room");
    }
  }, [resources, skills]);

  const [particles, setParticles] = useState([]);

  // Handle tap coordinate capture and particle triggers
  const handleTap = (event, type) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // pageX and pageY measure the tap relative to the entire screen
    const { pageX, pageY } = event.nativeEvent;
    
    // We subtract offsets to align the coordinates with the game container
    const x = pageX;
    const y = pageY - 130; // Subtracts header height and safe areas

    const amount = type === "wood" ? getWoodMultiplier() : getStoneMultiplier();
    const particleId = Date.now() + Math.random();

    setParticles((prev) => [
      ...prev,
      {
        id: particleId,
        x: x,
        y: y,
        text: `+${amount} ${type === "wood" ? "Wood" : "Stone"}`,
      },
    ]);

    if (type === "wood") {
      gatherWood();
    } else {
      gatherStone();
    }

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== particleId));
    }, 800);
  };

  // Room Up/Down transition logic
  const handleGoUp = () => {
    if (currentRoom === "mine") setCurrentRoom("room");
    else if (currentRoom === "room") setCurrentRoom("forest");
    else if (currentRoom === "forest") setCurrentRoom("dungeon-locked");
  };

  const handleGoDown = () => {
    if (currentRoom === "forest") setCurrentRoom("room");
    else if (currentRoom === "room") setCurrentRoom("mine");
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-950 p-4 justify-between">
      
      {/* Location Header */}
      <View className="items-center py-2 border-b border-neutral-800">
        <Text className="text-emerald-400 font-mono uppercase tracking-widest text-lg font-bold">
          {currentRoom === "room" ? "My House" : currentRoom.replace("-", " ")}
        </Text>
      </View>

      {/* Main Viewport */}
      <View className="flex-1 justify-center items-center bg-neutral-900 border-4 border-neutral-700 rounded-sm relative my-4 overflow-hidden">
        
        {/* Room Views */}
        {currentRoom === "room" && (
          <Text className="text-neutral-500 font-mono text-center">My House Placeholder</Text>
        )}
        
        {currentRoom === "forest" && (
          <ForestRoom wood={resources.wood} onTap={handleTap} />
        )}

        {currentRoom === "mine" && (
          <MineRoom stone={resources.stone} onTap={handleTap} />
        )}

        {currentRoom === "left-locked" && (
          <PotionRoom onGoBack={() => setCurrentRoom("room")} />
        )}

        {currentRoom === "right-locked" && (
          <BlacksmithRoom onGoBack={() => setCurrentRoom("room")} />
        )}

        {currentRoom === "dungeon-locked" && (
          <DungeonRoom onGoBack={() => setCurrentRoom("forest")} />
        )}

        {/* Navigation Overlay */}
        {(currentRoom === "mine" || currentRoom === "room" || currentRoom === "forest") && (
          <Pressable 
            onPress={handleGoUp} 
            className="absolute top-4 bg-neutral-800/80 p-3 border border-neutral-700 active:bg-neutral-700 z-10"
          >
            <Text className="text-white font-mono">▲</Text>
          </Pressable>
        )}

        {(currentRoom === "forest" || currentRoom === "room") && (
          <Pressable 
            onPress={handleGoDown} 
            className="absolute bottom-4 bg-neutral-800/80 p-3 border border-neutral-700 active:bg-neutral-700 z-10"
          >
            <Text className="text-white font-mono">▼</Text>
          </Pressable>
        )}

        {currentRoom === "room" && (
          <>
            <Pressable 
              onPress={() => setCurrentRoom("left-locked")} 
              className="absolute left-4 bg-neutral-800/80 p-3 border border-neutral-700 active:bg-neutral-700 z-10"
            >
              <Text className="text-white font-mono">◀</Text>
            </Pressable>

            <Pressable 
              onPress={() => setCurrentRoom("right-locked")} 
              className="absolute right-4 bg-neutral-800/80 p-3 border border-neutral-700 active:bg-neutral-700 z-10"
            >
              <Text className="text-white font-mono">▶</Text>
            </Pressable>
          </>
        )}

        {/* Particle Layer */}
        {particles.map((p) => (
          <FloatingText key={p.id} x={p.x} y={p.y} text={p.text} />
        ))}

      </View>
    </SafeAreaView>
  );
}
