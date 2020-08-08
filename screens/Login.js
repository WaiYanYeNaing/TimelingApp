import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
  Image,
  AsyncStorage,
} from "react-native";
import { Item, Label, Input, Button, Icon } from "native-base";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import Text from "../components/TextR";
import Dialog, {
  SlideAnimation,
  DialogContent,
} from "react-native-popup-dialog";
import Row from "../components/Row";

const BgImage = require("../assets/images/login-bg.jpg");
const screenHeight = Math.round(Dimensions.get("window").height);

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogImage, setDialogImage] = useState();
  const [dialogText, setDialogText] = useState("");

  useEffect(() => {
    tokenValidation();
  }, []);

  const tokenValidation = async () => {
    //* Token Validation
    const val = await AsyncStorage.getItem("token");
    if (val) {
      navigation.navigate("Home", {
        config: {
          headers: {
            "auth-token": val,
          },
        },
      });
    } else {
      navigation.navigate("Login");
    }
  };

  const signIn = () => {
    let temp = {
      email,
      password,
    };
    axios
      .post("https://timeling.herokuapp.com/api/user/login", temp)
      .then((res) => {
        let data = res.data;
        if (data.status === 200) {
          AsyncStorage.setItem("token", data.token);
          AsyncStorage.setItem("uid", data.uid);
          navigation.navigate("Home");
        } else {
          setDialogImage(require("../assets/images/error.png"));
          setDialogText(data.message);
          setDialogVisible(true);
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
          <Row style={styles.signInContainer}>
            <Text style={styles.textSignIn}>Sign in</Text>
            <Button style={styles.btnSignIn} onPress={() => signIn()}>
              <Icon type="Feather" name="arrow-right" />
            </Button>
          </Row>
        </View>
        <Row style={styles.footerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.gotoSignUp}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.gotoSignUp}>Forgot Passwrod</Text>
          </TouchableOpacity>
        </Row>

        {/** Dialog */}
        <Dialog
          visible={dialogVisible}
          onTouchOutside={() => {
            setDialogVisible(false);
          }}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: "bottom",
            })
          }
        >
          <DialogContent style={styles.dialog}>
            <Image source={dialogImage} style={styles.dialogImage} />
            <Text style={styles.dialogText}>{dialogText}</Text>
            <Button
              style={styles.dialogButton}
              onPress={() => setDialogVisible(false)}
            >
              <Text style={styles.dialogButtonText}>OK</Text>
            </Button>
          </DialogContent>
        </Dialog>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    justifyContent: "center",
    marginHorizontal: 40,
  },
  bgImg: {},
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
  gotoSignUp: {
    color: "#fff",
    fontSize: 15,
  },
  dialog: {
    paddingTop: 20,
    alignItems: "center",
  },
  dialogImage: {
    marginTop: 10,
    width: 170,
    height: 100,
  },
  dialogText: {
    fontSize: 14,
    fontWeight: "900",
    marginTop: 20,
    paddingBottom: 20,
  },
  dialogButton: {
    width: 90,
    borderRadius: 30,
    justifyContent: "center",
  },
  dialogButtonText: {
    color: "#fff",
  },
});
