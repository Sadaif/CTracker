import React, { Component } from "react";
import { View, StatusBar, AsyncStorage, Platform } from "react-native";
import { WebView } from "react-native-webview";

import styles from "./styles";

import Header from "../../Components/Header";

class ReportsScreen extends Component {
  static navigationOptions = {
    drawerLabel: "Relatórios",
  };

  state = {
    accessToken: null,
  };

  async componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("dark-content");

      if (Platform.OS == "android") {
        StatusBar.setBackgroundColor("#f5f6fa");
        StatusBar.setTranslucent(true);
      }
    });

    const accessToken = await AsyncStorage.getItem("@ctracker:accessToken");

    if (accessToken) {
      this.setState({ accessToken });
    }
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Relatórios" {...this.props} />

        <View style={styles.webview}>
          <WebView
            source={{
              uri: `https://api.ctracker.com.br/metronic/api/relatorio-posicao.php?h=${this.state.accessToken}`,
            }}
            useWebKit={true}
          />
        </View>
      </View>
    );
  }
}

export default ReportsScreen;
