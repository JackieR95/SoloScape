import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import your custom hook to access the context values
import { useGameState } from "@/context/GameStateContext";

export default function SkillsScreen() {
  // Extract global skills and XP math functions
  const { skills, getSkillXpNeeded, getXpNeeded } = useGameState();

  // Helper function to render a skill card dynamically
  // AI helped generate this layout template and progress bar blocks to save time, i'll polish the graphics later
  const renderSkillCard = (title, level, xp, xpNeededFunction, isCombat = false) => {
    const MAX_LEVEL = 5;
    const isMaxed = level >= MAX_LEVEL;

    // Get total XP required for the current level
    const totalXpNeeded = xpNeededFunction(level);
    
    // Calculate progress fraction (0.0 to 1.0)
    const progressFraction = isMaxed ? 1 : Math.min(xp / totalXpNeeded, 1);
    const progressPercent = Math.round(progressFraction * 100);

    // Calculate how much XP is left before leveling up
    const xpRemaining = isMaxed ? 0 : totalXpNeeded - xp;

    // Generate an 8-bit character progress bar (10 blocks total)
    const filledBlocks = Math.round(progressFraction * 10);
    const progressBar = "█".repeat(filledBlocks) + "░".repeat(10 - filledBlocks);

    return (
      <View 
        className={`border-4 p-4 mb-4 rounded-sm bg-neutral-900 ${
          isCombat ? "border-red-800 bg-red-950/20" : "border-neutral-700"
        }`}
      >
        {/* Title and Level */}
        <View className="flex-row justify-between items-center mb-2">
          <Text 
            className={`font-mono text-base font-bold ${
              isCombat ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {title}
          </Text>
          <Text className="text-white font-mono text-sm font-bold">
            LV. {level}
          </Text>
        </View>

        {/* Visual Progress Bar */}
        <View className="my-1">
          <Text 
            className={`font-mono text-base tracking-tighter ${
              isCombat ? "text-red-500" : "text-emerald-500"
            }`}
          >
            {progressBar} <Text className="text-white text-xs">{progressPercent}%</Text>
          </Text>
        </View>

        {/* XP Details and Remaining XP */}
        <View className="flex-row justify-between items-center mt-2 border-t border-neutral-800/60 pt-2">
          {isMaxed ? (
            <Text className="text-yellow-500 font-mono text-[10px] uppercase font-bold tracking-widest">
              ★ MAX LEVEL REACHED ★
            </Text>
          ) : (
            <>
              <Text className="text-neutral-500 font-mono text-[10px]">
                XP: {xp} / {totalXpNeeded}
              </Text>
              <Text className="text-neutral-400 font-mono text-[10px] font-bold">
                {xpRemaining} XP TO LV. {level + 1}
              </Text>
            </>
          )}
        </View>
        
        {isCombat && (
          <Text className="text-red-600/70 font-mono text-[8px] mt-1 text-center uppercase tracking-widest font-black">
            🔒 Dungeon combat required to earn XP
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-950 p-4">
      
      {/* Header Panel */}
      <View className="items-center py-2 border-b border-neutral-800 mb-6">
        <Text className="text-emerald-400 font-mono uppercase tracking-widest text-lg font-bold">
          Character Skills
        </Text>
      </View>

      <ScrollView className="flex-1">
        
        {/* Character/Combat Level (Dungeon locked) */}
        {renderSkillCard("Character Level 💀", skills.character.level, skills.character.xp, getXpNeeded, true)}

        {/* Gathering Skills (Woodcutting & Mining) */}
        {renderSkillCard("Woodcutting 🪵", skills.woodcutting.level, skills.woodcutting.xp, getSkillXpNeeded)}
        {renderSkillCard("Mining 🪨", skills.mining.level, skills.mining.xp, getSkillXpNeeded)}

      </ScrollView>

    </SafeAreaView>
  );
}
