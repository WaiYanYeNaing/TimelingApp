import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, AsyncStorage } from "react-native";
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
import moment from "moment";

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
          <Text style={styles.carouselBtnText}>Read More</Text>
        </Button>
      </View>
    );
  };

  return (
    <Container>
      <Header style={styles.header}>
        <TouchableOpacity onPress={() => logOut()}>
          <Icon type="FontAwesome" name="sign-out" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Thumbnail small source={{ uri: uri }} />
        </TouchableOpacity>
      </Header>
      <Row style={styles.quoteContainer}>
        <TextM style={styles.quoteText}>Lost time is never found again</TextM>
      </Row>
      <Row style={styles.routButtonContainer}>
        <Button style={[styles.routeButton, styles.btn1]}>
          <Text style={styles.routeButtonText1}>History</Text>
        </Button>
        <Button
          style={[styles.routeButton, styles.btn2]}
          onPress={() => navigation.navigate("Find")}
        >
          <Text style={styles.routeButtonText2}>Create New</Text>
        </Button>
        <Button style={[styles.routeButton, styles.btn3]}>
          <Text style={styles.routeButtonText3}>Drafts</Text>
        </Button>
        <Button style={[styles.routeButton, styles.btn4]}>
          <Text style={styles.routeButtonText4}>Settings</Text>
        </Button>
      </Row>
      <Row style={styles.carouselHeaderContainer}>
        <TextM style={styles.carouselHeader}>Recently Received</TextM>
        <TouchableOpacity onPress={() => getAllLetters()}>
          <Icon type="MaterialCommunityIcons" name="reload" />
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
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {},
  // ??????????????????????????????????????????????????????
  quoteContainer: {
    marginVertical: 30,
  },
  quoteText: {
    fontSize: 25,
    marginHorizontal: 20,
    width: 250,
  },
  // ??????????????????????????????????????????????????????
  routButtonContainer: {
    flex: 1,
    flexWrap: "wrap",
    marginHorizontal: 20,
    marginVertical: 30,
  },
  routeButton: {
    height: 35,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    marginRight: 20,
    elevation: 0,
  },
  btn1: {
    backgroundColor: "#cceff9",
  },
  btn2: {
    backgroundColor: "#f9e7cc",
  },
  btn3: {
    backgroundColor: "#f9cdcc",
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
    color: "#e1350e",
  },
  routeButtonText4: {
    color: "#4b7f52",
  },
  // ??????????????????????????????????????????????????????
  carouselHeaderContainer: {
    marginHorizontal: 30,
    marginBottom: 30,
    height: 40,
    justifyContent: "space-between",
  },
  carouselHeader: {
    fontSize: 20,
  },
  // ??????????????????????????????????????????????????????
  carouselContainer: {
    justifyContent: "flex-end",
  },
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
    color: "#fff",
    fontSize: 14,
    top: -120,
    left: 10,
  },
  carouselTextDate: {
    color: "#ededed",
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
  carouselBtnText: {
    fontSize: 13,
    color: "#ededed",
  },
});
