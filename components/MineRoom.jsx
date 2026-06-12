/**
 * File: components/MineRoom.jsx
 * Description: Basement mining zone layout component that displays the basement cave background 
 *              and handles the interactable stone tap node and spring squish animations.
 * Author: Jacqueline Rael
 * Date Created: 06/12/2026
 */

import React, { useRef } from "react";
import { View, Pressable, Animated } from "react-native";
import { Image } from "expo-image";

export default function MineRoom({ stone, onTap }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      friction: 4,
      tension: 40,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
      tension: 40,
    }).start();
  };

  return (
    <View className="items-center justify-center w-full h-full relative">
      <Image 
        source={require("../assets/images/basement.png")} 
        style={{ width: "100%", height: "100%", position: "absolute" }}
        contentFit="contain"
      />
      
      {/* Clickable Rock (stone.png) with spring squash-and-bounce animation */}
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={(e) => onTap(e, "stone")}
        style={{
          position: "absolute",
          top: "50%",
          left: "37.5%",
          width: "25%",
          height: "25%",
          zIndex: 10,
        }}
      >
        <Animated.View style={{ width: "100%", height: "100%", transform: [{ scale: scaleAnim }] }}>
          <Image 
            source={require("../assets/images/stone.png")} 
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}
