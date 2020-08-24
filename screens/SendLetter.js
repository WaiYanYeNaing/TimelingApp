import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import Container from "../components/Container";
import Header from "../components/Header";
import Row from "../components/Row";
import {
  Icon,
  Tabs,
  Tab,
  TabHeading,
  Input,
  Textarea,
  Label,
  Button,
  Thumbnail,
} from "native-base";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Text from "../components/TextR";
import TextM from "../components/TextM";

const { width } = Dimensions.get("window");

export default function SendLetter({ navigation }) {
  const [curTab, setCurTab] = useState(1);
  const [newLetterColor, setNewLetterColor] = useState("#4393ff");
  const [draftLetterColor, setDraftLetterColor] = useState("#d5dce3");
  const [title, setTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState([
    {
      id: 1,
      uri: "https://images.hdqwalls.com/download/necromancer-tn-240x240.jpg",
    },
    {
      id: 2,
      uri:
        "https://images.hdqwalls.com/download/viper-valorant-2020-game-sk-140x140.jpg",
    },
    {
      id: 3,
      uri:
        "https://images.hdqwalls.com/download/cyberpunk-2077-12k-kp-140x140.jpg",
    },
  ]);
  const [tempSU, setTempSU] = useState([]);
  const [curActionBtn, setCurActionBtn] = useState(1);

  const switchTab = (v) => {
    if (v === 1) {
      setCurTab(v);
      setNewLetterColor("#4393ff");
      setDraftLetterColor("#d5dce3");
    }
    if (v === 2) {
      setCurTab(v);
      setNewLetterColor("#d5dce3");
      setDraftLetterColor("#4393ff");
    }
  };

  const updateSU = () => {
    setTempSU(selectedUser);
    setCurActionBtn(2);
  };

  const deleteSU = (id) => {
    let temp = selectedUser.filter((v) => v.id != id);
    setSelectedUser(temp);
  };

  const cancelSU = () => {
    setSelectedUser(tempSU);
    setCurActionBtn(1);
  };

  // * Create User Tab or Draft tab (component)
  const CreateOrDraft = ({ status }) => {
    if (status === 1) {
      return (
        <View>
          <Row>
            <Input
              bordered
              style={styles.input}
              placeholder="Enter your title here..."
              onChangeText={(v) => setTitle(v)}
            />
          </Row>
          <View style={styles.contentContainer}>
            <TextM style={styles.inputLabel}>Your Content</TextM>
            <Textarea
              bordered
              style={styles.textarea}
              placeholder="Enter your Content here..."
              onChangeText={(v) => setTitle(v)}
              rowSpan={12}
            />
          </View>
          <Row style={styles.buttonContainer}>
            <Button style={styles.btnSave}>
              <Text style={{ color: "#fff" }}>Save Draft</Text>
            </Button>
            <Button style={styles.btnSend}>
              <Text style={{ color: "#fff" }}>Send</Text>
            </Button>
          </Row>
        </View>
      );
    }
    if (status === 2) {
      return null;
    }
  };

  // * User Thumbnail View Or Delete (component)
  const UserThumbnail = ({ status, v }) => {
    if (status === 1) {
      return (
        <View>
          <Thumbnail style={styles.thumbnail} source={{ uri: v.uri }} />
        </View>
      );
    }
    if (status === 2) {
      return (
        <View>
          <TouchableOpacity
            style={styles.thumbnailDeleteContainer}
            onPress={() => deleteSU(v.id)}
          >
            <Thumbnail style={styles.thumbnailDelete} source={{ uri: v.uri }} />
            <View style={[styles.overlay]}>
              <Icon
                type="Ionicons"
                name="close"
                style={{ color: "#fff", fontSize: 34 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  // * User Update Done Cancel Btn (container)
  const ActionBtn = ({ status }) => {
    if (status === 1) {
      return (
        <View>
          <Button style={styles.actionBtn} onPress={() => updateSU()}>
            <Text color={"#848587"} size={12}>
              Update
            </Text>
          </Button>
        </View>
      );
    }
    if (status === 2) {
      return (
        <View>
          <Row>
            <Button
              style={[styles.actionBtn, { marginRight: 10 }]}
              onPress={() => cancelSU()}
            >
              <Text color={"#848587"} size={12}>
                Cancel
              </Text>
            </Button>
            <Button style={styles.actionBtn} onPress={() => setCurActionBtn(1)}>
              <Text color={"#848587"} size={12}>
                Done
              </Text>
            </Button>
          </Row>
        </View>
      );
    }
  };

  return (
    <Container style={styles.container}>
      <Header style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon type="Ionicons" name="close" />
        </TouchableOpacity>
      </Header>
      <Row style={styles.actionContainer}>
        <TouchableOpacity onPress={() => switchTab(1)}>
          <Icon
            type="MaterialCommunityIcons"
            name="book-plus-multiple"
            style={[styles.actionIcon, { color: newLetterColor }]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => switchTab(2)}>
          <Icon
            type="Entypo"
            name="bookmarks"
            style={[styles.actionIcon, { color: draftLetterColor }]}
          />
        </TouchableOpacity>
      </Row>

      <Row style={styles.titleText}>
        <TextM size={18}>Create a letter</TextM>
      </Row>
      <View style={styles.userContainer}>
        <Row>
          <TextM style={styles.thumbnailLabel}>Selected Users</TextM>
        </Row>
        <Row>
          {selectedUser.map((v) => {
            return <UserThumbnail status={curActionBtn} v={v} />;
          })}
          <View style={styles.actionBtnContainer}>
            <ActionBtn status={curActionBtn} />
          </View>
        </Row>
      </View>
      <CreateOrDraft status={curTab} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row-reverse",
    paddingHorizontal: 10,
  },
  // ??????????????????????????????????????????????????????
  actionContainer: {
    justifyContent: "center",
  },
  actionIcon: {
    marginHorizontal: 10,
  },
  // ??????????????????????????????????????????????????????
  userContainer: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  thumbnailLabel: {
    color: "#a2a3a5",
    fontSize: 15,
    marginBottom: 15,
  },
  thumbnail: {
    width: 42,
    height: 42,
    borderRadius: 100,
    marginRight: 20,
  },
  thumbnailDeleteContainer: {},
  thumbnailDelete: {
    width: 42,
    height: 42,
    borderRadius: 100,
    marginRight: 20,
  },
  overlay: {
    width: 42,
    height: 42,
    borderRadius: 100,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
  },
  actionBtnContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  actionBtn: {
    width: 70,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#848587",
    elevation: 0,
  },
  // ??????????????????????????????????????????????????????
  titleText: {
    justifyContent: "center",
    marginTop: 20,
  },
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
  // ??????????????????????????????????????????????????????
  contentContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  inputLabel: {
    color: "#a2a3a5",
    fontSize: 15,
    marginLeft: 9,
  },
  textarea: {
    fontSize: 16,
    fontFamily: "Ubuntu",
    borderColor: "#f4f4f4",
    borderRadius: 10,
    padding: 10,
  },
  // ??????????????????????????????????????????????????????
  buttonContainer: {
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 40,
  },
  btnSave: {
    width: 100,
    borderRadius: 8,
    justifyContent: "center",
    elevation: 0,
  },
  btnSend: {
    width: 100,
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: "#4393ff",
    elevation: 0,
  },
});
