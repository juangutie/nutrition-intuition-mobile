import React, { useState } from "react";
import { StyleSheet, Pressable, Modal } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import LoginRegisterScreen from "./_Screen_LoginRegister";
import HomeScreen from "./_Screen_Home";
import AddMealModal from "./_Modal_AddMeal";

const Stack = createStackNavigator();

/*
    TODO:
        Header:
            • Add Quick Add from existing meal
        History:
            • Swipe to delete meal
        Profile:
            • Add Edit Personal Info Button/Modal
            • Add Edit Nutrition Goal Button/Modal
            • Add Password Reset Button/Modal
    
    STRETCH:
        • Swipe between screens
        Dashboard:
            • Nutrient Pie Chart
*/

export default function App() {
    const [addMealModalVisible, setAddMealModalVisible] = useState(false);
    const [reloadDataEvent, setReloadDataEvent] = useState(false);

    return (
        <NavigationContainer>
            <Modal
                visible={addMealModalVisible}
                transparent={true}
                animationType="slide"
            >
                <AddMealModal
                    onHide={() => {
                        setAddMealModalVisible(false);
                        setReloadDataEvent(!reloadDataEvent);
                    }}
                />
            </Modal>
            <Stack.Navigator initialRouteName="LoginRegister">
                <Stack.Screen
                    name="LoginRegister"
                    component={LoginRegisterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    // component={HomeScreen}
                    options={{
                        title: "Nutrition Intuition",
                        headerTintColor: "green",
                        headerTitleStyle: styles.headerTitle,
                        headerLeft: () => null,
                        headerRight: () => (
                            <Pressable
                                onPress={() => setAddMealModalVisible(true)}
                            >
                                <MaterialIcons
                                    name="add-circle"
                                    size={32}
                                    color="green"
                                    style={styles.addIcon}
                                />
                            </Pressable>
                        ),
                    }}
                >
                    {(props) => (
                        <HomeScreen
                            reloadDataEvent={reloadDataEvent}
                            onShowQuickAdd={() => setAddMealModalVisible(true)}
                            {...props}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerTitle: { fontSize: 24 },
    addIcon: { padding: 10 },
});
