import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
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
    const [calorieGoal, setCalorieGoal] = useState("");
    const [todayMealtime, setTodayMealtime] = useState(undefined);

    const loadInitialData = async function () {
        try {
            const id = await retrieveItem("userId");
            const token = await retrieveItem("userJWT");

            if (id === null || token === null) throw "";

            let response = await API.getUserInfo(id, token);

            if (response.error) throw "";

            setFirstName(response.firstName);
            setCalorieGoal(response.calorieGoal);
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
            setCalorieGoal(response.calorieGoal);

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
        loadInitialData();
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
                <FlatList
                    ListHeaderComponent={
                        <View style={styles.listheader}>
                            <Text style={styles.sectionTitle}>
                                Total calories: {todayMealtime.totalCal}
                            </Text>
                            <Text style={styles.calorieGoal}>
                                (Your daily goal is: {calorieGoal})
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
                            <Text style={styles.sectionTitle}>
                                Today's Meals:
                            </Text>
                        </View>
                    }
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
    listheader: {
        alignItems: "center",
    },
    sectionTitle: {
        marginTop: 15,
        fontSize: 32,
        color: "darkgreen",
        fontWeight: "500",
    },
    calorieGoal: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: "500",
        fontStyle: "italic",
        color: "black",
    },
    totalnutrients: {
        padding: 2,
        fontSize: 22,
        color: "#00008B",
        fontWeight: "500",
    },
    mealList: {
        alignSelf: "stretch",
    },
    meal: {
        width: "70%",
        margin: 6,
        padding: 6,
        borderRadius: 10,
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "lightgreen",
    },
    mealName: {
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
    },
    nutrients: {
        // fontSize: 16,
        // color: "#6495ED",
    },
    button: {
        backgroundColor: "green",
    },
});
