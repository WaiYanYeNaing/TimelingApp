import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ style, children }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
