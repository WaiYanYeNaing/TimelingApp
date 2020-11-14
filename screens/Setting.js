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
import { c1 ,c2, c3, c4, c5, c6 } from "../themes/Colors";

export default function Settings({ navigation }) {
  const list = [
    {
      title: "Notification",
      icon: "notifications",
    },
    {
      title: "Privacy",
      icon: "lock",
    },
    {
      title: "Security",
      icon: "md-albums",
    },
    {
      title: "Ads",
      icon: "md-megaphone",
    },
    {
      title: "Account",
      icon: "md-person",
    },
    {
      title: "Help",
      icon: "md-help-circle",
    },
    {
      title: "About",
      icon: "md-information-circle",
    },
    {
      title: "Theme",
      icon: "md-moon",
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

      {/* My Account */}
      <View style={{ flex: 1 }}>
        {list.map((item, i) => (
          <ListItem
            key={i}
            containerStyle={{ backgroundColor: c1 }}
            bottomDivider={{color:c5}}
          >
            <Icon name={item.icon} style={{ color: c5 }} />
            <ListItem.Content>
              <ListItem.Title style={{ color: c6 }}>
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron/>
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
  },
  row: {
    marginLeft: -4,
    height: 38,
  },
});
