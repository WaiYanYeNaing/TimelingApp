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
import { Easing, AsyncStorage } from "react-native";
import Profile from "./screens/Profile";
import SendLetter from "./screens/SendLetter";
import Test from "./screens/Test";
import AddFriend from "./screens/AddFriend";
import Detail from "./screens/Detail";
import FindRandom from "./screens/FindRandom";

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
      // initialRoute: "Login",
    };
  }

  async componentDidMount() {
    //* Load Font
    await Font.loadAsync({
      Ubuntu: require("./assets/fonts/Ubuntu-Regular.ttf"),
      UbuntuM: require("./assets/fonts/Ubuntu-Medium.ttf"),
      UbuntuB: require("./assets/fonts/Ubuntu-Bold.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
    // const val = await AsyncStorage.getItem("token");
    // if (val) this.setState({ initialRoute: "Home" });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName={this.state.initialRoute}
          screenOptions={{
            // gestureEnabled: true,
            // gestureDirection: "horizontal-inverted",
            // transitionSpec: {
            //   open: closeConfig,
            //   close: closeConfig,
            // },
            cardStyleInterpolator:
              CardStyleInterpolators.forScaleFromCenterAndroid,
            ...TransitionPresets.ScaleFromCenterAndroid,
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
            name="SendLetter"
            component={SendLetter}
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
            name="FindRandom"
            component={FindRandom}
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
          <Stack.Screen
            name="Profile"
            component={Profile}
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
            name="AddFriend"
            component={AddFriend}
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
            name="Detail"
            component={Detail}
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
