import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router"; // Import router for tab jumping

// Import your custom hook to connect to state
import { useGameState } from "@/context/GameStateContext";

export default function SettingsScreen() {
  // Extract context values
  const { resetGame, volume, setVolume } = useGameState();

  const handleResetPress = () => {
    // 1. Reset all resource counts and levels
    resetGame();
    // 2. Route back to the start/index screen
    router.replace("/");
  };

  const decreaseVolume = () => {
    setVolume((prev) => Math.max(0, Math.round((prev - 0.1) * 10) / 10));
  };

  const increaseVolume = () => {
    setVolume((prev) => Math.min(1, Math.round((prev + 0.1) * 10) / 10));
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-950 p-4 justify-between">
      
      {/* Header Panel */}
      <View className="items-center py-2 border-b border-neutral-800 mb-6">
        <Text className="text-emerald-400 font-mono uppercase tracking-widest text-lg font-bold">
          Settings
        </Text>
      </View>

      {/* Main Settings Body */}
      <View className="flex-1 justify-center items-center px-4">
        {/* Retro Volume Control Block */}
        <View className="w-full max-w-xs items-center bg-neutral-900 border-4 border-neutral-800 p-5 rounded-sm shadow-[4px_4px_0px_0px_#171717] mb-8">
          <Text className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4 font-bold">
            MUSIC & SFX VOLUME
          </Text>
          
          <Text className="text-white font-mono text-lg font-bold mb-4">
            {Math.round(volume * 100)}%
          </Text>

          <View className="flex-row items-center justify-between w-full">
            {/* Minus Button */}
            <Pressable 
              onPress={decreaseVolume}
              className="w-10 h-10 bg-neutral-800 border-4 border-neutral-950 items-center justify-center rounded-sm active:scale-95 shadow-[2px_2px_0px_0px_#000]"
            >
              <Text className="text-white font-mono font-bold text-lg">-</Text>
            </Pressable>

            {/* 10 Discrete Volume Blocks */}
            <View className="flex-row flex-1 justify-center mx-3 gap-1">
              {[...Array(10)].map((_, i) => {
                const isFilled = volume >= (i + 1) / 10;
                return (
                  <Pressable
                    key={i}
                    onPress={() => setVolume((i + 1) / 10)}
                    style={{ flex: 1, height: 24 }}
                    className={`${
                      isFilled 
                        ? "bg-emerald-500 border-b-4 border-emerald-700" 
                        : "bg-neutral-800 border-b-4 border-neutral-950"
                    } rounded-xs active:scale-95`}
                  />
                );
              })}
            </View>

            {/* Plus Button */}
            <Pressable 
              onPress={increaseVolume}
              className="w-10 h-10 bg-neutral-800 border-4 border-neutral-950 items-center justify-center rounded-sm active:scale-95 shadow-[2px_2px_0px_0px_#000]"
            >
              <Text className="text-white font-mono font-bold text-lg">+</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Red Retro Reset Button */}
      <Pressable 
        onPress={handleResetPress}
        className="w-full max-w-xs mx-auto bg-red-700 border-4 border-red-950 py-4 px-6 rounded-sm shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0px_0px_#000]"
      >
        <Text className="text-white font-mono text-sm font-bold text-center uppercase tracking-widest">
          Reset Game Save
        </Text>
      </Pressable>

    </SafeAreaView>
  );
}

