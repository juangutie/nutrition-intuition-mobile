import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HistoryTab from "./_Tab_History";
import DashboardTab from "./_Tab_Dashboard";
import ProfileTab from "./_Tab_Profile";

const Tab = createBottomTabNavigator();

export default ____HomeScreen = () => {
    return (
        <Tab.Navigator initialRouteName="Dashboard">
            <Tab.Screen name="History" component={HistoryTab} />
            <Tab.Screen name="Dashboard" component={DashboardTab} />
            <Tab.Screen name="Profile" component={ProfileTab} />
        </Tab.Navigator>
    );
};
