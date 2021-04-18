import "react-native-gesture-handler";
import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginRegisterScreen from "./____LoginRegisterScreen";
import Screen from "./__Screen";

const Stack = createStackNavigator();

const DashboardScreenTemp = () => {
    return (
        <Screen>
            <Text>WIP</Text>
        </Screen>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginRegister">
                <Stack.Screen
                    name="LoginRegister"
                    component={LoginRegisterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={DashboardScreenTemp}
                    options={{
                        title: "Nutrition Intuition",
                        headerLeft: () => null,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
