import React, { useState, useEffect, createRef } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  AsyncStorage,
} from "react-native";
import { Card, CardItem, Body, Button, Icon, Thumbnail } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Text from "../components/TextR";
import Container from "../components/Container";
import TextM from "../components/TextM";
import Row from "../components/Row";
import { AirbnbRating } from "react-native-ratings";
import Dialog, {
  SlideAnimation,
  DialogContent,
} from "react-native-popup-dialog";
import moment from "moment";
import Header from "../components/Header";
import { c3, c5, c2, c4, c1 } from "../themes/Colors";
import CButton from "../components/CButton";
import Loader from "../components/Loader";
import Axios from "axios";
import Toast, { DURATION } from "react-native-easy-toast";

const { width: screenWidth } = Dimensions.get("window");

export default function ReadMore({ route, navigation }) {
  // console.log(route.params.details);
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
      {/* BackGround Image */}
      <ImageBackground source={{ uri: BgImage }} style={styles.bgImg}>
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
      </ImageBackground>

      {/* Card Container */}
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          {/* Title */}
          <CardItem header style={styles.title}>
            <TextM size={24}>The Startup's Guid to Working Remotely</TextM>
          </CardItem>

          {/* Sub Title */}
          <CardItem style={styles.subTitle}>
            <Row>
              <TouchableOpacity>
                <Row>
                  <Thumbnail style={styles.thumbnail} source={{ uri: uri }} />
                  <Text size={14} color={c4}>
                    {"  "}
                    by {route.params.details.sdetails.name},
                  </Text>
                </Row>
              </TouchableOpacity>
              <Text size={14} color={c4} style={{ marginBottom: 10 }}>
                {/* {` ${date.toDateString()}, ${date.toLocaleTimeString()}`} */}
                {` ${moment(date).format("LL")}`}
              </Text>
            </Row>
          </CardItem>

          {/* Detail letter */}
          <CardItem style={styles.detail}>
            <Body style={{ height: 340 }}>
              <ScrollView>
                <Text size={15}>
                  {route.params.details.text}
                  {route.params.details.text}
                  {route.params.details.text}
                  {route.params.details.text}
                  {route.params.details.text}
                </Text>
              </ScrollView>
            </Body>
          </CardItem>

          {/* Action Btn */}
          <CardItem style={styles.action}>
            {/* AddFriend */}
            <AddFriendIcon />

            {/* Reply */}
            <Button
              style={styles.actionBtn}
              onPress={() => navigation.navigate("SendLetter", { SU })}
            >
              <View style={styles.actionBtnIconText}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="feather"
                  style={{ color: c2, fontSize: 34 }}
                />
                <Text color={c2}>Reply</Text>
              </View>
            </Button>

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
  bgImg: {
    flex: 1,
  },
  bgImgText: {
    flex: 1,
    marginHorizontal: 40,
    justifyContent: "center",
  },
  // ??????????????????????????????????????????????????????
  header: {},
  // ??????????????????????????????????????????????????????
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: c2,
  },
  card: {
    width: screenWidth,
    borderRadius: 12,
    borderColor: c2,
    padding: 10,
    elevation: 0,
    backgroundColor: c2,
  },
  // ??????????????????????????????????????????????????????
  title: {
    backgroundColor: "transparent",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: "row",
  },
  subTitle: {
    backgroundColor: "transparent",
  },
  thumbnail: {
    width: 22,
    height: 22,
    borderRadius: 100,
  },
  detail: {
    backgroundColor: "transparent",
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
    width: 70,
    height: 70,
    justifyContent: "center",
    backgroundColor: c5,
    borderRadius: 10,
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
