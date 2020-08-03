import React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { Card, CardItem, Text, Body, Button, Icon } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

const { width: screenWidth } = Dimensions.get("window");
const BgImage =
  "https://images.hdqwalls.com/download/lake-cyan-calm-water-reflection-northern-lights-4k-6j-1536x864.jpg";

export default function ReadMore() {
  return (
    <View style={styles.container}>
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
            <Text style={styles.name}>Generated</Text>
            <Button style={styles.replyBtn} rounded>
              <Icon type="FontAwesome5" name="reply" style={{ fontSize: 14 }} />
            </Button>
          </CardItem>
          <CardItem
            style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
          >
            <Body style={{ height: 350 }}>
              <ScrollView>
                <Text style={styles.text}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  id orci sed enim efficitur vestibulum. In dictum semper neque,
                  vel pretium lectus faucibus sit amet. Mauris laoreet ex ac
                  pharetra venenatis. Integer nec vulputate dui, eu malesuada
                  dui. Aliquam malesuada urna ac ipsum consequat maximus.
                  Phasellus in dictum nibh. Sed lobortis imperdiet ipsum, a
                  porta nisi scelerisque sed. Pellentesque lobortis dolor id
                  cursus tincidunt. Donec mollis, lacus volutpat pulvinar
                  molestie, erat mauris hendrerit tortor, in imperdiet sapien
                  tellus quis quam. Sed sollicitudin quam odio, vel ullamcorper
                  justo fringilla sed. Etiam pharetra facilisis erat sed
                  pellentesque. Aenean mollis risus vel diam faucibus, et mattis
                  neque malesuada. Vestibulum ante ipsum primis in faucibus orci
                  luctus et ultrices posuere cubilia curae; Etiam consectetur
                  bibendum ligula at rhoncus. Nunc a mauris mattis eros luctus
                  facilisis. Pellentesque eu ultrices odio. Vestibulum nec
                  sollicitudin ipsum, non pharetra libero. Sed a dolor ante.
                  Vestibulum nec dolor nec dolor vestibulum commodo. Donec in
                  lacus ex. Etiam sit amet odio placerat, molestie magna et,
                  elementum arcu. Sed vestibulum eu turpis eget tristique. Morbi
                  pharetra augue erat, vel fringilla lacus pellentesque quis.
                  Curabitur justo enim, dignissim sit amet pulvinar sit amet,
                  iaculis vitae odio. Curabitur aliquet mollis sem. Vestibulum
                  ornare purus neque. Sed efficitur risus non arcu bibendum, eu
                  tristique nunc fermentum. Etiam ut gravida lectus. Quisque
                  vitae lacus quis sem auctor scelerisque et sit amet ligula.
                  Pellentesque volutpat nibh in orci interdum, finibus imperdiet
                  massa tristique.
                </Text>
              </ScrollView>
            </Body>
          </CardItem>
        </Card>
      </View>
    </View>
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
  },
  name: {
    fontSize: 17,
  },
  replyBtn: {
    marginLeft: "auto",
    color: "#1A3BCA",
  },
  text: {
    fontSize: 14,
  },
});
