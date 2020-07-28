import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    position: "relative",
  },

  header: {
    width: "100%",
    position: "absolute",
    marginTop: Platform.OS == "ios" ? 48 : 40,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  arrowBack: {
    width: 40,
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 100,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    elevation: 7,
    justifyContent: "center",
    alignItems: "center",
  },

  refresh: {
    width: 40,
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 100,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    elevation: 7,
    justifyContent: "center",
    alignItems: "center",
  },

  map: {
    width: "100%",
    height: 280,
  },

  anchorOn: {
    height: 40,
    justifyContent: "center",
    backgroundColor: "green",
    paddingHorizontal: 16,
  },

  anchorOff: {
    height: 40,
    justifyContent: "center",
    backgroundColor: "red",
    paddingHorizontal: 16,
  },

  anchorText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },

  details: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 16,
  },

  detailsItem: {
    paddingBottom: 16,
  },

  detailsItemTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  detailsItemDescription: {
    marginTop: 4,
    fontSize: 16,
  },
});
