import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Image,
} from "react-native";
import { Button, Icon, Thumbnail } from "native-base";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import Text from "../components/TextR";
import Axios from "axios";
import Container from "../components/Container";
import TextB from "../components/TextB";
import TextM from "../components/TextM";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CommonActions } from "@react-navigation/native";
import Row from "../components/Row";
import Header from "../components/Header";
import BannerAD from "../components/BannerAD";
import { RewardAD } from "../components/RewardAD";
import moment from "moment";
import { AdMobRewarded } from "expo-ads-admob";
import { c2, c3, c5, c4 } from "../themes/Colors";

const { width: screenWidth } = Dimensions.get("window");

export default function Home({ navigation, config }) {
  const [entries, setEntries] = useState([
    {
      _id: "loading...",
      createdAt: "loading...",
      sdetails: {
        name: "loading...",
      },
    },
  ]);
  const parallaxImage =
    "https://images.hdqwalls.com/download/lake-cyan-calm-water-reflection-northern-lights-4k-6j-1536x864.jpg";
  const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

  useEffect(() => {
    getAllLetters();
  }, []);

  const getAllLetters = async () => {
    const config = {
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    };
    const uid = await AsyncStorage.getItem("uid");
    Axios.get(`https://timeling.herokuapp.com/api/letter/${uid}`, config).then(
      (res) => {
        if (res.data.length) {
          setEntries(res.data.reverse());
        } else {
          setEntries([
            {
              _id: "No data available",
              createdAt: "No data available",
              sdetails: {
                name: "No data available",
              },
            },
          ]);
        }
      }
    );
  };

  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  const rewardAdHandler = async () => {
    RewardAD();
  };

  //* Carousel Container
  const _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.imageContainer}>
        <ParallaxImage
          source={{
            uri: parallaxImage,
          }}
          containerStyle={styles.parallaxImage}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
          parallaxFactor={2}
        />
        <Text style={styles.carouselTextName} numberOfLines={2}>
          {item.sdetails.name}
        </Text>
        <Text style={styles.carouselTextDate} numberOfLines={2}>
          {moment(new Date(item.createdAt)).format("LL")}
        </Text>
        <Button
          style={styles.carouselBtnReadMore}
          bordered
          rounded
          light
          onPress={() => navigation.navigate("ReadMore", { details: item })}
          disabled={item._id == "loading..." ? true : false}
        >
          <Text size={13} color={c3}>
            Read More
          </Text>
        </Button>
      </View>
    );
  };

  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
        <TouchableOpacity onPress={() => logOut()}>
          <Icon type="FontAwesome" name="sign-out" style={{ color: c3 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Thumbnail small source={{ uri: uri }} />
        </TouchableOpacity>
      </Header>
      <Row style={{ flex: 1 }}>
        <BannerAD />
      </Row>
      <Row style={styles.quoteContainer}>
        <TextM style={styles.quoteText}>Lost time is never found again</TextM>
      </Row>
      <Row style={styles.carouselHeaderContainer}>
        <TextM style={styles.carouselHeader}>Recently Received</TextM>
        <TouchableOpacity onPress={() => getAllLetters()}>
          <Icon
            type="MaterialCommunityIcons"
            name="reload"
            style={{ color: c3 }}
          />
        </TouchableOpacity>
      </Row>
      <Row style={styles.carouselContainer}>
        <Carousel
          data={entries}
          renderItem={_renderItem}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 160}
          hasParallaxImages={true}
        />
      </Row>
      <View style={styles.routButtonContainer}>
        <Row>
          <Text size={20} style={styles.routeBtnHeader}>
            Services
          </Text>
        </Row>
        <Row>
          <Button style={[styles.routeButton, styles.btn1]}>
            <Image
              source={require("../assets/images/history.png")}
              style={styles.routeBtnImg}
            />
            <Text style={styles.routeButtonText1}>History</Text>
          </Button>
          <Button
            style={[styles.routeButton, styles.btn2]}
            onPress={() => navigation.navigate("AddFriend")}
          >
            <Image
              source={require("../assets/images/plus.png")}
              style={styles.routeBtnImg}
            />
            <Text style={styles.routeButtonText2}>Create</Text>
          </Button>
          <Button style={[styles.routeButton, styles.btn3]}>
            <Image
              source={require("../assets/images/draft.png")}
              style={styles.routeBtnImg}
            />
            <Text style={styles.routeButtonText3}>Drafts</Text>
          </Button>
          <Button
            style={[styles.routeButton, styles.btn4]}
            onPress={() => RewardAD()}
          >
            <Image
              source={require("../assets/images/settings.png")}
              style={styles.routeBtnImg}
            />
            <Text style={styles.routeButtonText4}>Settings</Text>
          </Button>
        </Row>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
  // ??????????????????????????????????????????????????????
  header: {
    flex: 1,
    marginHorizontal: 30,
  },
  // ??????????????????????????????????????????????????????
  quoteContainer: {
    flex: 1,
    marginVertical: 30,
  },
  quoteText: {
    fontSize: 25,
    marginHorizontal: 20,
    width: 250,
  },
  // ??????????????????????????????????????????????????????
  carouselHeaderContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginHorizontal: 30,
    marginBottom: 30,
    height: 40,
    justifyContent: "space-between",
  },
  carouselHeader: {
    fontSize: 20,
  },
  // ??????????????????????????????????????????????????????
  carouselContainer: {},
  imageContainer: {
    width: screenWidth - 160,
    height: screenWidth - 10,
  },
  carouselImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  parallaxImage: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 20,
  },
  carouselTextName: {
    color: c3,
    fontSize: 14,
    top: -120,
    left: 10,
  },
  carouselTextDate: {
    color: c3,
    fontSize: 12,
    top: -120,
    left: 10,
  },
  carouselBtnReadMore: {
    top: -100,
    left: 100,
    width: 110,
    justifyContent: "center",
  },
  // ??????????????????????????????????????????????????????
  routButtonContainer: {
    justifyContent: "flex-end",
    backgroundColor: c2,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    alignItems: "center",
    paddingBottom: 20,
  },
  routeBtnHeader: {
    marginVertical: 20,
    width: screenWidth - 40,
  },
  routeButton: {
    height: 90,
    width: 80,
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 6,
    borderRadius: 5,
    marginHorizontal: 5,
    elevation: 0,
  },
  btn1: {
    backgroundColor: "#cceff9",
  },
  btn2: {
    backgroundColor: "#f9e7cc",
  },
  btn3: {
    backgroundColor: c5,
  },
  btn4: {
    backgroundColor: "#7dd181",
  },
  routeButtonText1: {
    color: "#157896",
  },
  routeButtonText2: {
    color: "#b66e02",
  },
  routeButtonText3: {
    color: c4,
  },
  routeButtonText4: {
    color: "#4b7f52",
  },
  routeBtnImg: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
});
