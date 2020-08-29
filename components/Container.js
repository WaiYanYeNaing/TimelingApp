import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import { c1 } from "../themes/Colors";

const screenHeight = Math.round(Dimensions.get("window").height);

export default function Container(props) {
  return <View style={[styles.container, props.style]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "center",
    backgroundColor: c1,
  },
});
