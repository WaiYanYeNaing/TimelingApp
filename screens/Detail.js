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

export default function Detail({ navigation }) {
  return (
    <Container style={styles.container}>
      {/* Header Action btn */}
      {/* <Header style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type="Foundation"
            name="arrow-left"
            style={{ color: c3, fontSize: 30 }}
          />
        </TouchableOpacity>
      </Header> */}
      <View style={styles.Container}>

      
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
 container: {
    backgroundColor: c1,
  },
});
