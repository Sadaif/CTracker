import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  backgroundImage: {
    flex: 1
  },

  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingBottom: 64,
    backgroundColor: "rgba(25, 42, 86, 0.5)",
    display: "flex",
    justifyContent: "flex-end"
  },

  description: {
    fontSize: 40,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 128
  },

  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#ffffff",
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
