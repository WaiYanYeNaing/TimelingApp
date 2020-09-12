import React, { useState, useEffect } from "react";
import { View, StyleSheet, Slider, Image, AsyncStorage } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Category from "../components/Category";
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog";
import { Button, Icon, Right, Left, List, ListItem } from "native-base";
import SwipeablePanel from "react-native-sheets-bottom";
import Text from "../components/TextR";
import Container from "../components/Container";
import Row from "../components/Row";
import Header from "../components/Header";
import TextM from "../components/TextM";
import { c3, c4, c1, c5, c2 } from "../themes/Colors";
import CButton from "../components/CButton";
import Axios from "axios";
import Loader from "../components/Loader";
import CardUser from "../components/CardUser";

export default function Find({ navigation }) {
  const noUser = [
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
    // {
    //   id: 1,
    //   name: "The Last of Us II",
    //   interest: "Dark",
    //   image: require("../assets/images/1.jpg"),
    //   uri:
    //     "https://images.hdqwalls.com/download/anonmyus-boy-yellow-minimal-4k-pw-500x500.jpg",
    //   gender: "Male",
    // },
    // {
    //   id: 2,
    //   name: "The Last of Us II",
    //   interest: "Light",
    //   image: require("../assets/images/2.jpg"),
    //   uri:
    //     "https://images.hdqwalls.com/download/viper-valorant-2020-game-sk-500x500.jpg",
    //   gender: "any",
    // },
    // {
    //   id: 3,
    //   name: "Dragon Balls",
    //   interest: "Dark",
    //   image: require("../assets/images/3.jpg"),
    //   uri:
    //     "https://images.hdqwalls.com/download/cyberpunk-2077-12k-kp-500x500.jpg",
    //   gender: "Male",
    // },
    // {
    //   id: 4,
    //   name: "Apex Legends",
    //   interest: "Dark",
    //   image: require("../assets/images/apexlegends.gif"),
    //   uri:
    //     "https://images.hdqwalls.com/download/2020-4k-cyberpunk-2077-81-500x500.jpg",
    //   gender: "Female",
    // },
  ]);
  const dialogDataLocation = [
    {
      text: "Any Location",
    },
    {
      text: "Hello Mars",
    },
    {
      text: "Hola Pluto",
    },
  ];
  const dialogDataGender = [
    {
      text: "All",
    },
    {
      text: "Male",
    },
    {
      text: "Female",
    },
  ];
  const age = ["11~20", "21~30", "31~40", "Any"];
  const gender = ["Male", "Female", "Any"];
  const categories = [
    "Language",
    "Movies",
    "Pets",
    "Nature",
    "Adventure",
    "Climate",
    "Handicaft",
    "Writing",
    "Beauty",
    "Makeup",
    "Fitness",
    "Cosplay",
    "Dancing",
    "Singing",
    "Anime",
    "Art",
    "Cars",
    "Life",
  ];
  const [SAge, setSAge] = useState("Any"); //* selected Age
  const [minage, setMinage] = useState(0); //* selected Min Age
  const [maxage, setMaxage] = useState(0); //* selected Max Age
  const [SGen, setSGen] = useState("Any"); //* selected Gender
  const [SCate, setSCate] = useState(); //* selected Categories
  const [selectVisible, setSelectVisible] = useState(false);
  const [dialogData, setDialogData] = useState([]);
  const [minAge, setMinAge] = useState(20);
  const [maxAge, setMaxAge] = useState(40);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [loader, setLoader] = useState(false);
  const [SU, setSU] = useState([]);

  useEffect(() => {
    findUser();
  }, []);

  const findUser = async () => {
    const config = {
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    };
    const temp = {
      minexp: 0,
      maxexp: 0,
      gender: SGen == "Any" ? "" : SGen,
      minage,
      maxage,
    };
    setLoader(true);
    setSU("");
    Axios.post("https://timeling.herokuapp.com/api/user/", temp, config).then(
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

  const SAgeHandler = (v) => {
    setSAge(v);
    if (v == "11~20") {
      setMinage(10);
      setMaxage(21);
    }
    if (v == "21~30") {
      setMinage(20);
      setMaxage(31);
    }
    if (v == "31~40") {
      setMinage(30);
      setMaxage(41);
    }
    if (v == "Any") {
      setMinage(0);
      setMaxage(0);
    }
  };

  const nextPage = () => {
    if (SU.length) {
      navigation.navigate("SendLetter", { SU });
    }
  };

  return (
    <Container style={styles.container}>
      {/* Header Action btn */}
      <Header style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type="MaterialCommunityIcons"
            name="backburger"
            style={{ color: c3, fontSize: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            type="MaterialIcons"
            name="more-horiz"
            style={{ color: c3, fontSize: 30 }}
          />
        </TouchableOpacity>
      </Header>

      {/* Cards */}
      <Row style={styles.rowCard}>
        <ScrollView>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <CardUser users={users} SU={SU} setSU={setSU} />
            </ScrollView>
          </View>
        </ScrollView>
      </Row>

      {/* Filter Header */}
      <Row style={styles.filterHeader}>
        <TextM size={17}>Select Manually</TextM>
      </Row>

      <ScrollView>
        {/* Location */}
        <View style={styles.rowLocation}>
          <Text size={14}>Location</Text>
          <TouchableOpacity
            onPress={() => {
              setSelectVisible(true);
              setDialogData(dialogDataLocation);
            }}
            style={styles.selectLocation}
          >
            <View style={{ flexDirection: "row" }}>
              <Left>
                <Text style={{ color: "grey", paddingLeft: 5, fontSize: 14 }}>
                  {selectedLocation}
                </Text>
              </Left>
              <Right>
                <Button transparent>
                  <Icon
                    type="Entypo"
                    name="chevron-right"
                    onPress={() => {
                      setSelectVisible(true);
                      setDialogData(dialogDataLocation);
                    }}
                    style={{ color: "grey" }}
                  />
                </Button>
              </Right>
            </View>
          </TouchableOpacity>
        </View>

        {/* Age Range */}
        <View style={styles.rowAge}>
          <Text size={14}>Age</Text>
          <Row style={{ flexWrap: "wrap" }}>
            {age.map((v, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.4}
                  key={i}
                  onPress={() => SAgeHandler(v)}
                >
                  <View
                    style={[
                      styles.item,
                      { backgroundColor: v == SAge ? c5 : "transparent" },
                    ]}
                  >
                    <Text color={v == SAge ? c1 : c4}>{v}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Row>
        </View>

        {/* Gender */}
        <View style={styles.rowGender}>
          <Text size={14}>Gender</Text>
          <Row style={{ flexWrap: "wrap" }}>
            {gender.map((v, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.4}
                  key={i}
                  onPress={() => setSGen(v)}
                >
                  <View
                    style={[
                      styles.item,
                      { backgroundColor: v == SGen ? c5 : "transparent" },
                    ]}
                  >
                    <Text color={v == SGen ? c1 : c4}>{v}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Row>
        </View>

        {/* Category */}
        <View style={styles.rowCategory}>
          <Text size={14}>Categories</Text>
          <Row style={{ flexWrap: "wrap" }}>
            {categories.map((v, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.4}
                  key={i}
                  onPress={() => setSCate(v)}
                >
                  <View
                    style={[
                      styles.item,
                      { backgroundColor: v == SCate ? c5 : "transparent" },
                    ]}
                  >
                    <Text color={v == SCate ? c1 : c4}>{v}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Row>
        </View>
      </ScrollView>

      {/* Btn Apply */}
      <View style={styles.rowBtnApply}>
        <CButton
          backgroundColor={c3}
          text={"Apply"}
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

      {/** Dialog for Location and Gender */}
      <Dialog
        visible={selectVisible}
        onTouchOutside={() => {
          setSelectVisible(false);
        }}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
      >
        <DialogContent style={{ paddingTop: 20, backgroundColor: c3 }}>
          <List>
            {dialogData.map((v, index) => (
              <TouchableOpacity
                onPress={() => {
                  dialogData[0].text == "Any Location"
                    ? setSelectedLocation(v.text)
                    : setSelectedGender(v.text);

                  setSelectVisible(false);
                }}
                key={index}
              >
                <ListItem selected>
                  <Text style={{ width: 200 }} color={c1}>
                    {v.text}
                  </Text>
                  <Icon
                    type="Entypo"
                    name="chevron-right"
                    style={{ color: c2 }}
                  />
                </ListItem>
              </TouchableOpacity>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      {/** Loading..  */}
      <Loader visible={loader} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
  rowCard: {
    marginBottom: 20,
    marginLeft: 10,
  },
  // ??????????????????????????????????????????????????????
  filterHeader: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  // ??????????????????????????????????????????????????????
  rowLocation: {
    marginHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: c1,
    borderBottomWidth: 1,
    borderColor: c5,
  },
  selectLocation: {
    marginTop: 4,
    left: -3,
  },
  // ??????????????????????????????????????????????????????
  rowAge: {
    marginHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: c1,
    borderBottomWidth: 1,
    borderColor: c5,
  },
  item: {
    paddingHorizontal: 17,
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
    borderColor: c5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginVertical: 10,
  },
  // ??????????????????????????????????????????????????????
  rowGender: {
    marginHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: c1,
    borderBottomWidth: 1,
    borderColor: c5,
  },
  // ??????????????????????????????????????????????????????
  rowCategory: {
    marginHorizontal: 20,
    marginBottom: 5,
    paddingTop: 10,
    backgroundColor: c1,
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
