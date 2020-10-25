import Axios from "axios";
import { Icon, Thumbnail } from "native-base";
import React, { useEffect, useState } from "react";
import { AsyncStorage, Image, StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Container from "../components/Container";
import Header from "../components/Header";
import Row from "../components/Row";
import TextM from "../components/TextM";
import Text from "../components/TextR";
import { c2, c3, c4, c5 } from "../themes/Colors";

export default function Friends({ navigation }) {
  const [friends, setfriends] = useState([]);

  useEffect(() => {
    getAllFriends();
    navigation.addListener("focus", () => {
      getAllFriends();
    });
  }, []);

  const getAllFriends = async () => {
    const config = {
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    };
    const uid = await AsyncStorage.getItem("uid");
    Axios.get(`https://timeling.herokuapp.com/api/friend/${uid}`, config).then(
      (res) => {
        setfriends(res.data);
      }
    );
  };

  return (
    <Container style={styles.container}>
      {/* Action Header */}
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type="Foundation"
            name="arrow-left"
            style={{ color: c3, fontSize: 30 }}
          />
        </TouchableOpacity>
      </Header>

      {/* Title Icon */}
      <View style={styles.title_icon_text_container}>
        <View style={styles.title_icon_container}>
          <Image
            source={require("../assets/images/connection.png")}
            style={styles.title_icon}
          />
        </View>
        <TextM size={20} style={styles.title_text}>
          Your Friends
        </TextM>
      </View>

      {/* Friends */}
      <ScrollView>
        {friends.map((v, i) => {
          return (
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Chat')}>
              <Row style={styles.friend_card} key={i}>
                <Row style={{ alignItems: "center" }}>
                  <Thumbnail
                    source={{
                      uri: `https://picsum.photos/200/300?random=${Math.floor(
                        Math.random() * 100
                      )}`,
                    }}
                    style={styles.thumbnail}
                  />
                  <View>
                    <TextM size={15}>{v.name}</TextM>
                    <Text size={12} color={c4}>
                      Reputation: {v.exp}
                    </Text>
                  </View>
                </Row>
                <Icon
                  type="Feather"
                  name="more-horizontal"
                  style={{ color: c3 }}
                />
              </Row>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
  title_icon_text_container: {
    marginVertical: 20,
    alignItems: "center",
  },
  title_icon_container: {
    width: 70,
    height: 70,
    paddingTop: 3,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: c5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  title_icon: {
    width: 45,
    height: 45,
  },
  title_text: {
    marginTop: 10,
  },
  // ??????????????????????????????????????????????????????
  friend_card: {
    backgroundColor: c2,
    height: 80,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 3,
  },
  thumbnail: {
    marginRight: 15,
  },
});
