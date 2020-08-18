import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
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

const { width: screenWidth } = Dimensions.get("window");

export default function ReadMore({ route, navigation }) {
  const uri = "https://images.hdqwalls.com/download/necromancer-tn-240x240.jpg";
  const BgImage =
    "https://images.hdqwalls.com/download/blue-lake-star-trails-4k-5u-1000x900.jpg";
  const date = new Date(route.params.details.createdAt);
  const reviewLevel = [
    "Terrible",
    "Bad",
    "Meh",
    "OK",
    "Good",
    "Hmm...",
    "Very Good",
    "Wow",
    "Amazing",
    "Unbelievable",
    "Jesus",
  ];
  const [dialogVisible, setDialogVisible] = useState(false);
  const [rating, setRating] = useState(0);

  const ratingCompleted = (rating) => {
    setRating(rating);
    console.log(reviewLevel[rating - 1]);
  };

  return (
    <Container>
      <ImageBackground source={{ uri: BgImage }} style={styles.bgImg}>
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
      </ImageBackground>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <CardItem header style={styles.title}>
            <TextM size={24}>The Startup's Guid to Working Remotely</TextM>
          </CardItem>
          <CardItem style={styles.subTitle}>
            <Row>
              <TouchableOpacity>
                <Row>
                  <Thumbnail style={styles.thumbnail} source={{ uri: uri }} />
                  <Text size={14} color={"#a2a3a5"}>
                    {"  "}
                    by {route.params.details.sdetails.name},
                  </Text>
                </Row>
              </TouchableOpacity>
              <Text size={14} color={"#a2a3a5"} style={{ marginBottom: 10 }}>
                {/* {` ${date.toDateString()}, ${date.toLocaleTimeString()}`} */}
                {` ${moment(date).format("LL")}, ${moment(date).fromNow()}`}
              </Text>
            </Row>
          </CardItem>
          <CardItem style={styles.detail}>
            <Body style={{ height: 340 }}>
              <ScrollView>
                <Text color={"#666666"} size={15}>
                  {route.params.details.text}
                  {route.params.details.text}
                  {route.params.details.text}
                  {route.params.details.text}
                  {route.params.details.text}
                </Text>
              </ScrollView>
            </Body>
          </CardItem>
          <CardItem style={styles.action}>
            <TouchableOpacity style={styles.actionTouchable}>
              <Icon
                type="Ionicons"
                name="home"
                style={{ color: "#f87470", fontSize: 35 }}
              />
            </TouchableOpacity>
            {/* <Button
              style={styles.actionBtn}
              onPress={() => setDialogVisible(true)}
            >
              <Icon
                type="FontAwesome"
                name="star-o"
                style={{ color: "#feab4c", fontSize: 23 }}
              />
            </Button> */}
            <Button style={styles.actionBtn}>
              <Icon
                type="MaterialCommunityIcons"
                name="feather"
                style={{ color: "#fff", fontSize: 34 }}
              />
            </Button>
            <TouchableOpacity
              onPress={() => setDialogVisible(true)}
              style={styles.actionTouchable}
            >
              <Icon
                type="MaterialCommunityIcons"
                name="star-face"
                style={{ color: "#91D276", fontSize: 35 }}
              />
            </TouchableOpacity>
          </CardItem>
        </Card>
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
          <Row style={styles.dialogHeaderContainer}>
            <Text size={18}>How was your experience?</Text>
          </Row>
          <Row>
            <AirbnbRating
              count={11}
              reviews={reviewLevel}
              minValue={-5}
              onFinishRating={ratingCompleted}
              defaultRating={11}
              size={20}
            />
          </Row>
          <Row style={styles.dialogButtonContainer}>
            <Button style={styles.dialogButton}>
              <Text color={"#fff"} size={16}>
                Rate
              </Text>
            </Button>
          </Row>
        </DialogContent>
      </Dialog>
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
    backgroundColor: "#fff",
  },
  card: {
    width: screenWidth,
    borderRadius: 12,
    padding: 10,
    elevation: 0,
    backgroundColor: "#fff",
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
    width: 80,
    height: 80,
    justifyContent: "center",
    backgroundColor: "#f77374",
    borderRadius: 100,
  },
  actionTouchable: {},
  // ??????????????????????????????????????????????????????
  dialog: {
    paddingTop: 20,
    minWidth: 250,
    alignItems: "center",
  },
  dialogHeaderContainer: {
    marginBottom: 10,
  },
  dialogButtonContainer: {
    marginTop: 30,
  },
  dialogButton: {
    width: 100,
    borderRadius: 20,
    backgroundColor: "#606bff",
    justifyContent: "center",
  },
});
