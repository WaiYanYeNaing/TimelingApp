import React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { Card, CardItem, Body, Button, Icon } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import Text from "../components/TextR";
import Container from "../components/Container";

const { width: screenWidth } = Dimensions.get("window");
const BgImage =
  "https://images.hdqwalls.com/download/lake-cyan-calm-water-reflection-northern-lights-4k-6j-1536x864.jpg";

export default function ReadMore({ route }) {
  return (
    <Container>
      <ImageBackground
        source={{ uri: BgImage }}
        style={styles.bgImg}
      ></ImageBackground>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <CardItem
            header
            style={{
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              flexDirection: "row",
            }}
          >
            <Text style={styles.name}>
              {route.params.details.sdetails.name}
            </Text>
            <Button style={styles.replyBtn} rounded>
              <Icon type="FontAwesome5" name="reply" style={{ fontSize: 14 }} />
            </Button>
          </CardItem>
          <CardItem
            style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
          >
            <Body style={{ height: 350 }}>
              <ScrollView>
                <Text style={styles.text}>{route.params.details.text}</Text>
              </ScrollView>
            </Body>
          </CardItem>
        </Card>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  bgImg: {
    flex: 1,
  },
  card: {
    width: screenWidth - 70,
    borderRadius: 12,
    padding: 10,
    elevation: 0,
  },
  name: {
    fontSize: 17,
  },
  replyBtn: {
    marginLeft: "auto",
    color: "#1A3BCA",
    elevation: 0,
  },
  text: {
    fontSize: 14,
  },
});
