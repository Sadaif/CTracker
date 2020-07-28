import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  brandContainer: {
    width: 256,
    height: 256,
    marginBottom: 32
  },

  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#c8d6e5",
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 4,
    fontSize: 16
  },

  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#0097e6",
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#ffffff",
    fontSize: Platform.OS == "ios" ? 14 : 16,
    fontWeight: Platform.OS == "ios" ? "600" : "400"
  }
});
