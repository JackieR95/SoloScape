import React from "react";
import { View, Text, Pressable } from "react-native";

export default function PotionRoom({ onGoBack }) {
  // Locked Area - AI generated this warning card and text message to save time, i'll replace it with the potion room gameplay when finished
  return (
    <View className="items-center p-6 max-w-xs border-4 border-yellow-500 bg-neutral-950/90 rounded-sm shadow-[6px_6px_0px_0px_#ca8a04]">
      <Text className="text-3xl mb-2">🧪</Text>
      <Text className="text-yellow-400 font-mono font-black text-center text-lg tracking-widest uppercase mb-2">
        Potion Room
      </Text>
      
      {/* Under Construction Mark */}
      <Text className="text-red-500 font-mono text-[10px] uppercase font-bold tracking-widest mb-3">
        🚧 Under Construction 🚧
      </Text>

      <Text className="text-neutral-400 font-mono text-center text-[10px] leading-relaxed mb-4">
        Brewing stations are closed! The Alchemist is currently gathering rare herbs. Check back in a future update.
      </Text>

      <Pressable 
        onPress={onGoBack}
        className="bg-yellow-500 border-4 border-yellow-700 py-2 px-6 rounded-sm shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#000]"
      >
        <Text className="text-neutral-950 font-mono text-xs font-bold uppercase tracking-widest">
          Go Back
        </Text>
      </Pressable>
    </View>
  );
}
