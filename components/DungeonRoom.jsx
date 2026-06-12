/**
 * File: components/DungeonRoom.jsx
 * Description: Locked area warning component representing the Dungeon Gate, 
 *              displayed when navigating up from the Forest.
 * Author: Jacqueline Rael
 * Date Created: 06/12/2026
 */

import React from "react";
import { View, Text, Pressable } from "react-native";

export default function DungeonRoom({ onGoBack }) {
  // Locked Area - AI generated this warning card and text message to save time, i'll replace it with the dungeon combat gameplay when finished
  return (
    <View className="items-center p-6 max-w-xs border-4 border-red-500 bg-neutral-950/90 rounded-sm shadow-[6px_6px_0px_0px_#991b1b]">
      <Text className="text-3xl mb-2">💀</Text>
      <Text className="text-red-500 font-mono font-black text-center text-lg tracking-widest uppercase mb-2">
        Dungeon Gate
      </Text>

      {/* Under Construction Mark */}
      <Text className="text-red-600 font-mono text-[10px] uppercase font-bold tracking-widest mb-3">
        🚧 Area Locked 🚧
      </Text>

      <Text className="text-neutral-400 font-mono text-center text-[10px] leading-relaxed mb-4">
        The dungeon runs too deep! Danger levels are critical. Requires Level 10 Woodcutting and Mining to breach.
      </Text>

      <Pressable 
        onPress={onGoBack}
        className="bg-red-600 border-4 border-red-800 py-2 px-6 rounded-sm shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#000]"
      >
        <Text className="text-white font-mono text-xs font-bold uppercase tracking-widest">
          Go Back
        </Text>
      </Pressable>
    </View>
  );
}
