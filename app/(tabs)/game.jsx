import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
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
    getStoneMultiplier,
    playBubbleClick
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
    playBubbleClick();
    
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
          {currentRoom === "room" ? "My House" :
           currentRoom === "potion-locked" ? "Potion Room" :
           currentRoom === "blacksmith-locked" ? "Blacksmith" :
           currentRoom === "dungeon-locked" ? "Dungeon" :
           currentRoom}
        </Text>
      </View>

      {/* Main Viewport */}
      <View className="flex-1 justify-center items-center relative my-4 overflow-hidden w-full">
        
        {/* Room Views */}
        {currentRoom === "room" && (
          <View style={{ width: "100%", aspectRatio: 1, position: "relative" }}>
            <Image 
              source={require("../../assets/images/starterRoom.png")} 
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
            {/* Carpet visual overlay in center of floor */}
            <Image 
              source={require("../../assets/images/carpet.png")} 
              style={{
                position: "absolute",
                top: "40%",
                left: "30%",
                width: "40%",
                height: "26.67%",
                zIndex: 5,
              }}
              contentFit="contain"
            />
            <Image 
              source={require("../../assets/images/doorway.png")} 
              style={{
                position: "absolute",
                top: 0,
                height: "30%",
                left: "66.67%",
                width: "21.18%",
                zIndex: 10,
              }}
              contentFit="contain"
            />
            {/* Painting visual overlay on left wall */}
            <Image 
              source={require("../../assets/images/art1.png")} 
              style={{
                position: "absolute",
                top: "7.5%",
                left: "15%",
                width: "10%",
                height: "10%",
                zIndex: 10,
              }}
              contentFit="contain"
            />
            {/* Up arrow for room transition, placed under the doorway */}
            <Pressable 
              onPress={handleGoUp} 
              style={{
                position: "absolute",
                top: "30%",
                left: "72%",
                zIndex: 20,
              }}
              className="active:scale-95"
            >
              <Image 
                source={require("../../assets/images/Arrow.png")} 
                style={{ width: 40, height: 40, transform: [{ rotate: "-90deg" }] }}
                contentFit="contain"
              />
            </Pressable>

            {/* Stairs visual overlay at bottom-middle against edge */}
            <Image 
              source={require("../../assets/images/stairs.png")} 
              style={{
                position: "absolute",
                bottom: 0,
                left: "40%",
                width: "20%",
                height: "20%",
                zIndex: 10,
              }}
              contentFit="contain"
            />

            {/* Down arrow for room transition, placed above the stairs */}
            <Pressable 
              onPress={handleGoDown} 
              style={{
                position: "absolute",
                bottom: "20%",
                left: "45%",
                zIndex: 20,
              }}
              className="active:scale-95"
            >
              <Image 
                source={require("../../assets/images/Arrow.png")} 
                style={{ width: 40, height: 40, transform: [{ rotate: "90deg" }] }}
                contentFit="contain"
              />
            </Pressable>
          </View>
        )}
        
        {currentRoom === "forest" && (
          <View style={{ width: "100%", aspectRatio: 1, position: "relative" }}>
            <ForestRoom wood={resources.wood} onTap={handleTap} />
            {/* Up arrow for forest transition (to Dungeon) */}
            <Pressable 
              onPress={handleGoUp} 
              style={{
                position: "absolute",
                top: "5%",
                left: "8%",
                zIndex: 20,
              }}
              className="active:scale-95"
            >
              <Image 
                source={require("../../assets/images/Arrow.png")} 
                style={{ width: 40, height: 40, transform: [{ rotate: "-90deg" }] }}
                contentFit="contain"
              />
            </Pressable>

            {/* Down arrow for forest transition (back to My House) */}
            <Pressable 
              onPress={handleGoDown} 
              style={{
                position: "absolute",
                bottom: "5%",
                left: "48%",
                zIndex: 20,
              }}
              className="active:scale-95"
            >
              <Image 
                source={require("../../assets/images/Arrow.png")} 
                style={{ width: 40, height: 40, transform: [{ rotate: "90deg" }] }}
                contentFit="contain"
              />
            </Pressable>
          </View>
        )}

        {currentRoom === "mine" && (
          <View style={{ width: "100%", aspectRatio: 1, position: "relative" }}>
            <MineRoom stone={resources.stone} onTap={handleTap} />
            {/* Up arrow for basement transition, placed under the ladder */}
            <Pressable 
              onPress={handleGoUp} 
              style={{
                position: "absolute",
                top: "30%",
                left: "80%",
                zIndex: 20,
              }}
              className="active:scale-95"
            >
              <Image 
                source={require("../../assets/images/LightArrow.png")} 
                style={{ width: 40, height: 40, transform: [{ rotate: "-90deg" }] }}
                contentFit="contain"
              />
            </Pressable>
          </View>
        )}

        {currentRoom === "potion-locked" && (
          <PotionRoom onGoBack={() => setCurrentRoom("room")} />
        )}

        {currentRoom === "blacksmith-locked" && (
          <BlacksmithRoom onGoBack={() => setCurrentRoom("room")} />
        )}

        {currentRoom === "dungeon-locked" && (
          <DungeonRoom onGoBack={() => setCurrentRoom("forest")} />
        )}

        {/* Navigation Overlay */}


        {currentRoom === "room" && (
          <>
            <Pressable 
              onPress={() => setCurrentRoom("potion-locked")} 
              className="absolute left-4 active:scale-95 z-10"
              style={{ marginTop: 5 }}
            >
              <Image 
                source={require("../../assets/images/Arrow.png")} 
                style={{ width: 40, height: 40, transform: [{ rotate: "180deg" }] }}
                contentFit="contain"
              />
            </Pressable>

            <Pressable 
              onPress={() => setCurrentRoom("blacksmith-locked")} 
              className="absolute right-4 active:scale-95 z-10"
              style={{ marginTop: 5 }}
            >
              <Image 
                source={require("../../assets/images/Arrow.png")} 
                style={{ width: 40, height: 40 }}
                contentFit="contain"
              />
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
