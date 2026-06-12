/**
 * File: app/(tabs)/bag.jsx
 * Description: Inventory display screen showing current resource counts (Wood, Stone) in styled 
 *              retro RPG grids and placeholder slots for upcoming items.
 * Author: Jacqueline Rael
 * Date Created: 06/12/2026
 */

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import your custom hook here
import { useGameState } from "@/context/GameStateContext";

export default function BagScreen() {
  // TODO: Extract resources from the useGameState hook:
  const { resources } = useGameState();

  // Dummy values for now (you will replace these with resources.wood and resources.stone)
  const woodCount = resources.wood;
  const stoneCount = resources.stone;

  return (
    <SafeAreaView className="flex-1 bg-neutral-950 p-4">
      {/* Header Panel */}
      <View className="items-center py-2 border-b border-neutral-800 mb-6">
        <Text 
          style={{ color: "#9775a6" }}
          className="font-mono uppercase tracking-widest text-lg font-bold"
        >
          Inventory
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* RPG-style Grid - AI generated this grid skeleton to save layout time, i'll adjust styling later */}
        <View className="flex-row flex-wrap justify-between">
          {/* Wood Item Slot */}
          <View className="w-[48%] border-4 border-neutral-700 bg-neutral-900 p-4 mb-4 items-center rounded-sm">
            <Text className="text-orange-400 text-3xl">🪵</Text>
            <Text className="text-white font-mono font-bold mt-2 text-xs tracking-wider">
              WOOD
            </Text>
            {/* TODO: Change this to {resources.wood} */}
            <Text 
              style={{ color: "#9775a6" }}
              className="font-mono text-base font-black mt-1"
            >
              x{woodCount}
            </Text>
          </View>

          {/* Stone Item Slot */}
          <View className="w-[48%] border-4 border-neutral-700 bg-neutral-900 p-4 mb-4 items-center rounded-sm">
            <Text className="text-neutral-400 text-3xl">🪨</Text>
            <Text className="text-white font-mono font-bold mt-2 text-xs tracking-wider">
              STONE
            </Text>
            {/* TODO: Change this to {resources.stone} */}
            <Text 
              style={{ color: "#9775a6" }}
              className="font-mono text-base font-black mt-1"
            >
              x{stoneCount}
            </Text>
          </View>

          {/* Locked Slots (Decorative placeholders for items like Potions/Weapons later) */}
          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={index}
              className="w-[48%] border-4 border-dashed border-neutral-800 bg-neutral-950/40 p-4 mb-4 items-center justify-center opacity-40 rounded-sm"
            >
              <Text className="text-neutral-600 text-3xl">?</Text>
              <Text className="text-neutral-700 font-mono text-[10px] mt-2">
                EMPTY SLOT
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
