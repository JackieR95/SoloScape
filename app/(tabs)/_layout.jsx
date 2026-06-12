import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";

export default function TabLayout() {
  // Tabs Layout - AI generated this tab bar configuration and styling to save setup time, i'll adjust the look later
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#34d399", // Emerald-400
        tabBarInactiveTintColor: "#737373", // Neutral-500
        tabBarStyle: {
          backgroundColor: "#0a0a0a",
          borderTopWidth: 4,
          borderTopColor: "#262626", // Neutral-800
          height: Platform.OS === "ios" ? 88 : 70,
          paddingBottom: Platform.OS === "ios" ? 30 : 12,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
          fontSize: 10,
          fontWeight: "bold",
          letterSpacing: 1,
          textTransform: "uppercase",
        },
      }}
    >
      <Tabs.Screen
        name="game"
        options={{
          title: "Play",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gamepad-variant" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="skills"
        options={{
          title: "Skills",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="sword" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          title: "Bag",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-handle" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
