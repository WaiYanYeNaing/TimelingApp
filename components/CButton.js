import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CButton({
  onPress,
  title,
  style,
  backgroundColor,
  size,
}) {
  return (
    <View>
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.appButtonContainer,
        { backgroundColor: backgroundColor ? backgroundColor : "#EA4C89" },
        { size: size },
        style,
      ]}
    >
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontFamily: "UbuntuM",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    //textTransform: "uppercase",
  },
});
