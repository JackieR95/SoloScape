import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  // Tracks whether the game data has finished loading from AsyncStorage
  const [isLoaded, setIsLoaded] = useState(false);

  // Tracks whether the user has started/played the game before
  const [hasPlayed, setHasPlayed] = useState(false);

  // Load existing save data from AsyncStorage when the application starts
  useEffect(() => {
    async function loadSavedState() {
      try {
        const savedResources = await AsyncStorage.getItem("soloscape_resources");
        const savedSkills = await AsyncStorage.getItem("soloscape_skills");
        const savedHasPlayed = await AsyncStorage.getItem("soloscape_has_played");
        if (savedResources) {
          setResources(JSON.parse(savedResources));
        }
        if (savedSkills) {
          setSkills(JSON.parse(savedSkills));
        }
        if (savedHasPlayed === "true") {
          setHasPlayed(true);
        }
      } catch (e) {
        console.error("Failed to load game save:", e);
      } finally {
        // Mark loading as complete so the auto-save effect can safely start tracking changes
        setIsLoaded(true);
      }
    }
    loadSavedState();
  }, []);

  // Autosave game progress to AsyncStorage whenever resources, skills, or hasPlayed status change.
  // We check isLoaded to prevent blank default states from overwriting saved data on boot.
  useEffect(() => {
    if (!isLoaded) return;
    async function saveState() {
      try {
        await AsyncStorage.setItem("soloscape_resources", JSON.stringify(resources));
        await AsyncStorage.setItem("soloscape_skills", JSON.stringify(skills));
        await AsyncStorage.setItem("soloscape_has_played", hasPlayed ? "true" : "false");
      } catch (e) {
        console.error("Failed to save game state:", e);
      }
    }
    saveState();
  }, [resources, skills, hasPlayed, isLoaded]);

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

  function startGame() {
    setHasPlayed(true);
  }

  function resetGame() {
    setResources({ wood: 0, stone: 0 });
    setSkills({
      woodcutting: { level: 1, xp: 0 },
      mining: { level: 1, xp: 0 },
      character: { level: 1, xp: 0 },
    });
    setHasPlayed(false);
    // Explicitly clean AsyncStorage when the save is wiped!
    AsyncStorage.multiRemove(["soloscape_resources", "soloscape_skills", "soloscape_has_played"]).catch((e) =>
      console.error("Failed to clear save storage on reset:", e)
    );
  }

  return (
    <GameStateContext.Provider
      value={{
        resources,
        skills,
        isLoaded,
        hasPlayed,
        startGame,
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
