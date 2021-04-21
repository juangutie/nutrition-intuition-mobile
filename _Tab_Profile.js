import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
    getItemAsync as retrieveItem,
    deleteItemAsync as deleteItem,
} from "expo-secure-store";

import * as API from "./___API";
import Colors from "./___Colors";
import Screen from "./__Screen";
import Button from "./__Button";

export default ProfileTab = () => {
    const navigation = useNavigation();

    const [errorMessage, setErrorMessage] = useState("");
    const [firstName, setFirstName] = useState("");

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

    useEffect(() => {
        loadFirstName();
    }, []);

    async function logOutHandler() {
        try {
            await deleteItem("userId");
            await deleteItem("userJWT");

            navigation.navigate("LoginRegister");
        } catch (error) {
            setErrorMessage(error.toString());
        }
    }

    return (
        <Screen style={styles.screen}>
            <Text style={styles.profile_title}>{firstName}'s Profile</Text>
            <Button
                style={styles.button_red}
                title="Log Out"
                onPress={logOutHandler}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: "flex-start",
        padding: 20,
    },
    profile_title: {
        fontSize: 32,
        textDecorationLine: "underline",
        fontWeight: "400",
        color: "green",
    },
    button_red: {
        width: "75%",
        backgroundColor: Colors.error,
    },
});
