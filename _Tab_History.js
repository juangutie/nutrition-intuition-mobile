import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, FlatList, RefreshControl } from "react-native";
import { getItemAsync as retrieveItem } from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";

import * as API from "./___API";
import Colors from "./___Colors";
import Screen from "./__Screen.js";
import Button from "./__Button";
import ErrorText from "./__ErrorText";

const wait = function (timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default HistoryTab = ({ reloadDataEvent, onShowQuickAdd }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [mealtimes, setMealtimes] = useState([]);

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
            const id = await retrieveItem("userId");
            const token = await retrieveItem("userJWT");

            if (id === null || token === null) throw "";

            let response = await API.getUserInfo(id, token);

            if (response.error) throw "";

            setFirstName(response.firstName);

            response = await API.searchMealTime(id, 30, token);

            if (response.error) throw response.error;

            setMealtimes(response.results);
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

    const [isRefreshing, setIsRefreshing] = useState(false);
    const refreshHandler = useCallback(() => {
        setIsRefreshing(true);
        loadScreenData();
        wait(500).then(() => setIsRefreshing(false));
    });

    const renderMealtimeCard = ({ item }) => <MealtimeCard data={item} />;

    if (mealtimes.length !== 0)
        return (
            <Screen style={styles.screen}>
                <Text style={styles.heading}>Hello, {firstName}</Text>
                <Text style={styles.subheading}>
                    Here are your meal cards for the last 30 days:
                </Text>
                <FlatList
                    data={mealtimes}
                    renderItem={renderMealtimeCard}
                    keyExtractor={(item) => item.mealtimeId}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={refreshHandler}
                        />
                    }
                    style={styles.mealtimeList}
                />
            </Screen>
        );
    else
        return (
            <Screen style={styles.screen}>
                <Text style={styles.heading}>Hello, {firstName}</Text>
                <Text style={styles.subheading_red}>
                    There are no meals in the last 30 days, go add some!
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
        textAlign: "center",
    },
    subheading_red: {
        fontSize: 22,
        marginBottom: 10,
        color: Colors.error,
        fontWeight: "500",
        textAlign: "center",
    },
    mealtimeList: {
        alignSelf: "stretch",
    },
    button: {
        backgroundColor: "green",
    },
});
