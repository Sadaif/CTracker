import { createDrawerNavigator } from "react-navigation";
import DrawerContent from "../Components/Drawer";

import VehiclesScreen from "../Screens/Vehicles";
import VehicleScreen from "../Screens/Vehicle";
import ReportsScreen from "../Screens/Reports";
import AlertsScreen from "../Screens/Alerts";
import CommandsScreen from "../Screens/Commands";
import LogoutScreen from "../Screens/Logout";

export default createDrawerNavigator(
  {
    Vehicles: VehiclesScreen,
    Vehicle: VehicleScreen,
    Reports: ReportsScreen,
    Alerts: AlertsScreen,
    Commands: CommandsScreen,
    Logout: LogoutScreen,
  },
  {
    initialRouteName: "Vehicles",
    contentComponent: DrawerContent,
  }
);
