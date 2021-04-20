import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import HistoryTab from "./_Tab_History";
import DashboardTab from "./_Tab_Dashboard";
import ProfileTab from "./_Tab_Profile";

const Tab = createBottomTabNavigator();

export default ____HomeScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            tabBarOptions={{ activeTintColor: "green" }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    switch (route.name) {
                        case "History":
                            return (
                                <MaterialIcons
                                    name="history"
                                    size={size}
                                    color={color}
                                />
                            );
                        case "Dashboard":
                            return (
                                <MaterialIcons
                                    name="dashboard"
                                    size={size}
                                    color={color}
                                />
                            );
                        case "Profile":
                            return (
                                <MaterialIcons
                                    name="person"
                                    size={size}
                                    color={color}
                                />
                            );
                    }
                },
            })}
        >
            <Tab.Screen name="History" component={HistoryTab} />
            <Tab.Screen name="Dashboard" component={DashboardTab} />
            <Tab.Screen name="Profile" component={ProfileTab} />
        </Tab.Navigator>
    );
};
