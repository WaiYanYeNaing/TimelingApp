import React, { Component, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Card, CardItem, Body, Icon, Right, CheckBox } from "native-base";

export default function Category(props) {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Body>
        <TouchableOpacity
          onPress={() => {
            props.selected(props.id);
          }}
          //   onPress={() => {
          //     this.props.navigation.navigate("Read", {
          //       item: this.props,
          //     });
          //   }}
        >
          {/* <Image source={this.props.image} style={styles.image} /> */}

          <ImageBackground
            source={props.image}
            style={styles.image}
            imageStyle={{ borderRadius: 5 }}
          >
            <Text style={styles.text_name}>{props.name}</Text>
            <Text style={styles.text_interest}>{props.interest}</Text>
            {/* <CheckBox
              style={styles.checkBox}
              checked={checked}
              color="rgba(26, 59, 202, .8)"
              onPress={() => setChecked(!checked)}
            /> */}
          </ImageBackground>
        </TouchableOpacity>
      </Body>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 270,
    width: 149,
  },
  image: {
    flex: 1,
    width: 150,
  },
  text_name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
    position: "absolute",
    bottom: 35,
    left: 10,
    marginHorizontal: 10,
  },
  text_interest: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
    position: "absolute",
    bottom: 15,
    left: 10,
    marginHorizontal: 10,
  },
  // checkBox: {
  //   position: "absolute",
  //   bottom: 10,
  //   left: 20,
  //   borderRadius: 6,
  //   borderColor: "rgba(26, 59, 202, .8)",
  // },
});
