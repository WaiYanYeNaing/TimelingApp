import Axios from "axios";
import { Icon } from "native-base";
import React, { useEffect, useState } from "react";
import { ListItem } from "react-native-elements";
import { Image, StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Container from "../components/Container";
import Header from "../components/Header";
import Row from "../components/Row";
import TextM from "../components/TextM";
import Text from "../components/TextR";
import { c1, c2, c3, c4, c5, c6 } from "../themes/Colors";

export default function Settings({ navigation }) {
  const list = [
    {
      title: "Notification",
      icon: "bell",
    },
    {
      title: "Privacy",
      icon: "lock",
    },
    {
      title: "Security",
      icon: "shield",
    },
    {
      title: "Account",
      icon: "user",
    },
    {
      title: "Help",
      icon: "help-circle",
    },
    {
      title: "About",
      icon: "alert-octagon",
    },
    {
      title: "Theme",
      icon: "moon",
    },
    {
      title: "Invite Friends",
      icon: "user-plus",
    },
    {
      title: "Log Out",
      icon: "log-out",
    },

  ];
  return (
    <Container>
      {/* Action Header */}
      <Header style={styles.header}>
        <Row style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              type="Foundation"
              name="arrow-left"
              style={{ color: c3, fontSize: 30, marginTop: -3 }}
            />
          </TouchableOpacity>
          <Text size={16} color={c6} style={styles.txt}>
            Settings
          </Text>
        </Row>
      </Header>

      {/* List Of Settings */}
      <View style={{ flex: 1 }}>
        {list.map((item, i) => (
          <ListItem key={i} containerStyle={{ backgroundColor: c1 }}>
            <Icon
              type="Feather"
              name={item.icon}
              style={{ color: c5, fontSize: 22 }}
            />
            <ListItem.Content>
              <ListItem.Title style={{ color: c6 }}>
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
            {/* <ListItem.Chevron/> */}
          </ListItem>
        ))}
        
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  txt: {
    textAlign: "left",
    marginLeft: 50,
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 19,
  },
  row: {
    marginLeft: -4,
    height: 38,
  },
});
