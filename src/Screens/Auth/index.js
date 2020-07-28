import React, { Component } from "react";

import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Platform,
} from "react-native";

import OneSignal from "react-native-onesignal";

import styles from "./styles";

class AuthScreen extends Component {
  state = {
    enterprise: null,
    loading: false,
    username: "",
    password: "",
  };

  async componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("dark-content");

      if (Platform.OS == "android") {
        StatusBar.setBackgroundColor("#f5f6fa");
        StatusBar.setTranslucent(true);
      }
    });

    if (await AsyncStorage.getItem("@ctracker:accessToken")) {
      return this.props.navigation.navigate("AppStack");
    }

    const enterprise = await AsyncStorage.getItem("@ctracker:enterprise");
    this.setState({ enterprise: JSON.parse(enterprise) });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  submitHandler = async () => {
    const { username, password, enterprise } = this.state;

    if (!username.length || !password.length) {
      return;
    }

    try {
      this.stateHandler("loading", true);

      const result = await fetch(
        `${enterprise.baseUrl}/metronic/api/auth.php?v_login=${username}&v_senha=${password}`,
        { method: "POST" }
      );
      let data = await result.text();

      if (Platform.OS === "android") {
        data = data.replace(/\r?\n/g, "").replace(/[\u0080-\uFFFF]/g, "");
      }

      data = JSON.parse(data);

      if (data.error === "S") {
        throw new Exception("Usuário e/ou senha invalido(s).");
      }

      await AsyncStorage.setItem("@ctracker:accessToken", data.h);

      await AsyncStorage.setItem(
        "@ctracker:user",
        JSON.stringify({
          id: data.id,
          name: data.nome,
          email: data.email,
        })
      );

      OneSignal.getPermissionSubscriptionState(async ({ userId }) => {
        if (!userId.length) return;

        await fetch(
          `${enterprise.baseUrl}/metronic/api/playerid.php?email=${data.email}&playerid=${userId}`,
          { method: "POST" }
        );
      });

      this.props.navigation.navigate("AppStack");
    } catch (error) {
      this.stateHandler("loading", false);
    }
  };

  stateHandler = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    const { enterprise, loading, username, password } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        {enterprise && (
          <ImageBackground
            resizeMode="contain"
            source={{ uri: enterprise.brand }}
            style={styles.brandContainer}
          />
        )}

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="seu usuário"
          returnKeyType="next"
          value={username}
          onChangeText={(username) => this.setState({ username })}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="sua senha secreta"
          secureTextEntry={true}
          returnKeyType="send"
          value={password}
          onChangeText={(password) => this.setState({ password })}
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => this.submitHandler()}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>ENTRAR</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default AuthScreen;
