import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Container from "../components/Container";
import Text from "../components/TextM";
import Timeline from "react-native-timeline-flatlist";
import Header from "../components/Header";
import { c3, c4, c5 } from "../themes/Colors";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import CButton from "../components/CButton";

export default function History({ navigation }) {
  const [history, sethistory] = useState([
    {
      title: "User 1",
      description: (
        <View style={styles.history_description_container}>
          <Text color={c4}>Total Letter Send: 11</Text>
          <Text color={c4}>Total Letter Received: 11</Text>
          <CButton
            text={"Details"}
            width={80}
            height={30}
            style={styles.details_btn}
          />
        </View>
      ),
    },
    {
      title: "User 2",
      description: (
        <View style={styles.history_description_container}>
          <Text color={c4}>Total Letter Send: 5</Text>
          <Text color={c4}>Total Letter Received: 3</Text>
          <CButton
            text={"Details"}
            width={80}
            height={30}
            style={styles.details_btn}
          />
        </View>
      ),
    },
    {
      title: "User 3",
      description: (
        <View style={styles.history_description_container}>
          <Text color={c4}>Total Letter Send: 3</Text>
          <Text color={c4}>Total Letter Received: 3</Text>
          <CButton
            text={"Details"}
            width={80}
            height={30}
            style={styles.details_btn}
          />
        </View>
      ),
    },
    {
      title: "User 4",
      description: (
        <View style={styles.history_description_container}>
          <Text color={c4}>Total Letter Send: 1</Text>
          <Text color={c4}>Total Letter Received: 1</Text>
          <CButton
            text={"Details"}
            width={80}
            height={30}
            style={styles.details_btn}
          />
        </View>
      ),
    },
  ]);

  return (
    <Container>
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

      <View style={styles.historyContainer}>
        <Timeline
          data={history}
          circleSize={20}
          circleColor={c5}
          lineColor={c4}
          titleStyle={{ color: c3 }}
          descriptionStyle={{ color: c4 }}
          options={{
            style: { paddingTop: 5 },
          }}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    marginTop: 40,
  },
  history_description_container: {
    width: "70%",
    marginTop: 8,
  },
  details_btn: {
    marginTop: 8,
  },
});
