import { createSwitchNavigator, createAppContainer } from "react-navigation";

import WelcomeScreen from "../Screens/Welcome";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const switchNavigator = createSwitchNavigator(
  {
    Welcome: WelcomeScreen,
    AuthStack,
    AppStack,
  },
  {
    initialRouteName: "Welcome",
  }
);

export default createAppContainer(switchNavigator);
