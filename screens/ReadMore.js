import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { Card, CardItem, Body, Button, Icon } from "native-base";
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

const { width: screenWidth } = Dimensions.get("window");

export default function ReadMore({ route }) {
  const BgImage =
    "https://images.hdqwalls.com/download/lake-cyan-calm-water-reflection-northern-lights-4k-6j-1536x864.jpg";
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
      <ImageBackground
        source={{ uri: BgImage }}
        style={styles.bgImg}
      ></ImageBackground>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <CardItem header style={styles.header}>
            <TextM size={24}>The Startup's Guid to Working Remotely</TextM>
          </CardItem>
          <CardItem>
            <Row>
              <Text size={14} color={"#a2a3a5"}>
                by {route.params.details.sdetails.name},
              </Text>
              <Text size={14} color={"#a2a3a5"} style={{ marginBottom: 10 }}>
                {` ${date.toDateString()}, ${date.toLocaleTimeString()}`}
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
            <TouchableOpacity>
              <View style={styles.iconWrap}>
                <Icon
                  type="MaterialIcons"
                  name="report"
                  style={{ color: "#ff6060" }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDialogVisible(true)}>
              <View style={styles.iconWrap}>
                <Icon
                  type="FontAwesome"
                  name="star-o"
                  style={{ color: "#feab4c", fontSize: 23 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.iconWrap}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="reply-all-outline"
                  style={{ color: "#878787", fontSize: 28 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.iconWrap}>
                <Icon
                  type="MaterialIcons"
                  name="more-horiz"
                  style={{ color: "#878787", fontSize: 30 }}
                />
              </View>
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
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  card: {
    width: screenWidth,
    borderRadius: 12,
    padding: 10,
    elevation: 0,
  },
  // ??????????????????????????????????????????????????????
  header: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: "row",
  },
  detail: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  action: {
    borderTopWidth: 0.4,
    borderTopColor: "#a2a3a5",
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
  },
  iconWrap: {
    width: 45,
  },
  // ??????????????????????????????????????????????????????
  dialog: {
    paddingTop: 20,
    minWidth: 250,
    alignItems: "center",
  },
});
