import React, { useState, useEffect } from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import {
    setItemAsync as storeItem,
    getItemAsync as retrieveItem,
    deleteItemAsync as deleteItem,
} from "expo-secure-store";

import * as API from "./___API";
import Screen from "./__Screen.js";
import MealtimeCard from "./_Card_Mealtime";

// const MEALTIMES = [
//     {
//         id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//         title: "First Mealtime",
//     },
//     {
//         id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//         title: "Second Mealtime",
//     },
//     {
//         id: "58694a0f-3da1-471f-bd96-145571e29d72",
//         title: "Third Mealtime",
//     },
// ];

export default DashboardTab = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [firstName, setFirstName] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const id = await retrieveItem("userId");
                const token = await retrieveItem("userJWT");

                if (id === null || token === null) throw "";

                const response = await API.getUserInfo(id, token);

                if (response.error) throw "";

                setFirstName(response.firstName);
            } catch (error) {
                setErrorMessage(error.toString());
            }
        })();
    }, [firstName]);

    const renderMealtimeCard = ({ item }) => (
        <MealtimeCard title={item.title} />
    );

    return (
        <Screen style={styles.screen}>
            <Text style={styles.heading}>Hello, {firstName}</Text>
            {/* <Text style={styles.subheading}>Here are today's stats:</Text> */}
            {/* <FlatList
                data={MEALTIMES}
                renderItem={renderMealtimeCard}
                keyExtractor={(mealtime) => mealtime.id}
            /> */}
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
});
