import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Row({ style, children }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
