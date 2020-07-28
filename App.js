import "./src/config/ReactotronConfig";

import React, { PureComponent } from "react";
import OneSignal from "react-native-onesignal";

import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/store";
class App extends PureComponent {
  constructor(props) {
    super(props);

    OneSignal.init("633ac943-115f-41e9-8f78-dc2825633adf");
    OneSignal.addEventListener("received", () => {});
    OneSignal.addEventListener("opened", () => {});
    OneSignal.addEventListener("ids", () => {});
    OneSignal.configure();
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("received", () => {});
    OneSignal.removeEventListener("opened", () => {});
    OneSignal.removeEventListener("ids", () => {});
  }

  render() {
    return (
      <Provider store={store}>
        <Navigation uriPrefix={"ctracker://"} />
      </Provider>
    );
  }
}

export default App;
