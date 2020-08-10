import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Dialog, {
  SlideAnimation,
  DialogContent,
} from "react-native-popup-dialog";

export default function Loader({ visible }) {
  return (
    <Dialog
      visible={visible}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: "bottom",
        })
      }
    >
      <DialogContent style={styles.dialog}>
        <Image
          source={require("../assets/images/loader.gif")}
          style={styles.loaderImage}
        />
      </DialogContent>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialog: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loaderImage: {
    width: 70,
    height: 70,
    backgroundColor: "#fff",
  },
});
