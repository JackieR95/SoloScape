import React from "react";
import { View, Text, Pressable } from "react-native";

export default function MineRoom({ stone, onTap }) {
  return (
    <View className="items-center justify-center w-full h-full relative">
      {/* clickable rock - AI generated this placeholder box to save layout time, i'll replace it with my own art asset later */}
      <Pressable
        onPress={(e) => onTap(e, "stone")}
        className="w-32 h-32 bg-neutral-500 border-4 border-neutral-700 items-center justify-center rounded-sm active:scale-95 shadow-[4px_4px_0px_0px_#262626]"
      >
        <Text className="text-white font-mono font-bold text-center text-xs">TAP ROCK</Text>
      </Pressable>
    </View>
  );
}
