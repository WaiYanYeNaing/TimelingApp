import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Keyboard,
  Dimensions,
  Image,
} from "react-native";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Label, Item, Input, Button, Icon, Toast } from "native-base";
import Text from "../components/TextR";
import axios from "axios";
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog";

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

  const signUp = () => {
    let temp = {
      name,
      email,
      password,
    };
    axios
      .post("https://timeling.herokuapp.com/api/user/register", temp)
      .then((res) => {
        let data = res.data;
        console.log(data);
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
      <ImageBackground source={BgImage} style={styles.bgImg}>
        <View style={styles.container}>
          <Text style={styles.titleText1}>Create</Text>
          <Text style={styles.titleText2}>Account</Text>
          <View style={styles.inputContainer}>
            <Item floatingLabel>
              <Label style={styles.inputLabel}>Name</Label>
              <Input style={styles.input} onChangeText={(v) => setName(v)} />
            </Item>
          </View>
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
          <Row style={styles.signUpContainer}>
            <Text style={styles.textSignIn}>Sign up</Text>
            <Button style={styles.btnSignIn} onPress={() => signUp()}>
              <Icon type="Feather" name="arrow-right" />
            </Button>
          </Row>
        </View>
        <Row style={styles.footerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.gotoSignUp}>Sign in</Text>
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
            <Button style={styles.dialogButton} onPress={() => dialogButton()}>
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
  titleText1: {
    fontSize: 30,
    color: "#fff",
  },
  titleText2: {
    fontSize: 30,
    marginBottom: 50,
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
  signUpContainer: {
    marginTop: 20,
    marginBottom: 60,
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
