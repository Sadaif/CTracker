import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 24,
    paddingTop: Platform.OS == "ios" ? 40 : 24
  },

  alertContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 4,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    elevation: 2
  }
});
