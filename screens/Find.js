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
  const [selectedCard, setSelectedCard] = useState([]);
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
            style={{ color: "#fff", fontSize: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            type="MaterialIcons"
            name="more-horiz"
            style={{ color: "#fff", fontSize: 30 }}
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
                        <Text color={"#fff"} size={13}>
                          Selected{" "}
                        </Text>
                        <Icon
                          type="MaterialCommunityIcons"
                          name="account-check"
                          style={{ color: "#fff", fontSize: 18 }}
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
            <TouchableOpacity activeOpacity={0.4}>
              <View style={styles.item}>
                <Text color={"#a2a3a5"}>11~20</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={[
                  styles.item,
                  { backgroundColor: "#1A3BCA", borderColor: "#1A3BCA" },
                ]}
              >
                <Text color={"#fff"}>21~30</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.item}>
                <Text color={"#a2a3a5"}>31~40</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.item}>
                <Text color={"#a2a3a5"}>Any</Text>
              </View>
            </TouchableOpacity>
          </Row>
        </View>

        {/* Gender */}
        <View style={styles.rowGender}>
          <Text size={14}>Gender</Text>
          <Row style={{ flexWrap: "wrap" }}>
            <TouchableOpacity activeOpacity={0.4}>
              <View style={styles.item}>
                <Text color={"#a2a3a5"}>Male</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={[
                  styles.item,
                  { backgroundColor: "#1A3BCA", borderColor: "#1A3BCA" },
                ]}
              >
                <Text color={"#fff"}>Female</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.item}>
                <Text color={"#a2a3a5"}>Any</Text>
              </View>
            </TouchableOpacity>
          </Row>
        </View>
      </ScrollView>

      {/* Btn Apply */}
      <View style={styles.rowBtnApply}>
        <Button block style={styles.btnApply}>
          <Text style={{ color: "#1A3BCA" }}>Apply</Text>
        </Button>
      </View>

      {/* Btn Next */}
      <View style={styles.rowBtnNext}>
        <Button
          block
          style={styles.btnNext}
          onPress={() => navigation.navigate("SendLetter", { SU })}
        >
          <Text style={{ color: "#fff" }}>Next</Text>
        </Button>
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
        <DialogContent style={{ paddingTop: 20 }}>
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
                  <Text style={{ width: 200 }}>{v.text}</Text>
                  <Icon type="Entypo" name="chevron-right" />
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
  container: {
    backgroundColor: "#0d0630",
  },
  rowCard: {
    marginBottom: 20,
    marginLeft: 10,
  },
  cardContainer: {
    borderWidth: 3,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 10,
    height: 280,
    alignItems: "center",
  },
  cardSelected: {
    borderColor: "rgba(26, 59, 202, .8)",
    borderBottomWidth: 30,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
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
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 2,
    backgroundColor: "#0d0630",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  selectLocation: {
    marginTop: 4,
    left: -3,
  },
  // ??????????????????????????????????????????????????????
  rowAge: {
    paddingHorizontal: 20,
    marginBottom: 2,
    paddingTop: 10,
    backgroundColor: "#0d0630",
  },
  item: {
    paddingHorizontal: 17,
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#898989",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginVertical: 20,
  },
  // ??????????????????????????????????????????????????????
  rowGender: {
    paddingHorizontal: 20,
    marginBottom: 5,
    paddingTop: 10,
    backgroundColor: "#0d0630",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  // ??????????????????????????????????????????????????????
  rowBtnApply: {
    paddingTop: 30,
    paddingHorizontal: 10,
    height: 80,
    backgroundColor: "#3f259e",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  rowBtnNext: {
    paddingTop: 10,
    paddingHorizontal: 10,
    height: 75,
    backgroundColor: "#3f259e",
  },
  btnApply: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderRadius: 10,
    elevation: 0,
  },
  btnNext: {
    backgroundColor: "#1A3BCA",
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 0,
  },
});
