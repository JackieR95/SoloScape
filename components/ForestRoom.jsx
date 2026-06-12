import React, { useRef } from "react";
import { View, Pressable, Animated } from "react-native";
import { Image } from "expo-image";

export default function ForestRoom({ wood, onTap }) {
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
        source={require("../assets/images/forest.png")} 
        style={{ width: "100%", height: "100%", position: "absolute" }}
        contentFit="contain"
      />
      
      {/* Clickable Tree (tree.png) with spring squash-and-bounce animation */}
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={(e) => onTap(e, "wood")}
        style={{
          position: "absolute",
          top: "20%",
          left: "54%",
          width: "36%",
          height: "54%",
          zIndex: 10,
        }}
      >
        <Animated.View style={{ width: "100%", height: "100%", transform: [{ scale: scaleAnim }] }}>
          <Image 
            source={require("../assets/images/tree.png")} 
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}

