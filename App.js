import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginRegisterScreen from "./_Screen_LoginRegister";
import HomeScreen from "./_Screen_Home";

const Stack = createStackNavigator();

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
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: "Nutrition Intuition",
                        headerTintColor: "green",
                        headerTitleStyle: styles.header,
                        headerLeft: () => null,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    header: { fontSize: 24 },
});
