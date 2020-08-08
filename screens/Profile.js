import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "../components/TextR";
import Container from "../components/Container";
import { Thumbnail, Button } from "native-base";
import TextM from "../components/TextM";
import Progress from "../components/Progress";
import Row from "../components/Row";

export default function Profile() {
  const uri = "https://images.hdqwalls.com/download/necromancer-tn-240x240.jpg";
  const [onlineStatus, setOnlineStatus] = useState("Inactive");
  const [friendImages, setfriendImages] = useState([
    {
      uri: "https://images.hdqwalls.com/download/sneaker-guy-4k-4y-140x140.jpg",
    },
    {
      uri:
        "https://images.hdqwalls.com/download/anime-girl-face-mask-purple-eyes-twintails-hate-5k-79-140x140.jpg",
    },
    {
      uri:
        "https://images.hdqwalls.com/download/trent-alexander-arnold-fifa-21-oy-140x140.jpg",
    },
    {
      uri:
        "https://images.hdqwalls.com/download/viper-valorant-2020-game-sk-140x140.jpg",
    },
  ]);

  //   TODO: Make Progress Bar Dynamic
  const calProgress = (v) => {
    return ((v / 800) * 100).toFixed(0);
  };

  //   TODO: Check User Active or Inactive
  const checkConnectivity = () => {};

  return (
    <Container style={styles.container}>
      <View style={styles.thumbnailContainer}>
        <Thumbnail style={styles.thumbnail} source={{ uri: uri }} />
        <View style={styles.level}>
          <Text style={styles.levelText}>Lvl. 1</Text>
        </View>
      </View>
      <View style={styles.nameContainer}>
        <TextM style={styles.nameText}>Magic</TextM>
      </View>
      <View style={styles.emailContainer}>
        <View style={styles.email}>
          <TextM style={styles.emailText}>magic@gmail.com</TextM>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <Progress
          style={styles.progressBar}
          done={calProgress(768)}
          level={calProgress(768)}
        />
        <Row style={styles.progressBarText}>
          <Row>
            <Text>XP 768/</Text>
            <Text color="#a2a3a5">800</Text>
          </Row>
          <Row>
            <Text>32 XP </Text>
            <Text color="#a2a3a5">to level up</Text>
          </Row>
        </Row>
      </View>
      <Row style={styles.userOnlineStatus}>
        <Text color="#a2a3a5">User Status</Text>
        <Row>
          <View
            style={[
              styles.statusCircle,
              {
                backgroundColor:
                  onlineStatus == "Active" ? "#0CD29C" : "#F94A58",
              },
            ]}
          />
          <Text>{onlineStatus}</Text>
        </Row>
      </Row>
      <View style={styles.friendContainer}>
        <Row>
          <Text size={17}>Friends </Text>
          <Text color="#a2a3a5" size={16}>
            (56)
          </Text>
        </Row>
        <Row>
          {friendImages.map((v, i) => {
            return (
              <Image
                source={{ uri: v.uri }}
                key={i}
                style={styles.friendImage}
              />
            );
          })}
          <View
            style={[
              styles.friendImage,
              {
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text size={16} color="#a2a3a5">
              +52
            </Text>
          </View>
        </Row>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    justifyContent: "flex-start",
  },
  // ??????????????????????????????????????????????????????
  thumbnailContainer: {
    alignItems: "center",
  },
  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  level: {
    backgroundColor: "#30AB70",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 5,
    bottom: 10,
    elevation: 3,
  },
  levelText: {
    color: "#fff",
  },
  // ??????????????????????????????????????????????????????
  nameContainer: {
    alignItems: "center",
    marginTop: 15,
  },
  nameText: {
    fontSize: 20,
  },
  // ??????????????????????????????????????????????????????
  emailContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  email: {
    backgroundColor: "#F1F2F4",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  emailText: {
    fontSize: 16,
    color: "#a2a3a5",
  },
  // ??????????????????????????????????????????????????????
  progressBarContainer: {
    alignItems: "center",
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#F1F2F4",
  },
  progressBar: {
    width: 320,
  },
  progressBarText: {
    justifyContent: "space-between",
    width: 320,
  },
  // ??????????????????????????????????????????????????????
  userOnlineStatus: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "#F1F2F4",
    justifyContent: "space-between",
    paddingHorizontal: 35,
  },
  statusCircle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginTop: 2,
    marginRight: 7,
  },
  // ??????????????????????????????????????????????????????
  friendContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "#F1F2F4",
    paddingHorizontal: 35,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginTop: 20,
    marginRight: 20,
  },
});
