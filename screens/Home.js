import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { Text, Button } from "native-base";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width: screenWidth } = Dimensions.get("window");
const parallaxImage =
  "https://images.hdqwalls.com/download/lake-cyan-calm-water-reflection-northern-lights-4k-6j-1536x864.jpg";

export default function Home({ navigation }) {
  const _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.imageContainer}>
        {/* <ImageBackground
        source={item.image}
        style={styles.carouselImage}
        imageStyle={{ borderRadius: 8 }}
      >
        <Text>{item.name}</Text>
      </ImageBackground> */}

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

  const [activeIndex, setActiveIndex] = useState(0);
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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
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
    </View>
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
  },
  carouselBtnText: {
    fontSize: 13,
  },
});
