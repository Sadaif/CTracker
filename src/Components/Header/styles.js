import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },

  leftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  rightContainer: {
    flex: 1,
    paddingLeft: 16,
  },

  menu: {
    marginRight: 20,
    display: "flex",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#ff9933",
  },
});
