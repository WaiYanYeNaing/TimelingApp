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

export default function Find({ navigation }) {
  const users = [
    {
      id: 1,
      name: "The Last of Us II",
      interest: "Dark",
      image: require("../assets/images/1.jpg"),
    },
    {
      id: 2,
      name: "The Last of Us II",
      interest: "Light",
      image: require("../assets/images/2.jpg"),
    },
    {
      id: 3,
      name: "Dragon Balls",
      interest: "Dark",
      image: require("../assets/images/3.jpg"),
    },
    {
      id: 4,
      name: "Apex Legends",
      interest: "Dark",
      image: require("../assets/images/apexlegends.gif"),
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
  const [selectVisible, setSelectVisible] = useState(false);
  const [sentSuccessVisible, setSentSuccessVisible] = useState(false);
  const [dialogData, setDialogData] = useState([]);
  const [minAge, setMinAge] = useState(20);
  const [maxAge, setMaxAge] = useState(40);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");

  const selectedCardHandler = (id) => {
    let temp = [...selectedCard];
    if (temp.includes(JSON.stringify(id))) {
      temp = temp.filter((v) => v != JSON.stringify(id));
    } else {
      temp.push(JSON.stringify(id));
    }
    setSelectedCard(temp);
  };

  return (
    <Container>
      {/* Cards */}
      <View style={styles.rowCard}>
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
                      ...styles.cardSelected,
                      ...{
                        borderColor: selectedCard.includes(
                          JSON.stringify(value.id)
                        )
                          ? "rgba(26, 59, 202, .8)"
                          : "transparent",
                      },
                    }}
                  >
                    <Category
                      value={value}
                      id={value.id}
                      name={value.name}
                      interest={value.interest}
                      image={value.image}
                      selected={(id) => selectedCardHandler(id)}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>

      {/* Location */}
      <View style={styles.rowLocationGender}>
        <Text style={{ flexDirection: "row", fontSize: 14 }}>Location</Text>
        <TouchableOpacity
          onPress={() => {
            setSelectVisible(true);
            setDialogData(dialogDataLocation);
          }}
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

      {/* Min Age */}
      <View style={styles.rowAge}>
        <Text style={{ flexDirection: "row", fontSize: 14 }}>
          Min Age : {minAge}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={10}
            maximumValue={60}
            value={minAge}
            minimumTrackTintColor="#1A3BCA"
            maximumTrackTintColor="#1A3BCA"
            thumbTintColor="#1A3BCA"
            step={1}
            onValueChange={(v) => setMinAge(v)}
          />
        </View>
      </View>

      {/* Max Age */}
      <View style={styles.rowAge}>
        <Text style={{ flexDirection: "row", fontSize: 14 }}>
          Max Age : {maxAge}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={5}
            maximumValue={60}
            value={maxAge}
            minimumTrackTintColor="#1A3BCA"
            maximumTrackTintColor="#1A3BCA"
            thumbTintColor="#1A3BCA"
            step={1}
            onValueChange={(v) => setMaxAge(v)}
          />
        </View>
      </View>

      {/* Gender */}
      <View style={styles.rowLocationGender}>
        <Text style={{ flexDirection: "row", fontSize: 14 }}>Gender</Text>
        <TouchableOpacity
          onPress={() => {
            setSelectVisible(true);
            setDialogData(dialogDataGender);
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Left>
              <Text style={{ color: "grey", paddingLeft: 5, fontSize: 14 }}>
                {selectedGender}
              </Text>
            </Left>
            <Right>
              <Button transparent>
                <Icon
                  type="Entypo"
                  name="chevron-right"
                  onPress={() => {
                    setSelectVisible(true);
                    setDialogData(dialogDataGender);
                  }}
                  style={{ color: "grey" }}
                />
              </Button>
            </Right>
          </View>
        </TouchableOpacity>
      </View>

      {/* Btn Apply */}
      <View style={styles.rowBtnApply}>
        <TouchableOpacity>
          <Button block style={styles.btnApply}>
            <Text style={{ color: "#1A3BCA" }}>Apply</Text>
          </Button>
        </TouchableOpacity>
      </View>

      {/* Btn Sent */}
      <View style={styles.rowBtnApply}>
        <Button
          block
          style={styles.btnSent}
          onPress={() => setSentSuccessVisible(true)}
        >
          <Text style={{ color: "#fff" }}>Sent</Text>
        </Button>
      </View>

      {/* //TODO: Dialog for Location and Gender */}
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

      {/* //TODO: Dialog for Sent Success */}
      <SwipeablePanel
        fullWidth
        isActive={sentSuccessVisible}
        onClose={() => setSentSuccessVisible(false)}
        onPressCloseButton={() => setSentSuccessVisible(true)}
        style={{ elevation: 5 }}
        closeOnTouchOutside={false}
        barStyle={{ width: 40 }}
        style={{ zIndex: 111231232 }}
      >
        <View style={styles.sentSuccessContainer}>
          <Image
            source={require("../assets/images/sent.png")}
            style={styles.sentSuccessImage}
          />
          <Text style={styles.sentSuccessText}>Sent Success!</Text>
          <Button
            style={styles.btnDone}
            onPress={() => setSentSuccessVisible(false)}
          >
            <Text style={{ color: "#fff", width: 120, textAlign: "center" }}>
              Done
            </Text>
          </Button>
        </View>
      </SwipeablePanel>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  rowReload: {
    flexDirection: "row",
    height: 40,
  },
  rowCard: {
    flexDirection: "row",
    marginBottom: 10,
  },
  cardSelected: {
    borderWidth: 3,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  rowLocationGender: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  rowAge: {
    flex: 1,
    paddingHorizontal: 10,
  },
  rowBtnApply: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 10,
    height: 60,
  },
  btnApply: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 0,
  },
  btnSent: {
    backgroundColor: "#1A3BCA",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 0,
  },
  sentSuccessContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  sentSuccessImage: {
    marginTop: 10,
    width: 100,
    height: 100,
  },
  sentSuccessText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "900",
  },
  btnDone: {
    marginTop: 20,
    backgroundColor: "#1A3BCA",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 0,
  },
});
