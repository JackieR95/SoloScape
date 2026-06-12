import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router"; // Import router for tab jumping

// Import your custom hook to connect to state
import { useGameState } from "@/context/GameStateContext";

export default function SettingsScreen() {
  // Extract resetGame function
  const { resetGame } = useGameState();

  const handleResetPress = () => {
    // 1. Reset all resource counts and levels
    resetGame();
    // 2. Jump tabs back to the play page
    router.replace("/(tabs)/game");
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
      <View className="flex-1 justify-center items-center">
        <Text className="text-neutral-500 font-mono text-center">
          Options are locked during the prototype phase.
        </Text>
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
