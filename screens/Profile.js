import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
} from "react-native";
import Text from "../components/TextR";
import Container from "../components/Container";
import { Thumbnail, Button, Icon } from "native-base";
import TextM from "../components/TextM";
import Progress from "../components/Progress";
import Row from "../components/Row";
import Loader from "../components/Loader";
import Dialog, {
  SlideAnimation,
  DialogContent,
} from "react-native-popup-dialog";
import { ScrollView } from "react-native-gesture-handler";
import Axios from "axios";

const { width: screenWidth } = Dimensions.get("window");
export default function Profile({ navigation }) {
  const uri = "https://images.hdqwalls.com/download/necromancer-tn-240x240.jpg";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [exp, setExp] = useState(0);
  const expStage = [0, 20, 60, 180, 540, 1620];
  const [onlineStatus, setOnlineStatus] = useState("Inactive");
  const [rewardImages, setRewardImages] = useState([
    {
      name: "samurai",
      uri:
        "https://images.hdqwalls.com/download/cyberpunk-2077-samurai-0g-140x140.jpg",
    },
    {
      name: "art",
      uri:
        "https://images.hdqwalls.com/download/cyberpunk-2077-art-48-140x140.jpg",
    },
    {
      name: "cyberpunk-2077",
      uri:
        "https://images.hdqwalls.com/download/cyberpunk-2077-12k-kp-140x140.jpg",
    },
    {
      name: "cosplay",
      uri:
        "https://images.hdqwalls.com/download/cyberpunk-2077-cosplay-4k-2020-7u-140x140.jpg",
    },
  ]);
  const [friendImages, setFriendImages] = useState([
    {
      name: "sneaker",
      uri: "https://images.hdqwalls.com/download/sneaker-guy-4k-4y-140x140.jpg",
    },
    {
      name: "purple",
      uri:
        "https://images.hdqwalls.com/download/anime-girl-face-mask-purple-eyes-twintails-hate-5k-79-140x140.jpg",
    },
    {
      name: "alexander",
      uri:
        "https://images.hdqwalls.com/download/trent-alexander-arnold-fifa-21-oy-140x140.jpg",
    },
    {
      name: "valorant",
      uri:
        "https://images.hdqwalls.com/download/viper-valorant-2020-game-sk-140x140.jpg",
    },
    {
      name: "cosplay",
      uri:
        "https://images.hdqwalls.com/download/cyberpunk-2077-cosplay-4k-2020-7u-140x140.jpg",
    },
    {
      name: "art",
      uri:
        "https://images.hdqwalls.com/download/cyberpunk-2077-art-48-140x140.jpg",
    },
    {
      name: "cyberpunk",
      uri:
        "https://images.hdqwalls.com/download/cyberpunk-2077-12k-kp-140x140.jpg",
    },
  ]);
  const [dialogRewardVisible, setDialogRewardVisible] = useState(false);
  const [dialogFriendVisible, setDialogFriendVisible] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const config = {
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    };
    const uid = await AsyncStorage.getItem("uid");
    Axios.get(`https://timeling.herokuapp.com/api/user/${uid}`, config).then(
      (res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setExp(res.data.exp);
      }
    );
  };

  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  const calProgress = (v) => {
    let usedExp = v;
    for (let i = 0; i < expStage.length; i++) {
      usedExp -= expStage[i];
      if (usedExp <= expStage[i + 1])
        return ((usedExp / expStage[i + 1]) * 100).toFixed(0);
    }
  };

  const calXP = (v) => {
    let usedExp = v;
    for (let i = 0; i < expStage.length; i++) {
      usedExp -= expStage[i];
      if (usedExp <= expStage[i + 1]) {
        return usedExp;
      }
    }
  };

  const curMaxExp = (v) => {
    let usedExp = v;
    for (let i = 0; i < expStage.length; i++) {
      usedExp -= expStage[i];
      if (usedExp <= expStage[i + 1]) return expStage[i + 1];
    }
  };

  //   TODO: Check User Active or Inactive
  const checkConnectivity = () => {};

  return (
    <Container style={styles.container}>
      <Row style={styles.actionContainer}>
        <TouchableOpacity>
          <Icon type="Octicons" name="settings" style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon type="Feather" name="edit" style={styles.actionIcon} />
        </TouchableOpacity>
      </Row>
      <View style={styles.thumbnailContainer}>
        <Thumbnail style={styles.thumbnail} source={{ uri: uri }} />
        <View style={styles.level}>
          <Text style={styles.levelText}>Lvl. 3</Text>
        </View>
      </View>
      <View style={styles.nameContainer}>
        <TextM style={styles.nameText}>{name}</TextM>
      </View>
      <View style={styles.emailContainer}>
        <View style={styles.email}>
          <TextM style={styles.emailText}>{email}</TextM>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <Progress
          style={styles.progressBar}
          done={calProgress(exp)}
          level={calProgress(exp)}
        />
        <Row style={styles.progressBarText}>
          <Row>
            <Text>XP {calXP(exp)}/</Text>
            <Text color="#a2a3a5">{curMaxExp(exp)}</Text>
          </Row>
          <Row>
            <Text>{curMaxExp(exp) - calXP(exp)} XP </Text>
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
      <View style={styles.rewardContainer}>
        <Row>
          <Text size={17}>Rewards </Text>
          <Text color="#a2a3a5" size={16}>
            (9)
          </Text>
        </Row>
        <Row>
          {rewardImages.slice(0, 4).map((v, i) => {
            return (
              <Image
                source={{ uri: v.uri }}
                key={i}
                style={styles.rewardImage}
              />
            );
          })}
          <TouchableOpacity onPress={() => setDialogRewardVisible(true)}>
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
                +5
              </Text>
            </View>
          </TouchableOpacity>
        </Row>
      </View>
      <View style={styles.friendContainer}>
        <Row>
          <Text size={17}>Friends </Text>
          <Text color="#a2a3a5" size={16}>
            (56)
          </Text>
        </Row>
        <Row>
          {friendImages.slice(0, 4).map((v, i) => {
            return (
              <Image
                source={{ uri: v.uri }}
                key={i}
                style={styles.friendImage}
              />
            );
          })}
          <TouchableOpacity onPress={() => setDialogFriendVisible(true)}>
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
          </TouchableOpacity>
        </Row>
        <Loader />
      </View>
      <View style={styles.logoutBtnContainer}>
        <Button bordered style={styles.logoutBtn} onPress={() => logOut()}>
          <Text size={16}>Log out</Text>
          <Icon
            type="MaterialCommunityIcons"
            name="logout-variant"
            style={styles.logoutBtnIcon}
          />
        </Button>
      </View>

      {/** Dialog Reward */}
      <Dialog
        visible={dialogRewardVisible}
        onTouchOutside={() => {
          setDialogRewardVisible(false);
        }}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
      >
        <DialogContent style={styles.dialogFriend}>
          <ScrollView>
            <Row style={styles.dialogFriendImageRow}>
              {rewardImages.map((v, i) => {
                return (
                  <View key={i} style={{ width: 115 }}>
                    <Image
                      source={{ uri: v.uri }}
                      style={styles.dialogFriendImage}
                    />
                    <Text style={{ marginHorizontal: 10 }}>{v.name}</Text>
                  </View>
                );
              })}
            </Row>
          </ScrollView>
        </DialogContent>
      </Dialog>

      {/** Dialog Friend */}
      <Dialog
        visible={dialogFriendVisible}
        onTouchOutside={() => {
          setDialogFriendVisible(false);
        }}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
      >
        <DialogContent style={styles.dialogFriend}>
          <ScrollView>
            <Row style={styles.dialogFriendImageRow}>
              {friendImages.map((v, i) => {
                return (
                  <View key={i} style={{ width: 115 }}>
                    <Image
                      source={{ uri: v.uri }}
                      style={styles.dialogFriendImage}
                    />
                    <Text style={{ marginHorizontal: 10 }}>{v.name}</Text>
                  </View>
                );
              })}
            </Row>
          </ScrollView>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    justifyContent: "flex-start",
  },
  // ??????????????????????????????????????????????????????
  actionContainer: {
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  actionIcon: {
    color: "#848587",
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
    marginTop: 10,
  },
  nameText: {
    fontSize: 20,
  },
  // ??????????????????????????????????????????????????????
  emailContainer: {
    alignItems: "center",
    marginTop: 5,
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
    marginTop: 25,
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
    marginTop: 15,
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
  rewardContainer: {
    marginTop: 15,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "#F1F2F4",
    paddingHorizontal: 35,
  },
  rewardImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginTop: 20,
    marginRight: 20,
  },
  // ??????????????????????????????????????????????????????
  friendContainer: {
    marginTop: 15,
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
  dialogFriend: {
    height: 400,
    width: screenWidth - 90,
    marginTop: 15,
  },
  dialogFriendImageRow: {
    marginLeft: 20,
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dialogFriendImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginTop: 20,
    marginRight: 20,
  },
  // ??????????????????????????????????????????????????????
  logoutBtnContainer: {
    marginTop: 15,
    paddingTop: 20,
    paddingHorizontal: 35,
  },
  logoutBtn: {
    borderColor: "#4c4c4c",
    borderRadius: 30,
    justifyContent: "center",
  },
  logoutBtnIcon: {
    color: "#a2a3a5",
  },
});
