import React, { useState } from "react";
import { View, StyleSheet, Slider, Image } from "react-native";
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

export default function Find({ navigation }) {
  const users = [
    {
      id: 1,
      name: "The Last of Us II",
      interest: "Dark",
      image: require("../assets/images/1.jpg"),
      uri:
        "https://images.hdqwalls.com/download/anonmyus-boy-yellow-minimal-4k-pw-500x500.jpg",
      gender: "male",
    },
    {
      id: 2,
      name: "The Last of Us II",
      interest: "Light",
      image: require("../assets/images/2.jpg"),
      uri:
        "https://images.hdqwalls.com/download/viper-valorant-2020-game-sk-500x500.jpg",
      gender: "any",
    },
    {
      id: 3,
      name: "Dragon Balls",
      interest: "Dark",
      image: require("../assets/images/3.jpg"),
      uri:
        "https://images.hdqwalls.com/download/cyberpunk-2077-12k-kp-500x500.jpg",
      gender: "male",
    },
    {
      id: 4,
      name: "Apex Legends",
      interest: "Dark",
      image: require("../assets/images/apexlegends.gif"),
      uri:
        "https://images.hdqwalls.com/download/2020-4k-cyberpunk-2077-81-500x500.jpg",
      gender: "female",
    },
  ];
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
  const age = ["11~20", "21~31", "31~40", "Any"];
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
  const [selectedCard, setSelectedCard] = useState([]);
  const [SAge, setSAge] = useState("Any"); //* selected Age
  const [SGen, setSGen] = useState("Any"); //* selected Gender
  const [SCate, setSCate] = useState(); //* selected Categories
  const [SU, setSU] = useState([]);
  const [selectVisible, setSelectVisible] = useState(false);
  const [dialogData, setDialogData] = useState([]);
  const [minAge, setMinAge] = useState(20);
  const [maxAge, setMaxAge] = useState(40);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");

  const selectedCardHandler = (v) => {
    // * Selected User ID
    let temp = [...selectedCard];
    if (temp.includes(JSON.stringify(v.id))) {
      temp = temp.filter((f) => f != JSON.stringify(v.id));
    } else {
      if (temp.length < 3) temp.push(JSON.stringify(v.id));
    }
    setSelectedCard(temp); // eg ["1", "3"]

    // * Selected User Data
    let tempSU = [];
    temp.forEach((e) => {
      tempSU.push(users.filter((f) => f.id == e)[0]);
    });
    setSU(tempSU);
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
              {users.map((value, index) => {
                return (
                  <View
                    key={value.id}
                    style={{
                      ...styles.cardContainer,
                      ...(selectedCard.includes(JSON.stringify(value.id))
                        ? styles.cardSelected
                        : styles.cardUnSelected),
                    }}
                  >
                    <Category
                      value={value}
                      id={value.id}
                      name={value.name}
                      gender={value.gender}
                      image={value.uri}
                      selected={(v) => selectedCardHandler(v)}
                    />
                    {selectedCard.includes(JSON.stringify(value.id)) ? (
                      <Row>
                        <Text size={13}>Selected </Text>
                        <Icon
                          type="MaterialCommunityIcons"
                          name="account-check"
                          style={{ color: c3, fontSize: 18 }}
                        />
                      </Row>
                    ) : null}
                  </View>
                );
              })}
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
                  onPress={() => setSAge(v)}
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
        <CButton backgroundColor={c3} text={"Apply"} size={15} width={340} />
      </View>

      {/* Btn Next */}
      <View style={styles.rowBtnNext}>
        <CButton
          backgroundColor={c3}
          text={"Next"}
          size={15}
          width={340}
          backgroundColor={c5}
          onPress={() => navigation.navigate("SendLetter", { SU })}
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
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
  rowCard: {
    marginBottom: 20,
    marginLeft: 10,
  },
  cardContainer: {
    borderWidth: 3,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 10,
    height: 238,
    alignItems: "center",
  },
  cardSelected: {
    borderColor: "rgba(26, 59, 202, .8)",
    borderBottomWidth: 30,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  cardUnSelected: {
    borderColor: "transparent",
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
