import { Icon, Input } from "native-base";
import React, { useEffect, useState } from "react";
import { AsyncStorage, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Container from "../components/Container";
import Header from "../components/Header";
import Text from "../components/TextR";
import { c3 } from "../themes/Colors";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Row from "../components/Row";
import CButton from "../components/CButton";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBMacDf8zVblpSNlAZps47mh6tjy364aF4",
    authDomain: "timeling-7e74d.firebaseapp.com",
    databaseURL: "https://timeling-7e74d.firebaseio.com",
    projectId: "timeling-7e74d",
    storageBucket: "timeling-7e74d.appspot.com",
    messagingSenderId: "207424171992",
    appId: "1:207424171992:web:8606c2411e676714f6ccad",
    measurementId: "G-KS4KLF5Z6M",
  });
}

export default function Chat({ navigation }) {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setformValue] = useState("");
  const [uid, setuid] = useState("");

  useEffect(() => {
    getUid();
  }, []);

  const getUid = async () => {
    setuid(await AsyncStorage.getItem("uid"));
  };

  const ChatMessage = (v) => {
    const { text } = v.messages;
    const messageClass = uid === v.messages.uid ? "sent" : "received";
    console.log(messageClass);
    return (
      <View
        style={
          messageClass == "sent" ? styles.messageSent : styles.messageReceived
        }
      >
        <Text>{text}</Text>
      </View>
    );
  };

  const sendMessage = async () => {
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });
    setformValue("");
  };

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

      <View style={styles.messageContainer}>
        {messages &&
          messages.map((v) => <ChatMessage key={v.id} messages={v} />)}
      </View>
      <Row style={styles.messageSendContainer}>
        <Input
          bordered
          style={styles.input}
          placeholder="Hola..."
          onChangeText={(v) => setformValue(v)}
          value={formValue}
        />
        <CButton
          width={100}
          text={"Sent"}
          size={14}
          onPress={() => sendMessage()}
        />
      </Row>
    </Container>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
    fontFamily: "Ubuntu",
    borderColor: "#f4f4f4",
    borderRadius: 10,
    borderWidth: 1,
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageReceived: {
    alignSelf: "flex-start",
  },
  messageSent: {
    alignSelf: "flex-end",
  },
  messageSendContainer: {
    marginBottom: 20,
  },
});
