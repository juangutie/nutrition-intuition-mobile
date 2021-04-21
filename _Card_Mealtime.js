import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import Colors from "./___Colors";

export default MealtimeCard = ({ data }) => {
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
            <FlatList
                data={data.Meals}
                renderItem={renderMeal}
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
        padding: 6,
        alignItems: "center",
    },
    mealName: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
    nutrients: {},
});
