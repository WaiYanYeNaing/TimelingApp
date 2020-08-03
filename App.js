import React from "react";
import { AppLoading } from "expo";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Find from "./screens/Find";
import SendSuccess from "./screens/SendSuccess";
import ReadMore from "./screens/ReadMore";

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      // <Container>
      //   <Text>Open up App.js to start working on your app!</Text>
      // </Container>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "PostMan",
              headerTitleAlign: "center",
              headerTintColor: "#00203FFF",
              headerStyle: { backgroundColor: "#fff" },
            }}
          />
          <Stack.Screen
            name="Find"
            component={Find}
            options={{
              title: "PostMan",
              headerTitleAlign: "center",
              headerTintColor: "#00203FFF",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: {
                fontSize: 18,
              },
            }}
          />
          <Stack.Screen
            name="ReadMore"
            component={ReadMore}
            options={{
              title: "PostMan",
              headerTitleAlign: "center",
              headerTintColor: "#00203FFF",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: {
                fontSize: 18,
              },
            }}
          />
          <Stack.Screen
            name="SendSuccess"
            component={SendSuccess}
            options={{
              title: "PostMan",
              headerTitleAlign: "center",
              headerTintColor: "#00203FFF",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: {
                fontSize: 18,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
