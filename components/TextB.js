import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { c3 } from "../themes/Colors";

export default function TextB({ style, color, size, children }) {
  return (
    <View>
      <Text
        style={[
          styles.text,
          { color: color ? color : c3 },
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
    fontFamily: "UbuntuB",
  },
});
