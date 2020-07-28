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
} from "react-native";

import styles from "./styles";

import Header from "../../Components/Header";

class VehiclesPage extends Component {
  static navigationOptions = {
    drawerLabel: "Meus veículos",
  };

  state = {
    loading: false,
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
        //hacker
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

      data = JSON.parse(data);

      this.setState({ vehicles: data });
    } catch (error) {
      //alert(error)
    } finally {
      this.setState({ loading: false });
    }
  };

  openVehicle = (vehicleId) => {
    this.props.navigation.navigate("Vehicle", { vehicleId });
  };

  renderVehicle = (vehicle) => {
    return (
      <TouchableOpacity
        style={styles.vehicle}
        key={vehicle.id_bem}
        activeOpacity={0.7}
        onPress={() => this.openVehicle(vehicle.id_bem)}
      >
        <Text style={styles.vehicleTitle}>{vehicle.name}</Text>
        <Text style={styles.vehicleAddress}>{vehicle.address}</Text>

        <View style={styles.vehicleDetails}>
          <Text style={styles.vehicleDetailsItem}>
            Última posição: {vehicle.dia}
          </Text>
          <Text style={styles.vehicleDetailsItem}>
            Ligado: {vehicle.ligado == "N" ? "Não" : "Sim"}
          </Text>
          <Text style={styles.vehicleDetailsItem}>
            Ancorado: {vehicle.ancora == "0" ? "Não" : "Sim"}
          </Text>
          <Text style={styles.vehicleDetailsItem}>
            Velocidade: {vehicle.speed} Km/h
          </Text>
          <Text style={styles.vehicleDetailsItem}>
            Odômetro Km: {vehicle.km_rodado}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { loading, vehicles } = this.state;

    return (
      <View style={styles.container}>
        <Header title="Meus veículos" {...this.props} />

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

export default VehiclesPage;
