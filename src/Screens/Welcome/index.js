import React, { Component } from "react";
import { connect } from "react-redux";

import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  Platform,
  Alert,
} from "react-native";

import styles from "./styles";

class WelcomeScreen extends Component {
  state = {
    loading: false,
    code: "",
  };

  async componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("light-content");

      if (Platform.OS == "android") {
        StatusBar.setBackgroundColor("transparent");
        StatusBar.setTranslucent(true);
      }
    });

    const enterprise = await AsyncStorage.getItem("@ctracker:enterprise");

    if (enterprise) {
      this.props.defineEnterprise(JSON.parse(enterprise));

      return this.props.navigation.navigate("AuthStack");
    }
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  submitHandler = async () => {
    const { code } = this.state;

    if (!code.length) {
      return;
    }

    try {
      this.stateHandler("loading", true);

      const result = await fetch(
        `https://api.ctracker.com.br/metronic/api/enterprise.php?id=${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = await result.text();

      // Alert.alert(result);

      if (Platform.OS === "android") {
        data = data.replace(/\r?\n/g, "").replace(/[\u0080-\uFFFF]/g, "");
      }

      data = JSON.parse(data);

      if (data.error === "S") {
        throw new Exception("Empresa não encontrada.");
      }

      const formatedData = {
        name: data.nome,
        brand: data.logo,
        clientId: data.id_cliente,
        baseUrl: data.url_api,
      };

      await AsyncStorage.setItem(
        "@ctracker:enterprise",
        JSON.stringify(formatedData)
      );

      this.props.defineEnterprise(formatedData);
      this.props.navigation.navigate("AuthStack");
    } catch (error) {
      Alert.alert(error);
      this.stateHandler("loading", false);
      this.stateHandler("code", "");
    }
  };

  stateHandler = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    const { loading, code } = this.state;

    return (
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/images/welcome-background.jpg")}
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <View style={styles.container}>
            <Text style={styles.description}>
              A forma mais simples de rastrear seus veículos.
            </Text>

            <View>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="código da empresa"
                value={code}
                onChangeText={(code) => this.setState({ code })}
              />

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => this.submitHandler()}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>DEFINIR EMPRESA</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  defineEnterprise: (enterprise) =>
    dispatch({
      type: "DEFINE_ENTERPRISE",
      payload: enterprise,
    }),
});

export default connect(null, mapDispatchToProps)(WelcomeScreen);
