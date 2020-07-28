import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";

class LogoutScreen extends Component {
  static navigationOptions = {
    drawerLabel: "Sair",
  };

  async componentDidMount() {
    AsyncStorage.clear().then(() => {
      this.props.navigation.navigate("Welcome");
    });
  }

  render() {
    return <View />;
  }
}

export default LogoutScreen;
