import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { getItemAsync as retrieveItem } from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";

import * as API from "./___API";
import Colors from "./___Colors";
import Screen from "./__Screen.js";
import Button from "./__Button";
import ErrorText from "./__ErrorText";

export default DashboardTab = ({ reloadDataEvent, onShowQuickAdd }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [todayMealtime, setTodayMealtime] = useState(undefined);

    const loadFirstName = async function () {
        try {
            const id = await retrieveItem("userId");
            const token = await retrieveItem("userJWT");

            if (id === null || token === null) throw "";

            let response = await API.getUserInfo(id, token);

            if (response.error) throw "";

            setFirstName(response.firstName);
        } catch (error) {
            setErrorMessage(error.toString());
        }
    };

    const loadScreenData = async function () {
        try {
            const userId = await retrieveItem("userId");
            const userToken = await retrieveItem("userJWT");

            if (userId === null || userToken === null) throw "";

            let response = await API.getUserInfo(userId, userToken);

            if (response.error) throw "";

            setFirstName(response.firstName);

            response = await API.mealtimeCheck(userId, userToken);

            let mealtimeId = response.id;
            let mealtimeToken = response.token.accessToken;

            if (mealtimeId === -1) {
                setTodayMealtime(undefined);
            } else {
                response = await API.viewMealTime(mealtimeId, mealtimeToken);

                if (response.error) throw "";

                setTodayMealtime(response);
            }
        } catch (error) {
            setErrorMessage(error.toString());
        }
    };

    useEffect(() => {
        loadFirstName();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadScreenData();
        }, [reloadDataEvent])
    );

    const renderMeal = ({ item }) => {
        return (
            <View style={styles.meal}>
                <Text style={styles.mealName}>{item.Name}</Text>
                <Text style={styles.nutrients}>{item.Calories} calories</Text>
                <Text style={styles.nutrients}>{item.Protein}g Protein</Text>
                <Text style={styles.nutrients}>{item.TotalFat}g Fat</Text>
                <Text style={styles.nutrients}>{item.TotalCarbs}g Carbs</Text>
            </View>
        );
    };

    if (todayMealtime !== undefined)
        return (
            <Screen style={styles.screen}>
                <Text style={styles.heading}>Hello, {firstName}</Text>
                <Text style={styles.subheading}>Here are today's stats:</Text>
                <Text style={styles.sectionTitle}>
                    Total calories: {todayMealtime.totalCal}
                </Text>
                <Text style={styles.totalnutrients}>
                    Total Fat: {todayMealtime.totalFat}g
                </Text>
                <Text style={styles.totalnutrients}>
                    Total Sodium: {todayMealtime.totalSodium}mg
                </Text>
                <Text style={styles.totalnutrients}>
                    Total Carbs: {todayMealtime.totalCarbs}g
                </Text>
                <Text style={styles.totalnutrients}>
                    Total Protein: {todayMealtime.totalProtein}g
                </Text>
                <Text style={styles.sectionTitle}>Today's Meals:</Text>
                <FlatList
                    data={todayMealtime.meals}
                    renderItem={renderMeal}
                    keyExtractor={(item) => item._id}
                    style={styles.mealList}
                />
                <ErrorText message={errorMessage} />
            </Screen>
        );
    else
        return (
            <Screen style={styles.screen}>
                <Text style={styles.heading}>Hello, {firstName}</Text>
                <Text style={styles.subheading_red}>
                    No meals today, go add some!
                </Text>
                <Button
                    title="Add new Meal"
                    onPress={onShowQuickAdd}
                    style={styles.button}
                />
                <ErrorText message={errorMessage} />
            </Screen>
        );
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: "flex-start",
        padding: 20,
    },
    heading: {
        fontSize: 32,
    },
    subheading: {
        fontSize: 22,
        marginBottom: 10,
    },
    subheading_red: {
        fontSize: 22,
        marginBottom: 10,
        color: Colors.error,
        fontWeight: "500",
    },
    sectionTitle: {
        marginTop: 15,
        fontSize: 32,
        color: "darkgreen",
        fontWeight: "500",
    },
    totalnutrients: {
        padding: 2,
        fontSize: 22,
        color: "#00008B",
        fontWeight: "500",
    },
    mealList: {
        width: "80%",
    },
    meal: {
        padding: 6,
        alignItems: "center",
    },
    mealName: {
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
    },
    nutrients: {
        fontSize: 16,
        color: "#6495ED",
    },
    button: {
        backgroundColor: "green",
    },
});
