import React from "react";
import Button from "../components/CButton";
import Container from "../components/Container";
import Row from "../components/Row";
import Header from "../components/Header";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { c1, c2, c3, c5, c4 } from "../themes/Colors";
import TextM from "../components/TextM";
import {
  View,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Image,
} from "react-native";

export default function AddFriend({ navigation }) {
  return (
    <Container style={styles.container}>
      {/* Header Action btn */}
      <Header style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type="Foundation"
            name="arrow-left"
            style={{ color: c3, fontSize: 30 }}
          />
        </TouchableOpacity>
      </Header>
      <View style={styles.Container}>
        <Image
          style={[styles.image]}
          source={require("../assets/images/invite-friend.png")}
        />
        {/* Auto Match Button*/}
        <Row>
          <Button
            onPress={() => navigation.navigate("FindRandom")}
            style={[styles.autobtn]}
            text={"Auto-Match"}
          ></Button>
        </Row>
        {/* Manaul Button*/}
        <Row>
          <Button
            onPress={() => navigation.navigate("Find")}
            style={[styles.manualbtn]}
            color={c5}
            text={"Find Manually"}
          ></Button>
        </Row>
        {/* Add By Id*/}
        <Row>
          <TextM style={styles.Txt}>Add Friend By ID</TextM>
        </Row>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  autobtn: {
    top: 20,
    width: 370,
    height: 55,
  },
  manualbtn: {
    height: 55,
    top: 40,
    width: 370,
    backgroundColor: c2,
  },
  image: {
    alignSelf: "center",
  },
  header: {
    flex: 1,
    marginHorizontal: 20,
  },
  Container: {
    flex: 6,
    alignItems: "center",
  },
  Txt: {
    fontSize: 13,
    top: 60,
  },
  container: {
    backgroundColor: c1,
  },
});
