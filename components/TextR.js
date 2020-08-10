import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TextR({ style, color, size, children }) {
  return (
    <View>
      <Text
        style={[
          styles.text,
          { color: color ? color : "#4c4c4c" },
          { fontSize: size },
          style,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Ubuntu",
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});
