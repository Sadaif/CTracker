import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

import styles from "./styles";

const Header = (props) => (
  <View style={styles.container}>
    <View style={styles.leftContainer}>
      <TouchableOpacity
        onPress={() => props.navigation.toggleDrawer()}
        activeOpacity={0.7}
        hitSlop={{ top: 3, left: 8, bottom: 3, right: 8 }}
        style={styles.menu}
      >
        <Icon name="menu" size={30} style={{ marginBottom: -4 }} />
      </TouchableOpacity>

      <Text style={styles.title}>{props.title}</Text>
    </View>

    <View style={styles.rightContainer}>{props.children}</View>
  </View>
);

export default Header;
