import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TextR(props) {
  return (
    <View>
      <Text style={[styles.text, props.style]}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Ubuntu",
  },
});
