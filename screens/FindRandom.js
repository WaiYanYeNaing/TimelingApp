import Axios from "axios";
import { Icon } from "native-base";
import React, { createRef, useEffect, useState } from "react";
import { View, StyleSheet, Image, AsyncStorage } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";
import CardUser from "../components/CardUser";
import CButton from "../components/CButton";
import Container from "../components/Container";
import Header from "../components/Header";
import Loader from "../components/Loader";
import TextM from "../components/TextM";
import Text from "../components/TextR";
import { c1, c2, c3, c4, c5 } from "../themes/Colors";
import Toast, { DURATION } from "react-native-easy-toast";

export default function FindRandom({ navigation }) {
  const noUser = [
    // ****
    {
      id: 0,
      name: "",
      interest: "",
      uri:
        "http://via.placeholder.com/400x350.png/fbde38/1c2550?text=No+User+Currently",
      gender: "",
    },
  ];
  const [users, setUsers] = useState([
    {
      id: 0,
      name: "",
      interest: "",
      uri:
        "http://via.placeholder.com/400x350.png/fbde38/1c2550?text=No+User+Currently",
      gender: "",
    },
  ]);
  const [loader, setLoader] = useState(false);
  const [SU, setSU] = useState([]);
  const toast = createRef(null);

  useEffect(() => {
    findUser();
  }, []);

  const findUser = async () => {
    const config = {
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    };
    setLoader(true);
    setSU("");
    Axios.get("https://timeling.herokuapp.com/api/user/", config).then(
      (res) => {
        // TODO:: test image
        let data = [];
        res.data.map((v) => {
          data.push({
            ...v,
            id: v.uid,
            uri: `https://picsum.photos/200/300?random=${Math.floor(
              Math.random() * 100
            )}`,
          });
        });
        if (res.data.length) {
          setUsers(data);
        } else {
          setUsers(noUser);
        }
        setLoader(false);
      }
    );
  };

  const nextPage = () => {
    if (SU.length) {
      navigation.navigate("SendLetter", { SU });
    } else {
      toast.current.show(
        "   Please Select minimal 1 user user",
        DURATION.LENGTH_LONG
      );
    }
  };

  return (
    <Container style={styles.container}>
      {/* Action Header */}
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type="Foundation"
            name="arrow-left"
            style={{ color: c3, fontSize: 30 }}
          />
        </TouchableOpacity>
      </Header>

      {/* Title Icon */}
      <View style={styles.title_icon_container}>
        <Image
          source={require("../assets/images/flight.png")}
          style={styles.title_icon}
        />
        <TextM size={20} style={styles.title_text}>
          Your Matches
        </TextM>
        <Text color={c4}>Based on your level and Info</Text>
      </View>

      {/* Users Card */}
      <ScrollView style={styles.card_user_scrollview}>
        <CardUser users={users} SU={SU} setSU={setSU} />
      </ScrollView>

      {/* Btn Reload */}
      <View style={styles.rowBtnApply}>
        <CButton
          backgroundColor={c3}
          text={"Reload"}
          size={15}
          width={340}
          onPress={() => findUser()}
        />
      </View>

      {/* Btn Next */}
      <View style={styles.rowBtnNext}>
        <CButton
          backgroundColor={c3}
          text={"Next"}
          size={15}
          width={340}
          backgroundColor={c5}
          onPress={() => nextPage()}
        />
      </View>

      {/* Toast */}
      <Toast
        ref={toast}
        style={{ backgroundColor: c5 }}
        position="bottom"
        positionValue={150}
        fadeInDuration={350}
        fadeOutDuration={1000}
        opacity={0.8}
        textStyle={{ color: c1 }}
      />

      {/** Loading..  */}
      <Loader visible={loader} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
  title_icon_container: {
    marginTop: 20,
    alignItems: "center",
  },
  title_icon: {
    width: 70,
    height: 70,
    backgroundColor: c5,
    borderRadius: 100,
  },
  title_text: {
    marginTop: 10,
  },
  // ??????????????????????????????????????????????????????
  card_user_scrollview: {
    flex: 1,
    marginTop: 20,
  },
  // ??????????????????????????????????????????????????????
  rowBtnApply: {
    paddingTop: 30,
    paddingHorizontal: 10,
    height: 80,
    backgroundColor: c2,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    alignItems: "center",
  },
  rowBtnNext: {
    paddingTop: 10,
    paddingHorizontal: 10,
    height: 75,
    backgroundColor: c2,
    alignItems: "center",
  },
});
