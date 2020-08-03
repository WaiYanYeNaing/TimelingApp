import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function SendSuccess() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/sent.png")}
        style={styles.image}
      />
      <Text style={styles.sentMessage}>Message Sent</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 140,
  },
  sentMessage: {
    marginTop: 10,
    fontSize: 18,
    color: "#1A3BCA",
  },
});
