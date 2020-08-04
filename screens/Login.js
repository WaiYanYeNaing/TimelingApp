import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { Text, Item, Label, Input, Button, Icon, Toast } from "native-base";
import axios from "axios";

const BgImage = require("../assets/images/login-bg.jpg");

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {});

  const signIn = () => {
    let temp = {
      email,
      password,
    };
    axios
      .post("https://timeling.herokuapp.com/api/user/login", temp)
      .then((res) => {
        let data = res.data;
        console.log(data);
        if (data.status === 200) {
          navigation.navigate("Home");
        } else {
          Toast.show({
            text: data.message,
            buttonText: "Okay",
          });
        }
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground source={BgImage} style={styles.bgImg}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Welcome</Text>
          <View style={styles.inputContainer}>
            <Item floatingLabel>
              <Label style={styles.inputLabel}>Email</Label>
              <Input style={styles.input} onChangeText={(v) => setEmail(v)} />
            </Item>
          </View>
          <View style={styles.inputContainer}>
            <Item floatingLabel>
              <Label style={styles.inputLabel}>Password</Label>
              <Input
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(v) => setPassword(v)}
              />
            </Item>
          </View>
          <View style={styles.signInContainer}>
            <Text style={styles.textSignIn}>Sign in</Text>
            <Button style={styles.btnSignIn} onPress={() => signIn()}>
              <Icon type="Feather" name="arrow-right" />
            </Button>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text>HOLa</Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 40,
  },
  bgImg: {
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    marginBottom: 140,
    color: "#fff",
  },
  inputContainer: {
    marginVertical: 20,
  },
  inputLabel: {
    color: "#eee",
    fontSize: 15,
  },
  input: {
    fontSize: 17,
    color: "#fff",
  },
  signInContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textSignIn: {
    fontSize: 21,
    color: "#fff",
    marginTop: 12,
  },
  btnSignIn: {
    borderRadius: 100,
    width: 70,
    height: 70,
    justifyContent: "center",
  },
  footerContainer: {
    marginHorizontal: 40,
    marginBottom: 60,
    justifyContent: "space-between",
  },
});
