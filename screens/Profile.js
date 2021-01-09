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
import { Thumbnail, Icon } from "native-base";
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
import { c5, c4, c3, c2 } from "../themes/Colors";
import Button from "../components/CButton";
//Responsivewidthheightforalldevices
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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

  const Topics = ["Movies", "Anime", "Music"];
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
      <ScrollView>
        <View style={styles.card}>
          <Row style={styles.actionContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                type="Foundation"
                name="arrow-left"
                style={{ color: c3, fontSize: 30 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                type="MaterialIcons"
                name="more-horiz"
                style={styles.actionIcon}
              />
            </TouchableOpacity>
          </Row>
          <Row>
            <View style={styles.thumbnailContainer}>
              <Thumbnail style={styles.thumbnail} source={{ uri: uri }} />
              <View style={styles.level}>
                <Text>Lvl.5</Text>
              </View>
            </View>
            <View style={styles.nameContainer}>
              {/*name*/}
              <TextM style={styles.nameText}>{name}</TextM>
              {/*email*/}
              <View style={styles.email}>
                <TextM color={c4} size={10}>
                  {email}
                </TextM>
              </View>
              <Row>
                {/*friends*/}
                <TouchableOpacity onPress={() => setDialogFriendVisible(true)}>
                  <View>
                    <Row>
                      <View style={styles.usericon}>
                        <Icon
                          type="FontAwesome"
                          name="user-o"
                          style={{ color: c3, fontSize: 26 }}
                        />
                      </View>
                      <View style={styles.count}>
                        <Text size={14}>7</Text>
                      </View>
                    </Row>
                    <View style={styles.friend}>
                      <Text color={c4} size={14}>
                        Friends
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {/*Ratings*/}
                <View style={styles.ratingcontainer}>
                  <Row>
                    <View style={styles.rating}>
                      <Icon
                        type="FontAwesome5"
                        name="star"
                        style={{ color: c3, fontSize: 25 }}
                      />
                    </View>
                    <View style={styles.count}>
                      <Text size={14}>5.0</Text>
                    </View>
                  </Row>
                  <View style={styles.friend}>
                    <Text color={c4} size={14}>
                      Ratings
                    </Text>
                  </View>
                </View>
              </Row>
            </View>
          </Row>
        </View>
        {/*About Me*/}
        <View style={styles.aboutme}>
          <Text>About Me</Text>
        </View>
        <View style={styles.aboutcard}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.birth}>
            <Row>
              <Icon
                type="FontAwesome"
                name="birthday-cake"
                style={{ color: c3, fontSize: 20, marginRight: 20 }}
              />
              <Text size={15}>Birthday</Text>
              <Text size={15} style={{ marginLeft: 20 }}>
                Feb 20, 2000
              </Text>
            </Row>
          </View>
          <View style={styles.birth}>
            <Row>
              <Icon
                type="Entypo"
                name="location"
                style={{ color: c3, fontSize: 22, marginRight: 20 }}
              />
              <Text size={15}>Location</Text>
              <Text size={15} style={{ marginLeft: 20 }}>
                Myanmar, Yangon
              </Text>
            </Row>
          </View>
        </View>
        {/*Progress*/}
        <View style={styles.aboutme}>
          <Text>Progress of Level Up</Text>
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
              <Text color={c4}>{curMaxExp(exp)}</Text>
            </Row>
            <Row>
              <Text>{curMaxExp(exp) - calXP(exp)} XP </Text>
              <Text color={c4}>to level up</Text>
            </Row>
          </Row>
        </View>
        {/* <Row style={styles.userOnlineStatus}>
        <Text color={c4}>User Status</Text>
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
      </Row> */}
        {/*Reward*/}
        <View style={styles.aboutme}>
          <Row>
            <Text size={15}>Rewards </Text>
            <Text color={c4} size={15}>
              (9)
            </Text>
          </Row>
        </View>
        <View style={styles.rewardContainer}>
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
                    borderColor: c5,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Text size={16} color={c4}>
                  +5
                </Text>
              </View>
            </TouchableOpacity>
          </Row>
        </View>
        {/*Topic of interest*/}
        <View style={styles.aboutme}>
          <Row>
            <Text size={15}>Topics of Interest</Text>
          </Row>
        </View>
        <View style={styles.rewardContainer}>
          <Row style={styles.topics}>
            {Topics.slice(0, 4).map((v, i) => {
              return (
                <View
                  style={[
                    styles.Topicitem,
                    {
                      backgroundColor: "transparent",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text>{v}</Text>
                </View>
              );
            })}
            <TouchableOpacity onPress={() => setDialogRewardVisible(false)}>
              <View style={styles.Topicitem}>
                <Text size={16} color={c4}>
                  ...
                </Text>
              </View>
            </TouchableOpacity>
          </Row>
        </View>
        {/* <View style={styles.friendContainer}>
        <Row>
          <Text size={17}>Friends </Text>
          <Text color={c4} size={16}>
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
                  borderColor: c5,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Text size={16} color={c4}>
                +52
              </Text>
            </View>
          </TouchableOpacity>
        </Row>
        <Loader />
      </View> */}
        {/* <View style={styles.logoutBtnContainer}> */}
        {/* <Button style={styles.logoutBtn} onPress={() => logOut()}>
          <Text size={16}>Log out</Text>
          <Icon
            type="MaterialCommunityIcons"
            name="logout-variant"
            style={styles.logoutBtnIcon}
          />
        </Button> */}
        {/* <Button
          iconType={"MaterialCommunityIcons"}
          iconName={"logout-variant"}
          text={"Log out"}
          onPress={() => logOut()}
        />
      </View> */}

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
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  aboutcard: {
    minHeight: 130,
    backgroundColor: c2,
    marginTop: 10,
    elevation: 0,
    borderWidth: 1,
    borderTopColor: c5,
    borderBottomColor: c5,
  },
  card: {
    minHeight: 220,
    backgroundColor: c2,
    marginTop: -15,
    elevation: 0,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  Topicitem: {
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
    borderColor: c5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    width: wp("20%"),
    marginLeft: wp("3.2%"),
  },
  container: {
    paddingTop: 40,
    justifyContent: "flex-start",
  },
  // ??????????????????????????????????????????????????????
  actionContainer: {
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 20,
  },
  actionIcon: {
    color: c3,
  },
  // ??????????????????????????????????????????????????????
  thumbnailContainer: {
    alignItems: "flex-start",
  },
  thumbnail: {
    height: 130,
    width: 130,
    borderColor: c5,
    // borderRadius: 80,
    marginLeft: 20,
    marginTop: 20,
    borderWidth: 1,
  },
  level: {
    backgroundColor: c2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: c5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    bottom: 10,
    elevation: 3,
    marginLeft: 50,
  },
  nameContainer: {
    // alignItems: "center",
    marginTop: 30,
    marginLeft: 20,
  },
  friend: {
    marginLeft: 40,
    marginTop: -16,
  },
  rating: {
    marginTop: 30,
    backgroundColor: c2,
    borderRadius: 5,
    elevation: 3,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: 1,
    borderColor: c5,
  },
  ratingcontainer: {
    marginLeft: 20,
  },
  usericon: {
    backgroundColor: c2,
    borderRadius: 5,
    elevation: 3,
    marginTop: 30,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: 1,
    borderColor: c5,
  },
  count: {
    marginTop: 20,
    marginLeft: 10,
  },
  nameText: {
    fontSize: 20,
  },
  birth: {
    marginLeft: 20,
    marginTop: 20,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
  },

  emailContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  email: {
    marginTop: 5,
    // backgroundColor: c3,
    // borderRadius: 30,
    // borderWidth: 1,
    // borderColor: c3,
    // paddingHorizontal: 15,
    // paddingVertical: 10,
  },
  aboutme: {
    marginTop: 10,
    marginLeft: 25,
  },

  progressBarContainer: {
    alignItems: "center",
    minHeight: 90,
    backgroundColor: c2,
    marginTop: 10,
    elevation: 0,
    borderWidth: 1,
    borderTopColor: c5,
    borderBottomColor: c5,
  },
  progressBar: {
    width: 360,
  },
  progressBarText: {
    justifyContent: "space-between",
    width: 360,
  },

  userOnlineStatus: {
    marginTop: 15,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: c5,
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
  topics: {
    marginTop: 14,
  },

  rewardContainer: {
    alignItems: "center",
    minHeight: 90,
    backgroundColor: c2,
    marginTop: 10,
    elevation: 0,
    borderWidth: 1,
    borderTopColor: c5,
    borderBottomColor: c5,
  },
  rewardImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginTop: 20,
    marginRight: 20,
  },

  friendContainer: {
    marginTop: 15,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: c5,
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
    height: 470,
    width: screenWidth - 90,
    paddingTop: 15,
    backgroundColor: c2,
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

  logoutBtnContainer: {
    marginTop: 15,
    paddingTop: 20,
    paddingHorizontal: 35,
    alignItems: "center",
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
