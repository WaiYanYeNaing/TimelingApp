import Axios from "axios";
import { Icon } from "native-base";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Container from "../components/Container";
import Header from "../components/Header";
import Row from "../components/Row";
import TextM from "../components/TextM";
import Text from "../components/TextR";
import { c2, c3, c4, c5, c6 } from "../themes/Colors";

export default function Settings({ navigation }) {
  return (
    <Container>
      {/* Action Header */}
      <Header style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type="Foundation"
            name="arrow-left"
            style={{ color: c3, fontSize: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text size={16} color={c6} style={styles.txt}>
            Setting
          </Text>
        </TouchableOpacity>
      </Header>

      {/* Title Icon */}
      {/* <View style={styles.title_icon_text_container}>
        <View style={styles.title_icon_container}>
          <Image
            source={require("../assets/images/connection.png")}
            style={styles.title_icon}
          />
        </View>
        <TextM size={20} style={styles.title_text}>
          Setting
        </TextM>
      </View> */}
      <ScrollView></ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  txt: {
    marginTop: 3,
  },
  title_icon_text_container: {
    marginVertical: 20,
    alignItems: "center",
  },
  title_icon_container: {
    width: 70,
    height: 70,
    paddingTop: 3,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: c5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  title_icon: {
    width: 45,
    height: 45,
  },
  title_text: {
    marginTop: 10,
  },
  // ??????????????????????????????????????????????????????
  friend_card: {
    backgroundColor: c2,
    height: 80,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 3,
  },
  thumbnail: {
    marginRight: 15,
  },
});
