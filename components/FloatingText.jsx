/**
 * File: components/FloatingText.jsx
 * Description: Particle animation component that drifts upward and fades out to display 
 *              gathered resource numbers (e.g. +1 Wood) directly above the tapped node.
 * Author: Jacqueline Rael
 * Date Created: 06/12/2026
 */

import React, { useEffect, useRef } from "react";
import { Text, Animated } from "react-native";

export default function FloatingText({ x, y, text }) {
  const driftY = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(driftY, {
        toValue: -60, // Drift upwards by 60px
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 0, // Fade out
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [driftY, fade]);

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: x - 20,
        top: y - 20,
        transform: [{ translateY: driftY }],
        opacity: fade,
        zIndex: 100,
      }}
    >
      <Text 
        style={{ color: "#9775a6" }}
        className="font-mono font-black text-sm shadow-black shadow-sm"
      >
        {text}
      </Text>
    </Animated.View>
  );
}
