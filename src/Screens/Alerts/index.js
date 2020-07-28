import React, { Component } from "react";

import {
  View,
  Text,
  FlatList,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";

import styles from "./styles";

import Header from "../../Components/Header";

class AlertsScreen extends Component {
  state = {
    loading: true,
    enterprise: null,
    alerts: [],
  };

  async componentDidMount() {
    const enterprise = await AsyncStorage.getItem("@ctracker:enterprise");

    this.setState({ enterprise: JSON.parse(enterprise) }, () => {
      this.getAlerts();
    });
  }

  getAlerts = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("@ctracker:accessToken");

      const result = await fetch(
        `${this.state.enterprise.baseUrl}/metronic/api/get.alertas.php?h=${accessToken}`
      );

      let data = await result.text();

      if (Platform.OS === "android") {
        data = data.replace(/\r?\n/g, "").replace(/[\u0080-\uFFFF]/g, "");
      }

      this.setState({ alerts: JSON.parse(data) });
    } catch (error) {
    } finally {
      this.setState({ loading: false });
    }
  };

  renderAlert = ({ item }) => {
    return (
      <View style={styles.alertContainer}>
        <Text style={{ fontSize: 16, color: "#005580" }}>{item.msg}</Text>
      </View>
    );
  };

  render() {
    const { loading, alerts } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#f5f6fa"
          barStyle="dark-content"
          translucent
        />

        <Header title="Alertas" {...this.props} />

        {loading ? (
          <ActivityIndicator size="large" color="#414141" style={{ flex: 1 }} />
        ) : (
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            data={alerts}
            renderItem={this.renderAlert}
          />
        )}
      </View>
    );
  }
}

AlertsScreen.navigationOptions = {
  drawerLabel: "Alertas",
};

export default AlertsScreen;
