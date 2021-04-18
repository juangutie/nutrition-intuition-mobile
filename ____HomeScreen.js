import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ____HistoryScreen from "./____HistoryScreen";
import ____DashboardScreen from "./____DashboardScreen";
import ____ProfileScreen from "./____ProfileScreen";

const Tab = createBottomTabNavigator();

export default ____HomeScreen = () => {
    return (
        <Tab.Navigator initialRouteName="Dashboard">
            <Tab.Screen name="History" component={____HistoryScreen} />
            <Tab.Screen name="Dashboard" component={____DashboardScreen} />
            <Tab.Screen name="Profile" component={____ProfileScreen} />
        </Tab.Navigator>
    );
};
