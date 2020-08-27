import React, { Component, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Card, CardItem, Body, Icon, Right, CheckBox } from "native-base";
import Text from "../components/TextR";

const Gender = ({ gender }) => {
  console.log(gender);
  if (gender == "male") {
    return (
      <View style={styles.genderIconContainer}>
        <Icon
          type="Ionicons"
          name="male"
          style={[styles.genderIcon, { color: "blue" }]}
        />
      </View>
    );
  }
  if (gender == "female") {
    return (
      <View style={styles.genderIconContainer}>
        <Icon
          type="Ionicons"
          name="female"
          style={[styles.genderIcon, { color: "pink" }]}
        />
      </View>
    );
  }
  if (gender == "any") {
    return (
      <View style={styles.genderIconContainer}>
        <Icon
          type="AntDesign"
          name="question"
          style={[styles.genderIcon, { color: "black" }]}
        />
      </View>
    );
  }
};

export default function Category(props) {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Body>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            props.selected(props);
          }}
          //   onPress={() => {
          //     this.props.navigation.navigate("Read", {
          //       item: this.props,
          //     });
          //   }}
        >
          {/* <Image source={this.props.image} style={styles.image} /> */}

          <ImageBackground
            source={{ uri: props.image }}
            style={styles.image}
            imageStyle={{ borderRadius: 5 }}
          >
            <Text style={styles.text_name}>{props.name}</Text>
            <Gender gender={props.gender} />
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
    height: 250,
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
    left: 10,
    marginHorizontal: 5,
    marginTop: 5,
  },
  genderIconContainer: {
    backgroundColor: "#fff",
    width: 20,
    height: 20,
    left: 10,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  genderIcon: {
    borderRadius: 20,
    fontWeight: "bold",
    fontSize: 13,
  },
  // checkBox: {
  //   position: "absolute",
  //   bottom: 10,
  //   left: 20,
  //   borderRadius: 6,
  //   borderColor: "rgba(26, 59, 202, .8)",
  // },
});
