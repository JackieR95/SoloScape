import React from "react";
import { View, Text, Pressable } from "react-native";

export default function ForestRoom({ wood, onTap }) {
  return (
    <View className="items-center justify-center w-full h-full relative">
      {/* clickable tree - AI generated this placeholder box to save layout time, i'll replace it with my own art asset later */}
      <Pressable
        onPress={(e) => onTap(e, "wood")}
        className="w-32 h-32 bg-emerald-700 border-4 border-emerald-950 items-center justify-center rounded-sm active:scale-95 shadow-[4px_4px_0px_0px_#064e3b]"
      >
        <Text className="text-white font-mono font-bold text-center text-xs">TAP TREE</Text>
      </Pressable>
    </View>
  );
}
