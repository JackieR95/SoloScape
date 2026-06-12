# 🪵 SoloScape 💀

Hey there! Welcome to **SoloScape**, a personalized incremental adventure app I created as my own little "digital escape." 

I wanted to simulate the satisfying progression of a fantasy RPG—leveling up skills, gathering resources, and gear progression—but without all the heavy grind and bloated mechanics you see in traditional idle games. SoloScape is my personal sandbox: it's clean, retro, and built to let me manage a character's journey at my own pace.

---

## 🎥 Videos
- [Code Demo](https://www.youtube.com/watch?v=YOUR_DEMO_VIDEO_ID_HERE)
- [Code Walkthrough](https://www.youtube.com/watch?v=YOUR_WALKTHROUGH_VIDEO_ID_HERE)

---

## 🎮 What is SoloScape?

SoloScape is an active-meets-idle incremental RPG. The core game loop revolves around managing your character's activities, exploring rooms, gathering raw materials, and watching your skills level up.

### 🕹️ How to Play:
- **Choose Your Task**: Navigate to a resource area and tap the node (like the tree in the Forest or the mining rock in the Basement) to start gathering.
- **Go Active or Passive**: Once you begin, your character gathers automatically as the progress bar fills. But if you want to speed things up, you can **manually tap the node to accelerate progress** and get rewards faster!
- **Level Up**: Every successful action awards raw materials (Wood, Stone) and Experience Points (XP). Reach the XP cap to increase your skill level.
- **RPG Bag & Saves**: Your inventory and levels persist automatically, so your progress is always safe.

---

## 🏡 Exploring the Scape (Room Navigation)

The game is structured as an interactive 8-bit hub centered around **My House**, which connects you to all the other areas:
- **My House**: Your starting hub. Look at the doorway or the stairs to see where you can go.
- **Up (Doorway) ➔ The Forest**: Grab your axe and chop down the giant animated pine tree to train **Woodcutting**.
- **Down (Stairs) ➔ The Basement / Mine**: Head down the ladder into the dark cave to mine stones and train **Mining**.
- **Left ➔ Potion Room** *(Under Construction)*: The future home of alchemy and brewing.
- **Right ➔ Blacksmith** *(Under Construction)*: Where we will eventually smelt bars and forge gear.
- **Dungeon Gate** *(Locked)*: Located past the Forest. It requires Level 10 in both Woodcutting and Mining to breach. This is where character combat levels will be tested!

---

## 🎨 Design & Feel (Velvet Cherry GB)

I wanted the game to feel like a premium, retro handheld console experience. 
- **The Palette**: Styled entirely in the **Velvet Cherry GB** theme—a gorgeous four-color palette (`#2d162c` darkest, `#412752` dark, `#683a68` light, and `#9775a6` lightest) that replaces standard harsh green colors with premium purples and deep cherries.
- **Typography**: Uses the classic retro pixel font `PressStart2P` for all UI elements, labels, and text.
- **Animations**: Tapping resource nodes triggers a physics-based squash-and-stretch spring animation.
- **Sound Design**: Features a chiptune chiptrack background loop, accompanied by a satisfying retro *Bubble Click* tap sound. Adjust the volume with the custom 10-step slider in the **Settings** menu.

---

## ⚙️ Tech Stack & Dependencies

SoloScape is built with **React Native** and **Expo SDK 54**, using **Tailwind CSS (NativeWind)** for styling.

### 📚 Libraries Required:
To run the project, the following Expo and React Native libraries are utilized (which will be installed automatically with `npm install`):
- `expo-av`: For ambient background music looping and sound effect playback.
- `expo-image`: For high-performance image caching and transition rendering.
- `expo-font`: For loading custom retro `.ttf` pixel-art typography on startup.
- `expo-haptics`: For subtle tactile haptic feedback on interactive button and resource node presses.
- `@react-native-async-storage/async-storage`: For local client-side data saving, persistent level tracking, and volume configurations.

### How to run it:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npx expo start
   ```

3. **Open the App**:
   - Scan the QR code in your terminal using the **Expo Go** app on iOS or Android.
   - Or press `i` to launch it in the iOS Simulator / `a` for the Android Emulator.

---

## 📜 Citations & Audio Attribution

All media assets and resources used in this game are credited below:

- **Background Music**: 
  - **Song Title**: *Lo-Bit 8 ( LoFi , Nostalgic )*
  - **Artist**: HoliznaPATREON
  - **Source**: Free Music Archive
  - **License Type**: CC BY-NC-ND (Attribution-NonCommercial-NoDerivatives)
  - **Usage**: Personal use allowed, non-commercial only, no derivative works.
