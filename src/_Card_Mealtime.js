import React from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { getItemAsync as retrieveItem } from "expo-secure-store";

import * as API from "./___API";
import Colors from "./___Colors";

const wait = function (timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default MealtimeCard = ({ data, setErrorMessage, onRemoveMeal }) => {
    const removeMeal = async function (mealId) {
        try {
            setErrorMessage("");

            const userId = await retrieveItem("userId");
            const userToken = await retrieveItem("userJWT");

            if (userId === null || userToken === null) throw "";

            let response = await API.getUserInfo(userId, userToken);

            if (response.error) throw "";

            // console.log(data.mealtimeId);
            // console.log(mealId);
            // console.log(userToken);

            response = await API.removeMealFromMealtime(
                data.mealtimeId,
                mealId,
                userToken
            );

            if (response.error) throw response.error;

            onRemoveMeal();
        } catch (error) {
            setErrorMessage(error.toString());
        }
    };

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
    const renderMealDelete = ({ item }, rowMap) => {
        return (
            <Pressable
                onPress={() =>
                    Alert.alert("Remove " + item.Name + "?", "", [
                        {
                            text: "Remove",
                            onPress: () => removeMeal(item._id),
                        },
                        {
                            text: "Cancel",
                            onPress: () => rowMap[item._id].closeRow(),
                        },
                    ])
                }
                style={styles.mealDelete}
            >
                <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.card}>
            <Text style={styles.date}>{data.Date.substring(0, 10)}</Text>
            <Text style={styles.totalCalories}>
                Total calories: {data.totalCalCount}
            </Text>
            <Text style={styles.totalNutrients}>
                Total Fat: {data.totalFatCount}g
            </Text>
            <Text style={styles.totalNutrients}>
                Total Sodium: {data.totalSodiumCount}mg
            </Text>
            <Text style={styles.totalNutrients}>
                Total Carbs: {data.totalCarbCount}g
            </Text>
            <Text style={styles.totalNutrients}>
                Total Protein: {data.totalProteinCount}g
            </Text>
            <Text style={styles.sectionTitle}>Food consumed:</Text>
            <SwipeListView
                data={data.Meals}
                renderItem={renderMeal}
                renderHiddenItem={renderMealDelete}
                onRowOpen={(rowKey, rowMap) => {
                    wait(1500).then(() => {
                        rowMap[rowKey].closeRow();
                    });
                }}
                rightOpenValue={-75}
                friction={20}
                closeOnScroll={false}
                disableRightSwipe={true}
                keyExtractor={(item) => item._id}
                style={styles.mealList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.dark_blue,
        flex: 1,
        margin: 10,
        padding: 16,
        width: "80%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 10,
    },
    date: {
        marginBottom: 10,
        fontSize: 16,
        color: "green",
    },
    totalCalories: {
        fontSize: 20,
        textAlign: "center",
        color: "#ADFF2F",
        fontWeight: "500",
    },
    totalNutrients: {
        color: "white",
    },
    sectionTitle: {
        marginTop: 10,
        fontSize: 16,
        color: "green",
    },
    mealList: {
        marginTop: 8,
        borderRadius: 10,
        alignSelf: "stretch",
        backgroundColor: "lightgreen",
    },
    meal: {
        paddingVertical: 6,
        paddingRight: "25%",
        marginLeft: "25%",
        // borderWidth: 1,
        borderRadius: 10,
        alignSelf: "stretch",
        alignItems: "center",
        backgroundColor: "lightgreen",
    },
    mealDelete: {
        borderRadius: 10,
        width: "70%",
        height: "100%",
        padding: 10,
        alignSelf: "flex-end",
        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: Colors.error,
    },
    deleteText: {
        color: "white",
    },
    mealName: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
    nutrients: {},
});
