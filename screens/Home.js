import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, AsyncStorage } from "react-native";
import { Button } from "native-base";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import Text from "../components/TextR";
import Axios from "axios";
import Container from "../components/Container";

const { width: screenWidth } = Dimensions.get("window");
const parallaxImage =
  "https://images.hdqwalls.com/download/lake-cyan-calm-water-reflection-northern-lights-4k-6j-1536x864.jpg";

export default function Home({ navigation, config }) {
  const [entries, setEntries] = useState([
    {
      id: 1,
      name: "The Last of Us II",
      date: "7/14/2020",
    },
    {
      id: 2,
      name: "The Last of Us II",
      date: "7/14/2020",
    },
    {
      id: 3,
      name: "Dragon Balls",
      date: "7/14/2020",
    },
    {
      id: 4,
      name: "Apex Legends",
      date: "7/14/2020",
    },
    {
      id: 5,
      name: "Cyberpunk",
      date: "7/14/2020",
    },
  ]);

  // useEffect(async () => {
  //   const config = {
  //     headers: {
  //       "auth-token": await AsyncStorage.getItem("token"),
  //     },
  //   };
  //   Axios.get("https://timeling.herokuapp.com/api/letter", config).then((res) =>
  //     console.log(res.data)
  //   );
  // }, []);

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
          {item.name}
        </Text>
        <Text style={styles.carouselTextDate} numberOfLines={2}>
          {item.date}
        </Text>
        <Button
          style={styles.carouselBtnReadMore}
          bordered
          rounded
          light
          onPress={() => navigation.navigate("ReadMore")}
        >
          <Text style={styles.carouselBtnText}>Read More</Text>
        </Button>
      </View>
    );
  };

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <Button style={{ backgroundColor: "#fff" }} onPress={() => logOut()}>
          <Text>Log out</Text>
        </Button>
        <Button
          style={{ backgroundColor: "#fff" }}
          onPress={() => navigation.navigate("Find")}
        >
          <Text>Click Me!</Text>
        </Button>
      </View>
      <View style={styles.carouselContainer}>
        <Carousel
          data={entries}
          renderItem={_renderItem}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 160}
          hasParallaxImages={true}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
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
