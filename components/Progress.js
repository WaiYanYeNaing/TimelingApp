import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./TextR";

export default function Progress({ style, done, level }) {
  return (
    <View style={[styles.progress, style]}>
      <View
        style={[
          styles.progressDone,
          { opacity: 1, width: `${done <= 10 ? 10 : done}%` },
        ]}
      >
        <Text style={styles.progressText}>{level}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    backgroundColor: "#E9EAED",
    borderRadius: 20,
    position: "relative",
    marginVertical: 15,
    height: 25,
    width: 300,
  },
  progressDone: {
    backgroundColor: "#6A64EC",
    borderRadius: 20,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: 0,
    opacity: 0,
  },
  progressText: {
    color: "#fff",
  },
});
