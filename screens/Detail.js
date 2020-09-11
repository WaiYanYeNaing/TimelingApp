import React, { useState } from "react";
import Button from "../components/CButton";
import Container from "../components/Container";
import Row from "../components/Row";
import { Icon } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { c1, c2, c3, c5, c6 } from "../themes/Colors";
import Text from "../components/TextR";
import DatePicker from "react-native-datepicker";
// import DropDownPicker from "react-native-dropdown-picker";
import { View, StyleSheet, Picker, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";

export default function Detail({ navigation }) {
  const Language = ["English", "Burmese", "Thai", "Chinese"];
  const gender = ["Male", "Female", "Any"];
  const Topics = [
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
    "Fashion",
    "Astrology",
    "Music",
    "Design",
    "Technology",
    "Finance",
    "Travel",
    "Health",
    "Art",
  ];
  const [Gen, setGen] = useState("Male");
  const [SelectTopic, setTopic] = useState([]);
  const [date, setDate] = useState({ date: moment(new Date(), "DD-MM-YYYY") });
  const [selected, setSelectedValue] = useState("English");
  const [selectedImage, setSelectedImage] = useState(null);
  {
    /* Topic */
  }
  const pressHandler = (i) =>
    SelectTopic.includes(i)
      ? setTopic(SelectTopic.filter((s) => s !== i))
      : setTopic([...SelectTopic, i]);
  {
    /* Profile Pic */
  }
  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <Container style={styles.container}>
      {/* Profile Pic */}
      <View style={styles.MainContainer}>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <Image
            style={styles.propic}
            source={
              selectedImage
                ? { uri: selectedImage.localUri } // if clicked a new img
                : {
                    uri: "https://i.dlpng.com/static/png/6542357_preview.png",
                  }
            }
          />
          <View style={styles.addPictureIcon}>
            <Icon
              type="AntDesign"
              name="camerao"
              size={20}
              style={styles.camera}
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* Gender */}
      <View style={styles.Gender}>
        <Text size={15}>Gender</Text>
        <Row style={{ flexWrap: "wrap" }}>
          {gender.map((v, i) => {
            return (
              <TouchableOpacity
                activeOpacity={0.4}
                key={i}
                onPress={() => setGen(v)}
              >
                <View
                  style={[
                    styles.item,
                    { backgroundColor: v == Gen ? c5 : "transparent" },
                  ]}
                >
                  <Text color={v == Gen ? c1 : c6}>{v}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </Row>
      </View>
      {/* Birthday */}
      <View style={styles.dob}>
        <Text size={15}>Birthday</Text>
        <DatePicker
          style={styles.datepicker}
          date={date.date}
          mode="date"
          placeholder="select date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconComponent={
            <Icon
              size={30}
              style={styles.dicon}
              type="FontAwesome"
              name="calendar"
            />
          }
          customStyles={{
            dateText: { color: c6 },
            dateInput: {
              marginLeft: 36,
              borderWidth: 1,
              borderColor: c5,
              borderRadius: 10,
            },
          }}
          onDateChange={(date) => {
            setDate({ date: date });
          }}
        />
      </View>
      {/* Language */}
      <View style={styles.Language}>
        <Text size={15}>Language</Text>
        <View style={styles.viewpicker}>
          <Picker
            style={styles.picker}
            mode="dropdown"
            selectedValue={selected}
            onValueChange={(itemValue, i) => setSelectedValue(itemValue)}
          >
            {Language.map((item, i) => {
              return <Picker.Item label={item} value={i} key={i} />;
            })}
          </Picker>
        </View>
      </View>
      {/* Topic */}
      <ScrollView>
        <View style={styles.Topic}>
          <Text size={15} style={{marginLeft:8}}>Pick some topics</Text>
          <Row style={{ flexWrap: "wrap" }}>
            {Topics.map((v, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.4}
                  key={i}
                  onPress={() => pressHandler(i)}
                >
                  <View
                    style={[
                      styles.Topicitem,
                      {
                        backgroundColor: SelectTopic.includes(i)
                          ? c5
                          : "transparent",
                      },
                    ]}
                  >
                    <Text color={SelectTopic.includes(i) ? c1 : c6}>{v}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Row>
        </View>
      </ScrollView>
      {/* Btn Next */}
      <View style={styles.BtnNext}>
        <Button
          backgroundColor={c3}
          text={"Next"}
          size={15}
          width={340}
          backgroundColor={c5}
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  camera: {
    color: c5,
  },
  addPictureIcon: {
    height: 30,
    width: 30,
    backgroundColor: c2,
    borderRadius: 50,
    position: "absolute",
    left: 100,
    top: 85,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: c2,
    justifyContent: "center",
    alignItems: "center",
  },

  MainContainer: {
    margin: 5,
    marginHorizontal: 20,
    paddingTop: 5,
  },

  propic: {
    borderColor:c5,
    borderWidth:2,
    width: 130,
    height: 130,
    borderRadius: 150 / 2,
  },

  picker: {
    width: 350,
    height: 37,
    color: c6,
  },
  viewpicker: {
    width: 360,
    marginTop: 7,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: c5,
    borderRadius: 10,
  },

  Language: {
    marginHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 4,
    borderBottomWidth: 1,
    borderColor: c5,
  },

  datepicker: {
    marginTop: 10,
    width: 360,
    marginBottom: 5,
    color: c6,
  },

  dicon: {
    position: "absolute",
    left: 0,
    top: 4,
    marginLeft: 0,
    color: c5,
  },

  dob: {
    marginHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 4,
  },

  Gender: {
    marginHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },

  Topic: {
    marginHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 7,
    marginBottom: 10,
  },

  item: {
    //paddingHorizontal: 15,
    borderRadius: 0,
    height: 40,
    borderWidth: 1,
    borderColor: c5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
    marginVertical: 10,
    width: 120,
  },

  Topicitem: {
    //paddingHorizontal: 12,
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
    borderColor: c5,
    justifyContent: "center",
    alignItems: "center",
    //marginRight: 10,
    marginVertical: 10,
    width: 115,
    marginLeft: 8,
  },

  BtnNext: {
    paddingTop: 20,
    paddingHorizontal: 10,
    height: 80,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    alignItems: "center",
  },
});
