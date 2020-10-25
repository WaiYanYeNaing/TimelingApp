import React, { useState, useEffect, createRef } from "react";
import { View, StyleSheet, Dimensions, AsyncStorage } from "react-native";
import { Card, CardItem, Body, Button, Icon, Thumbnail } from "native-base";
import OptionsMenu from "react-native-options-menu";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Text from "../components/TextR";
import Container from "../components/Container";
import Row from "../components/Row";
import { AirbnbRating } from "react-native-ratings";
import Dialog, {
  SlideAnimation,
  DialogContent,
} from "react-native-popup-dialog";
import moment from "moment";
import Header from "../components/Header";
import { c3, c5, c2, c4, c1, c6 } from "../themes/Colors";
import CButton from "../components/CButton";
import Loader from "../components/Loader";
import Axios from "axios";
import Toast, { DURATION } from "react-native-easy-toast";

const { width: screenWidth } = Dimensions.get("window");

export default function ReadMore({ route, navigation }) {
  const uri =
    "https://images.hdqwalls.com/download/razer-logo-dark-4k-c6-240x240.jpg";
  const BgImage =
    "https://images.hdqwalls.com/download/blue-lake-star-trails-4k-5u-1000x900.jpg";
  const date = new Date(route.params.details.createdAt);
  const reviewLevel = [
    "Terrible ",
    "Bad ",
    "Meh ",
    "OK ",
    "Good  ",
    "Hmm... ",
    "Very Good   ",
    "Wow  ",
    "Amazing  ",
    "Unbelievable   ",
    "Jesus ",
  ];

  const [dialogVisible, setDialogVisible] = useState(false);
  const [friends, setfriends] = useState([]);
  const [rating, setRating] = useState(0);
  const [SU, setSU] = useState([]);
  const [loader, setLoader] = useState(false);
  const toast = createRef(null);
  const [friendStatus, setfriendStatus] = useState(false);
  const [ratingStatus, setratingStatus] = useState(false);

  useEffect(() => {
    let temp = [{ uid: route.params.details.sdetails._id, uri: uri }];
    setSU(temp);
    getAllFriends();
  }, []);

  const getAllFriends = async () => {
    const config = {
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    };
    const uid = await AsyncStorage.getItem("uid");
    Axios.get(`https://timeling.herokuapp.com/api/friend/${uid}`, config).then(
      (res) => {
        setfriends(res.data);
      }
    );
  };

  const ratingCompleted = (rating) => {
    setRating(rating);
  };
  const addFriendHandler = async () => {
    setLoader(true);
    const config = {
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    };
    const temp = {
      uid: await AsyncStorage.getItem("uid"),
      fid: route.params.details.sdetails._id,
    };
    Axios.post(`https://timeling.herokuapp.com/api/friend`, temp, config).then(
      (res) => {
        setfriendStatus(true);
        setLoader(false);
      }
    );
  };

  const rateHandler = async () => {
    setDialogVisible(false);
    setLoader(true);
    const config = {
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    };
    const temp = {
      exp: route.params.details.sdetails.exp + rating,
      lid: route.params.details._id, //lid(letter id) to change rating status
    };
    const sid = route.params.details.sdetails._id;
    Axios.patch(`https://timeling.herokuapp.com/api/user/${sid}`, temp, config)
      .then((res) => {
        setratingStatus(true);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AddFriendIcon = () => {
    const temp = friends.find(
      (f) => f.fid == route.params.details.sdetails._id
    );
    if (temp || friendStatus) {
      return (
        <TouchableOpacity
          style={styles.actionTouchable}
          onPress={() =>
            toast.current.show(
              "   Add friend already!      ",
              DURATION.LENGTH_LONG
            )
          }
        >
          <Icon
            type="Feather"
            name="user-check"
            style={{ color: c5, fontSize: 25, paddingLeft: 3 }}
          />
          <Text>Add</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.actionTouchable}
          onPress={() => addFriendHandler()}
        >
          <Icon
            type="Feather"
            name="user-plus"
            style={{ color: c5, fontSize: 25, paddingLeft: 3 }}
          />
          <Text>Add</Text>
        </TouchableOpacity>
      );
    }
  };

  const RateIcon = () => {
    if (route.params.details.ratingStatus || ratingStatus) {
      return (
        <TouchableOpacity
          onPress={() =>
            toast.current.show(
              "   You already gave a rating to this user!      ",
              DURATION.LENGTH_LONG
            )
          }
          style={styles.actionTouchable}
        >
          <Icon
            type="MaterialCommunityIcons"
            name="star-off"
            style={{ color: c5, fontSize: 30 }}
          />
          <Text>Rate</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => setDialogVisible(true)}
          style={styles.actionTouchable}
        >
          <Icon
            type="MaterialCommunityIcons"
            name="star"
            style={{ color: c5, fontSize: 30 }}
          />
          <Text>Rate</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <Container>
      <Header style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon type="Foundation" name="arrow-left" style={styles.bckicon} />
        </TouchableOpacity>
        {/* <SenderName> */}
        <TouchableOpacity>
          <Text size={16} color={c6} style={styles.txt}>
            {"  "}
            {route.params.details.sdetails.name}
          </Text>
        </TouchableOpacity>

        {/* <OptionPicker> */}
        <OptionsMenu
          customButton={
            <Icon
              type="MaterialIcons"
              name="more-horiz"
              style={{ color: c3, fontSize: 30 }}
            />
          }
          destructiveIndex={1}
          options={["Profile", "Delete", "Report", "Block", "Cancel"]}
        />
      </Header>

      {/* Card Container */}
      <View style={styles.cardContainer}>
        <ScrollView>
          <Card style={styles.card}>
            {/* Detail letter */}
            <CardItem style={styles.detail}>
              <Body>
                <Text size={15}>
                  {route.params.details.text}
                  {route.params.details.text}
                  {route.params.details.text}
                  {route.params.details.text}
                  {route.params.details.text}
                </Text>
              </Body>
            </CardItem>
            {/* User Name & Pic & Date */}
            <Card style={styles.infocard}>
              <Row style={styles.info}>
                <Thumbnail style={styles.thumbnail} source={{ uri: uri }} />
                <View>
                  <Text size={16} color={c6} style={styles.txt}>
                    {"  "}
                    {route.params.details.sdetails.name}
                  </Text>
                  <Text
                    size={14}
                    color={c4}
                    style={{ marginBottom: 20, marginLeft: 5 }}
                  >
                    {` ${moment(date).format("LL")}`}
                  </Text>
                </View>
              </Row>
            </Card>
          </Card>
        </ScrollView>
      </View>
      {/* Actions Container */}
      <View style={styles.actionContainer}>
        <Card style={styles.actioncard}>
          {/* Action Btn */}
          <CardItem style={styles.action}>
            {/* AddFriend */}
            <AddFriendIcon />

            {/* Reply */}
            <TouchableOpacity
              onPress={() => navigation.navigate("SendLetter", { SU })}
            >
              <View style={styles.actionBtnIconText}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="feather"
                  style={{ color: c5, fontSize: 25 }}
                />
                <Text color={c6}>Reply</Text>
              </View>
            </TouchableOpacity>

            {/* Rate */}
            <RateIcon />
          </CardItem>
        </Card>
      </View>

      {/** Rate Dialog */}
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
          <Row style={styles.dialogHeaderContainer}>
            <Text size={18}>How was your experience?</Text>
          </Row>
          <Row>
            <AirbnbRating
              count={11}
              reviews={reviewLevel}
              minValue={-5}
              onFinishRating={ratingCompleted}
              defaultRating={rating}
              size={20}
            />
          </Row>
          <Row style={styles.dialogButtonContainer}>
            <CButton width={100} text={"Rate"} onPress={() => rateHandler()} />
          </Row>
        </DialogContent>
      </Dialog>

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
  container: {
    flex: 1,
  },
  infocard: {
    borderColor: c2,
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: c2,
    elevation: 0,
    shadowOpacity: 0,
  },
  info: {
    marginLeft: 18,
    marginTop: 20,
  },
  bckicon: {
    marginTop: 5,
    color: c3,
    fontSize: 25,
  },

  txt: {
    marginTop: 3,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    width: 390,
    minHeight: 400,
    borderColor: c2,
    backgroundColor: c2,
    elevation: 0,
  },

  actioncard: {
    justifyContent: "flex-end",
    width: screenWidth,
    borderColor: c2,
    backgroundColor: c1,
  },

  title: {
    backgroundColor: "transparent",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: "row",
  },

  thumbnail: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  detail: {
    backgroundColor: c2,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  action: {
    backgroundColor: "transparent",
    marginTop: 10,
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  actionBtn: {
    width: 65,
    height: 65,
    justifyContent: "center",
    backgroundColor: c5,
    borderRadius: 100,
  },
  actionBtnIconText: {
    alignItems: "center",
  },
  actionTouchable: {
    marginTop: 5,
    alignItems: "center",
  },
  // ??????????????????????????????????????????????????????
  dialog: {
    paddingTop: 20,
    minWidth: 250,
    alignItems: "center",
    backgroundColor: c2,
  },
  dialogHeaderContainer: {
    marginBottom: 10,
  },
  dialogButtonContainer: {
    marginTop: 30,
  },
});
