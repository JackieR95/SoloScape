import React, { createContext, useContext, useState } from "react";

const MAX_LEVEL = 5;

const GameStateContext = createContext();

export function GameStateProvider({ children }) {
  // Game states
  const [resources, setResources] = useState({
    wood: 0,
    stone: 0,
  });

  const [skills, setSkills] = useState({
    woodcutting: { level: 1, xp: 0 },
    mining: { level: 1, xp: 0 },
    character: { level: 1, xp: 0 },
  });

  // Multipliers (Hoisted functions)
  function getWoodMultiplier() {
    return 1;
  }

  function getStoneMultiplier() {
    return 1;
  }

  // XP progression formulas
  function getXpNeeded(level) {
    if (level >= MAX_LEVEL) return Infinity;
    const baseXP = 50;
    const XP_MULTIPLIER = 1.15;
    return Math.round(baseXP * Math.pow(XP_MULTIPLIER, level - 1));
  }

  function getSkillXpNeeded(level) {
    if (level >= MAX_LEVEL) return Infinity;
    const baseXP = 100;
    const XP_MULTIPLIER = 2.5;
    return Math.round(baseXP * Math.pow(XP_MULTIPLIER, level - 1));
  }

  // XP gained per tap
  function getWoodXpGained(level) {
    return 1;
  }

  function getStoneXpGained(level) {
    return 1;
  }

  // Action Triggers
  function gatherWood() {
    const woodGained = getWoodMultiplier();

    setResources((prev) => ({
      ...prev,
      wood: prev.wood + woodGained,
    }));

    setSkills((prev) => {
      const currentLevel = prev.woodcutting.level;
      const xpGained = getWoodXpGained(currentLevel);

      if (currentLevel >= MAX_LEVEL) {
        return prev;
      }
      
      const newXp = prev.woodcutting.xp + xpGained;
      const xpNeeded = getSkillXpNeeded(currentLevel);

      if (newXp >= xpNeeded) {
        return {
          ...prev,
          woodcutting: {
            level: currentLevel + 1,
            xp: newXp - xpNeeded,
          },
        };
      }
      return {
        ...prev,
        woodcutting: {
          ...prev.woodcutting,
          xp: newXp,
        },
      };
    });
  }

  function gatherStone() {
    const stoneGained = getStoneMultiplier();

    setResources((prev) => ({
      ...prev,
      stone: prev.stone + stoneGained,
    }));

    setSkills((prev) => {
      const currentLevel = prev.mining.level;
      const xpGained = getStoneXpGained(currentLevel);

      if (currentLevel >= MAX_LEVEL) {
        return prev;
      }
      
      const newXp = prev.mining.xp + xpGained;
      const xpNeeded = getSkillXpNeeded(currentLevel);

      if (newXp >= xpNeeded) {
        return {
          ...prev,
          mining: {
            level: currentLevel + 1,
            xp: newXp - xpNeeded,
          },
        };
      }
      return {
        ...prev,
        mining: {
          ...prev.mining,
          xp: newXp,
        },
      };
    });
  }

  function resetGame() {
    setResources({ wood: 0, stone: 0 });
    setSkills({
      woodcutting: { level: 1, xp: 0 },
      mining: { level: 1, xp: 0 },
      character: { level: 1, xp: 0 },
    });
  }

  return (
    <GameStateContext.Provider
      value={{
        resources,
        skills,
        getXpNeeded,
        getSkillXpNeeded,
        getWoodMultiplier,
        getStoneMultiplier,
        getWoodXpGained,
        getStoneXpGained,
        gatherWood,
        gatherStone,
        resetGame,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
}
