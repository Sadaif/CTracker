import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  AsyncStorage,
  Platform,
  ToastAndroid,
} from "react-native";

import styles from "./styles";

import Header from "../../Components/Header";

class CommandsPage extends Component {
  static navigationOptions = {
    drawerLabel: "Enviar comandos",
  };

  state = {
    loading: false,
    loadingCommand: null,
    enterprise: null,
    vehicles: [],
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener(
      "didFocus",
      async () => {
        StatusBar.setBarStyle("dark-content");

        if (Platform.OS == "android") {
          StatusBar.setBackgroundColor("#f5f6fa");
          StatusBar.setTranslucent(true);
        }

        const enterprise = await AsyncStorage.getItem("@ctracker:enterprise");

        this.setState({ enterprise: JSON.parse(enterprise) }, () => {
          this.getVehicles();
        });
      }
    );
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  getVehicles = async () => {
    this.setState({ loading: true });

    try {
      const accessToken = await AsyncStorage.getItem("@ctracker:accessToken");

      const result = await fetch(
        `${this.state.enterprise.baseUrl}/metronic/api/get.veiculos.php?h=${accessToken}`
      );

      let data = await result.text();

      if (Platform.OS === "android") {
        data = data.replace(/\r?\n/g, "").replace(/[\u0080-\uFFFF]/g, "");
      }

      this.setState({ vehicles: JSON.parse(data) });
    } catch (error) {
    } finally {
      this.setState({ loading: false });
    }
  };

  sendCommand = async ({ imei }, command) => {
    this.setState({ loadingCommand: `${command}-${imei}` });

    try {
      const accessToken = await AsyncStorage.getItem("@ctracker:accessToken");

      const formData = new FormData();
      formData.append("h", accessToken);
      formData.append("imei", imei);
      formData.append("command", command);

      await fetch(
        `${this.state.enterprise.baseUrl}/metronic/api/send.command.php`,
        {
          body: formData,
          method: "POST",
        }
      );

      ToastAndroid.show("Comando enviado com sucesso.", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(
        "Não foi possivel enviar o comando. Verifique sua conexão com a internet!",
        ToastAndroid.SHORT
      );
    } finally {
      this.setState({ loadingCommand: null });
    }
  };

  renderVehicle = (vehicle) => {
    const { loadingCommand } = this.state;

    return (
      <View style={styles.vehicle} key={vehicle.id_bem}>
        <Text style={styles.vehicleTitle}>{vehicle.name}</Text>
        <Text style={styles.vehicleAddress}>{vehicle.address}</Text>

        <View style={styles.vehicleActions}>
          <TouchableOpacity
            style={styles.vehicleActionsBlock}
            activeOpacity={0.7}
            onPress={() => this.sendCommand(vehicle, "block")}
          >
            {loadingCommand == null ||
            loadingCommand != `block-${vehicle.imei}` ? (
              <Text
                style={{ fontSize: 16, color: "white", textAlign: "center" }}
              >
                Bloquear
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#ffffff" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.vehicleActionsUnBlock}
            activeOpacity={0.7}
            onPress={() => this.sendCommand(vehicle, "unblock")}
          >
            {loadingCommand == null ||
            loadingCommand != `unblock-${vehicle.imei}` ? (
              <Text
                style={{ fontSize: 16, color: "white", textAlign: "center" }}
              >
                Desbloquear
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#ffffff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { loading, vehicles } = this.state;

    return (
      <View style={styles.container}>
        <Header title="Enviar comandos" {...this.props} />

        {loading ? (
          <ActivityIndicator size="large" color="#414141" style={{ flex: 1 }} />
        ) : (
          <ScrollView>
            {vehicles.map((vehicle) => this.renderVehicle(vehicle))}
          </ScrollView>
        )}
      </View>
    );
  }
}

export default CommandsPage;
