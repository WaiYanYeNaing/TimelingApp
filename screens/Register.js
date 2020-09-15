import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Keyboard,
  Dimensions,
  Image,
} from "react-native";
import { c1, c2, c3, c5, c6 } from "../themes/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Label, Item, Input, Button, Text } from "native-base";
import TextR from "../components/TextR";
import axios from "axios";
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog";
import Row from "../components/Row";
import Loader from "../components/Loader";
import { color } from "react-native-reanimated";
import CButton from "../components/CButton";

const BgImage = require("../assets/images/login-bg.jpg");
const screenHeight = Math.round(Dimensions.get("window").height);

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogImage, setDialogImage] = useState();
  const [dialogText, setDialogText] = useState("");
  const [status, setStatus] = useState();
  const [loader, setLoader] = useState(false);

  const signUp = () => {
    let temp = {
      name,
      email,
      password,
    };
    setLoader(true);
    axios
      .post("https://timeling.herokuapp.com/api/user/register", temp)
      .then((res) => {
        setLoader(false);
        let data = res.data;
        //console.log(data);
        if (data.status === 200) {
          setStatus(data.status);
          setDialogImage(require("../assets/images/success.png"));
          setDialogText(data.message);
          setDialogVisible(true);
        } else {
          setStatus(data.status);
          setDialogImage(require("../assets/images/error.png"));
          setDialogText(data.message);
          setDialogVisible(true);
        }
      });
  };

  const dialogButton = () => {
    setDialogVisible(false);
    if (status === 200) {
      navigation.navigate("Login");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {/* <ImageBackground source={BgImage} style={styles.bgImg}> */}
      <View style={styles.container}>
        <TextR style={styles.title}>Sign Up,</TextR>
        <TextR style={styles.titleText1}>
          Fill in your account information
        </TextR>
        <TextR style={styles.titleText2}> in order to launch out app.</TextR>
        {/** User Name */}
        <View style={styles.inputContainer}>
          <Item floatingLabel>
            <Label style={styles.inputLabel}>User Name</Label>
            <Input style={styles.input} onChangeText={(v) => setName(v)} />
          </Item>
        </View>
        {/** Email */}

        <View style={styles.inputContainer}>
          <Item floatingLabel>
            <Label style={styles.inputLabel}>Email</Label>
            <Input style={styles.input} onChangeText={(v) => setEmail(v)} />
          </Item>
        </View>
        {/** Password */}
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
        {/** Sign Up Btn */}
        <Row style={styles.signUpContainer}>
          <CButton
            style={styles.btnSignIn}
            size={15}
            text={"Submit"}
            onPress={() => signUp()}
          ></CButton>
        </Row>
        {/** Go to Login Page */}
        <View style={styles.foot}>
          <TextR style={styles.text}>I'm already member , </TextR>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Row>
              <Text style={styles.gotoSignUp}>Sign In</Text>
            </Row>
          </TouchableOpacity>
        </View>
      </View>

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
          <Button style={styles.dialogButton} onPress={() => dialogButton()}>
            <Text style={styles.dialogButtonText}>OK</Text>
          </Button>
        </DialogContent>
      </Dialog>

      {/** Loading..  */}
      <Loader visible={loader} />
      {/* </ImageBackground> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: c2,
    height: screenHeight,
    justifyContent: "center",
  },
  text: {
    color: c6,
  },
  title: {
    marginLeft: wp("3.2%"),
    marginTop: hp("-14%"),
    fontSize: 20,
    fontWeight: "bold",
    color: c5,
  },
  titleText1: {
    marginLeft: wp("3.2%"),
    marginTop: hp("-7%"),
    fontSize: 16,
    color: "#fff",
  },
  titleText2: {
    marginLeft: wp("2.4%"),
    marginTop: hp("-3%"),
    fontSize: 16,
    marginBottom: hp("3%"),
    color: "#fff",
  },
  foot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    marginLeft: wp("3.2%"),
    marginRight: wp("3.2%"),
    marginVertical: 13,
  },
  inputLabel: {
    color: "#eee",
    fontSize: 15,
  },
  input: {
    fontSize: 17,
    color: "#fff",
  },
  signUpContainer: {
    marginTop: hp("5%"),
    marginBottom: hp("10%"),
    justifyContent: "center",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textSignIn: {
    fontSize: 21,
    color: "#fff",
    marginTop: 12,
  },
  btnSignIn: {
    color: c2,
    justifyContent: "center",
    marginLeft: wp("3.2%"),
    marginRight: wp("3.2%"),
    alignItems: "center",
    width: wp("90%"),
  },
  gotoSignUp: {
    color: c5,
    fontSize: 15,
  },
  dialog: {
    paddingTop: 20,
    minWidth: 250,
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
