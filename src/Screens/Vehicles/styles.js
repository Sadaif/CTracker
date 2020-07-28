import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 24,
    paddingTop: Platform.OS == "ios" ? 40 : 24,
  },

  vehicle: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 4,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    elevation: 2,
  },

  vehicleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#005580",
  },

  vehicleAddress: {
    fontSize: 16,
    color: "#4d4d4d",
  },

  vehicleDetails: {
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    borderTopWidth: 1,
    marginTop: 12,
    paddingTop: 12,
  },

  vehicleDetailsItem: {
    fontSize: 16,
  },
});
