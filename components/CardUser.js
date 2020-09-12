import { Icon } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { c3 } from "../themes/Colors";
import Category from "./Category";
import Row from "./Row";
import Text from "./TextR";

export default function CardUser({ users, SU, setSU }) {
  const [selectedCard, setSelectedCard] = useState([]);

  useEffect(() => {
    if (SU == "") {
      setSelectedCard([]);
    }
  }, [SU]);

  const selectedCardHandler = (v) => {
    // * Selected User ID
    let temp = [...selectedCard];
    if (temp.includes(v.id)) {
      temp = temp.filter((f) => f != v.id);
    } else {
      if (temp.length < 3) temp.push(v.id);
    }
    setSelectedCard(temp); // eg ["1", "3"]

    // * Selected User Data
    let tempSU = [];
    temp.forEach((e) => {
      tempSU.push(users.filter((f) => f.id == e)[0]);
    });
    setSU(tempSU);
  };

  return (
    <View style={styles.card_user_container}>
      {users.map((value, index) => {
        return (
          <View
            key={value.id}
            style={{
              ...styles.card_border,
              ...(selectedCard.includes(value.id)
                ? styles.cardSelected
                : styles.cardUnSelected),
            }}
          >
            <Category
              value={value}
              id={value.id}
              name={value.name}
              gender={value.gender}
              image={value.uri}
              selected={(v) => selectedCardHandler(v)}
            />
            {selectedCard.includes(value.id) ? (
              <Row>
                <Text size={13}>Selected </Text>
                <Icon
                  type="MaterialCommunityIcons"
                  name="account-check"
                  style={{ color: c3, fontSize: 18 }}
                />
              </Row>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card_user_container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card_border: {
    borderWidth: 3,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 10,
    width: 156,
    height: 238,
    alignItems: "center",
  },
  cardSelected: {
    borderColor: "rgba(26, 59, 202, .8)",
    borderBottomWidth: 30,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  cardUnSelected: {
    borderColor: "transparent",
  },
  // ??????????????????????????????????????????????????????
});
