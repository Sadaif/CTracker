import { createSwitchNavigator } from "react-navigation";

import AuthScreen from "../Screens/Auth";

export default createSwitchNavigator(
  {
    AuthScreen,
  },
  {
    initialRouteName: "AuthScreen",
  }
);
