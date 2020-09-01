import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { c5, c1 } from "../themes/Colors";
import { Icon, Button } from "native-base";
import Row from "./Row";
import TextM from "./TextM";

export default function CButton({
  iconType,
  iconName,
  iconSize,
  iconColor,
  text,
  style,
  backgroundColor,
  width,
  color,
  size,
  onPress,
  height,
}) {
  return (
    <View>
      <Button
        onPress={onPress}
        style={[
          styles.appBtnContainer,
          { backgroundColor: backgroundColor ? backgroundColor : c5 },
          { width: width ? width : 300 },
          { height: height ? height : 48 },
          style,
        ]}
      >
        <TextM
          color={color ? color : c1}
          size={size ? size : 17}
          style={styles.appBtnText}
        >
          {text}
        </TextM>
        {iconType ? (
          <Icon
            type={iconType}
            name={iconName}
            style={[
              styles.appBtnIcon,
              { fontSize: iconSize ? iconSize : 22 },
              { color: iconColor ? iconColor : c1 },
            ]}
          />
        ) : null}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  appBtnContainer: {
    elevation: 0,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  appBtnText: {},
  appBtnIcon: {},
});
