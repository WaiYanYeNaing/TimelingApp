import React from "react";
import { AppLoading } from "expo";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Find from "./screens/Find";
import SendSuccess from "./screens/SendSuccess";
import ReadMore from "./screens/ReadMore";
import Register from "./screens/Register";
import { Easing } from "react-native";

const Stack = createStackNavigator();
const closeConfig = {
  config: {
    duration: 300,
    easing: Easing.out(Easing.poly(4)),
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    //* Load Font
    await Font.loadAsync({
      Ubuntu: require("./assets/fonts/Ubuntu-Regular.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal-inverted",
            transitionSpec: {
              open: closeConfig,
              close: closeConfig,
            },
            // cardStyleInterpolator:
            //   CardStyleInterpolators.forScaleFromCenterAndroid,
            // ...TransitionPresets.ScaleFromCenterAndroid,
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Timeling",
              headerTitleAlign: "center",
              headerTintColor: "#00203FFF",
              headerStyle: { backgroundColor: "#fff" },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Timeling",
              headerTitleAlign: "center",
              headerTintColor: "#00203FFF",
              headerStyle: { backgroundColor: "#fff" },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Timeling",
              headerTitleAlign: "center",
              headerTintColor: "#00203FFF",
              headerStyle: { backgroundColor: "#fff" },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Find"
            component={Find}
            options={{
              title: "Timeling",
              headerTitleAlign: "center",
              headerTintColor: "#00203FFF",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: {
                fontSize: 18,
              },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ReadMore"
            component={ReadMore}
            options={{
              title: "Timeling",
              headerTitleAlign: "center",
              headerTintColor: "#00203FFF",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: {
                fontSize: 18,
              },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SendSuccess"
            component={SendSuccess}
            options={{
              title: "Timeling",
              headerTitleAlign: "center",
              headerTintColor: "#00203FFF",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: {
                fontSize: 18,
              },
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
