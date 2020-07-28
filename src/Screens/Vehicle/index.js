import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Linking,
  AsyncStorage,
  Platform,
  ToastAndroid,
} from "react-native";

import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./styles";

class VehiclePage extends Component {
  static navigationOptions = {
    drawerLabel: () => null,
  };

  state = {
    loading: false,
    vehicle: null,
    enterprise: null,
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener(
      "didFocus",
      async () => {
        StatusBar.setBarStyle("dark-content");

        if (Platform.OS == "android") {
          StatusBar.setBackgroundColor("transparent");
          StatusBar.setTranslucent(true);
        }

        const enterprise = await AsyncStorage.getItem("@ctracker:enterprise");

        this.setState(
          { vehicle: null, enterprise: JSON.parse(enterprise) },
          () => {
            this.refreshHandler();
          }
        );
      }
    );
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  refreshHandler = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("@ctracker:accessToken");

      const fetchUrl = `${
        this.state.enterprise.baseUrl
        }/metronic/api/get.veiculos.php?h=${accessToken}&v_id_bem=${this.props.navigation.getParam(
          "vehicleId"
        )}`;

      const result = await fetch(fetchUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let data = await result.text();

      if (Platform.OS === "android") {
        data = data.replace(/\r?\n/g, "").replace(/[\u0080-\uFFFF]/g, "");
      }

      const vehicles = JSON.parse(data);

      this.setState({ vehicle: vehicles[0] });
    } catch (error) { }
  };

  sendCommand = async (command) => {
    this.setState({ loading: true });

    try {
      const accessToken = await AsyncStorage.getItem("@ctracker:accessToken");

      const formData = new FormData();
      formData.append("h", accessToken);
      formData.append("id", this.state.vehicle.id_bem);
      formData.append("qual", command);

      await fetch(
        `${this.state.enterprise.baseUrl}/metronic/api/ancorar.veiculo.php`,
        {
          body: formData,
          method: "POST",
        }
      );

      this.setState({
        vehicle: { ...this.state.vehicle, ancora: `${command}` },
      });

      this.refreshHandler();

      ToastAndroid.show("Comando enviado com sucesso.", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(
        "Não foi possivel enviar o comando. Verifique sua conexão com a internet!",
        ToastAndroid.SHORT
      );
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { vehicle, loading } = this.state;

    if (!vehicle) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#414141" style={{ flex: 1 }} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: parseFloat(vehicle.lat),
            longitude: parseFloat(vehicle.lng),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(vehicle.lat),
              longitude: parseFloat(vehicle.lng),
            }}
            title={vehicle.name}
          >
            <ImageBackground
              source={{ uri: vehicle.imagem_icone }}
              resizeMode="contain"
              style={{ width: 48, height: 32 }}
            />
          </Marker>
        </MapView>

        {/* <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.arrowBack}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="md-arrow-back" size={30} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.refresh}
            onPress={this.refreshHandler}
          >
            <Icon name="md-refresh" size={30} />
          </TouchableOpacity>
        </View> */}

        <TouchableOpacity
          style={vehicle.ancora == "1" ? styles.anchorOn : styles.anchorOff}
          activeOpacity={0.7}
          onPress={() => this.sendCommand(vehicle.ancora == "1" ? 0 : 1)}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
              <Text style={styles.anchorText}>
                {vehicle.ancora == "1" ? "Remover âncora" : "Ancorar"}
              </Text>
            )}
        </TouchableOpacity>

        <ScrollView style={styles.details}>
          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemTitle}>Última posição</Text>
            <Text style={styles.detailsItemDescription}>{vehicle.dia}</Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemTitle}>Localização</Text>
            <Text style={styles.detailsItemDescription}>{vehicle.address}</Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemTitle}>Odometro Km</Text>
            <Text style={styles.detailsItemDescription}>
              {vehicle.km_rodado}
            </Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemTitle}>Tanque Litros</Text>
            <Text style={styles.detailsItemDescription}>
              {vehicle.combustivel}
            </Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemTitle}>Placa</Text>
            <Text style={styles.detailsItemDescription}>{vehicle.name}</Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemTitle}>Imei / ID</Text>
            <Text style={styles.detailsItemDescription}>
              {vehicle.imei} / {vehicle.id_bem}
            </Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemTitle}>Velocidade</Text>
            <Text style={styles.detailsItemDescription}>
              {vehicle.speed} km/h
            </Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemTitle}>Bateria</Text>
            <Text style={styles.detailsItemDescription}>
              {vehicle.voltagem_bateria}
            </Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemTitle}>Bateria Interna</Text>
            <Text style={styles.detailsItemDescription}>
              {vehicle.bateria_interna}
            </Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemTitle}>RPM</Text>
            <Text style={styles.detailsItemDescription}>{vehicle.rpm}</Text>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemTitle}>Latitude / Longitude</Text>
            <View style={{}}>
              <Text style={styles.detailsItemDescription}>
                {vehicle.lat} / {vehicle.lng}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  const scheme = Platform.select({
                    ios: "maps:0,0?q=",
                    android: "geo:0,0?q=",
                  });

                  const latLng = `${vehicle.lat},${vehicle.lng}`;

                  const url = Platform.select({
                    ios: `${scheme}${vehicle.name}@${latLng}`,
                    android: `${scheme}${latLng}(${vehicle.name})`,
                  });

                  Linking.openURL(url);
                }}
              >
                <Text>Visualizar no mapa</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemTitle}>Tipo de Veículo</Text>
            <Text style={styles.detailsItemDescription}>{vehicle.tipo}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default VehiclePage;
