import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  AsyncStorage,
  Keyboard,
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
  Root,
  Toast,
  Content,
} from "native-base";
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Text from "../components/TextR";
import TextM from "../components/TextM";
import { c3, c4 } from "../themes/Colors";
import CButton from "../components/CButton";
import Axios from "axios";
import Loader from "../components/Loader";

const { width } = Dimensions.get("window");
let text = "";
export default function SendLetter({ route, navigation }) {
  const [curTab, setCurTab] = useState(1);
  const [newLetterColor, setNewLetterColor] = useState("#4393ff");
  const [draftLetterColor, setDraftLetterColor] = useState("#d5dce3");
  const [title, setTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [tempSU, setTempSU] = useState([]);
  const [curActionBtn, setCurActionBtn] = useState(1);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setSelectedUser(route.params.SU);
    console.log(route.params.SU);
  }, []);

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

  const sendLetter = async () => {
    setLoader(true);
    const config = {
      headers: {
        "auth-token": await AsyncStorage.getItem("token"),
      },
    };
    for (let x of selectedUser) {
      const temp = {
        uid: x.uid,
        text,
      };
      Axios.post(
        "https://timeling.herokuapp.com/api/letter/",
        temp,
        config
      ).then((res) => {
        setLoader(false);
      });
    }
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
              value={title}
            />
          </Row>
          <View style={styles.contentContainer}>
            <TextM style={styles.inputLabel}>Your Content</TextM>
            <Textarea
              bordered
              style={styles.textarea}
              placeholder="Enter your Content here..."
              rowSpan={12}
              onChangeText={(v) => (text = v)}
            />
          </View>
          <Row style={styles.buttonContainer}>
            <CButton width={100} text={"Save Draft"} size={14} />
            <CButton
              width={100}
              text={"Send"}
              size={14}
              onPress={() => sendLetter()}
            />
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
          <CButton
            width={70}
            height={30}
            text={"Update"}
            size={12}
            onPress={() => updateSU()}
          />
        </View>
      );
    }
    if (status === 2) {
      return (
        <View>
          <Row>
            <CButton
              width={70}
              height={30}
              text={"Cancel"}
              size={12}
              onPress={() => cancelSU()}
              style={{ marginRight: 10 }}
            />
            <CButton
              width={70}
              height={30}
              text={"Done"}
              size={12}
              onPress={() => setCurActionBtn(1)}
            />
          </Row>
        </View>
      );
    }
  };

  return (
    <Container style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {/* Header */}
        <Header style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon type="Ionicons" name="close" />
          </TouchableOpacity>
        </Header>

        {/* Switch Create and Draft */}
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

        {/* Title Text */}
        <Row style={styles.titleText}>
          <TextM size={18}>Create a letter</TextM>
        </Row>

        {/* Container */}
        <View style={styles.userContainer}>
          <Row>
            <TextM style={styles.thumbnailLabel} color={c4} size={15}>
              Selected Users
            </TextM>
          </Row>
          <Row>
            {selectedUser.map((v, index) => {
              return <UserThumbnail status={curActionBtn} v={v} key={index} />;
            })}
            <View style={styles.actionBtnContainer}>
              <ActionBtn status={curActionBtn} />
            </View>
          </Row>
        </View>
        <CreateOrDraft status={curTab} text={(v) => console.log(v)} />

        {/** Loading..  */}
        <Loader visible={loader} />
      </TouchableWithoutFeedback>
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
    color: c3,
    borderRadius: 10,
    padding: 10,
  },
  // ??????????????????????????????????????????????????????
  buttonContainer: {
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 40,
  },
});
