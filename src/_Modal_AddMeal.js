import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    Keyboard,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getItemAsync as retrieveItem } from "expo-secure-store";

import * as API from "./___API";
import Colors from "./___Colors";
import TextBox from "./__TextBox";
import ErrorText from "./__ErrorText";
import Button from "./__Button";

export default AddMealModal = (props) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [mealSearchResults, setmealSearchResults] = useState([]);

    const [mealNameInput, setMealNameInput] = useState("");
    const [caloriesInput, setCaloriesInput] = useState("");
    const [servingSizeInput, setServingSizeInput] = useState("");
    const [totalFatInput, setTotalFatInput] = useState("");
    const [sodiumInput, setSodiumInput] = useState("");
    const [totalCarbsInput, setTotalCarbsInput] = useState("");
    const [proteinAmountInput, setProteinAmountInput] = useState("");

    const searchMealHandler = async function (searchMealNameInput) {
        try {
            setErrorMessage("");

            const userId = await retrieveItem("userId");
            const userToken = await retrieveItem("userJWT");

            if (userId === null || userToken === null) throw "";

            const response = await API.searchMealByName(
                userId,
                searchMealNameInput,
                userToken
            );

            if (response.error) throw response.error;

            setmealSearchResults(response.results);
        } catch (error) {
            setErrorMessage(error.toString());
        }
    };

    const quickAddHandler = async function (mealId) {
        try {
            setErrorMessage("");

            const userId = await retrieveItem("userId");
            const userToken = await retrieveItem("userJWT");

            if (userId === null || userToken === null) throw "";

            response = await API.mealtimeCheck(userId, userToken);

            let mealtimeId = response.id;
            let mealtimeToken = response.token.accessToken;

            if (mealtimeId === -1) {
                response = await API.addMealtime(
                    userId,
                    [{ mealId: mealId, amountConsumed: 1 }],
                    userToken
                );

                if (response.error) throw response.error;

                mealtimeId = response.id;
                mealtimeToken = response.token.accessToken;
            } else {
                response = await API.addMeals(
                    mealtimeId,
                    [{ mealId: mealId, amountConsumed: 1 }],
                    mealtimeToken
                );

                if (response.error) throw response.error;
            }

            props.onHide();
        } catch (error) {
            setErrorMessage(error.toString());
        }
    };

    const addNewMealHandler = async function () {
        try {
            setErrorMessage("");

            if (mealNameInput.trim() === "") throw "Please enter a meal name";

            const userId = await retrieveItem("userId");
            const userToken = await retrieveItem("userJWT");

            if (userId === null || userToken === null) throw "";

            let response = await API.addMeal({
                userId: userId,
                name: mealNameInput,
                calories: Number(caloriesInput),
                servingSize: servingSizeInput,
                totalFat: Number(totalFatInput),
                sodium: Number(sodiumInput),
                totalCarbs: Number(totalCarbsInput),
                protein: Number(proteinAmountInput),
                jwtToken: userToken,
            });

            if (response.error) throw response.error;

            const mealId = response.id;
            const mealToken = response.token.accessToken;

            response = await API.mealtimeCheck(userId, userToken);

            let mealtimeId = response.id;
            let mealtimeToken = response.token.accessToken;

            if (mealtimeId === -1) {
                response = await API.addMealtime(
                    userId,
                    [{ mealId: mealId, amountConsumed: 1 }],
                    userToken
                );

                if (response.error) throw response.error;

                mealtimeId = response.id;
                mealtimeToken = response.token.accessToken;
            } else {
                response = await API.addMeals(
                    mealtimeId,
                    [{ mealId: mealId, amountConsumed: 1 }],
                    mealtimeToken
                );

                if (response.error) throw response.error;
            }

            props.onHide();
        } catch (error) {
            setErrorMessage(error.toString());
        }
    };

    const renderMeal = ({ item }) => {
        return (
            <Pressable
                style={styles.meal}
                onPress={() => quickAddHandler(item.mealId)}
            >
                <Text style={styles.mealName}>{item.Name}</Text>
                <Text style={styles.nutrients}>{item.Calories} calories</Text>
                <Text style={styles.nutrients}>{item.Protein}g Protein</Text>
                <Text style={styles.nutrients}>{item.TotalFat}g Fat</Text>
                <Text style={styles.nutrients}>{item.TotalCarbs}g Carbs</Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.background} onPress={props.onHide} />
            <Pressable style={styles.modal} onPress={Keyboard.dismiss}>
                <Text style={styles.heading}>Quick Add</Text>
                <Text style={styles.subheading}>
                    Add an existing meal by searching below:
                </Text>
                <TextBox
                    style={styles.input}
                    onChangeText={searchMealHandler}
                />
                <FlatList
                    data={mealSearchResults}
                    renderItem={renderMeal}
                    keyExtractor={(item) => item.mealId}
                    style={styles.mealList}
                />
                <Text style={styles.subheadingAlt}>Or</Text>
                <Text style={styles.subheading}>Add a new Meal</Text>
                <ScrollView style={styles.scrollview}>
                    <Text style={styles.inputname}>Meal Name:</Text>
                    <TextBox
                        onChangeText={setMealNameInput}
                        style={styles.input}
                    />
                    <Text style={styles.inputname}>Calories:</Text>
                    <TextBox
                        onChangeText={setCaloriesInput}
                        keyboardType="decimal-pad"
                        style={styles.input}
                    />
                    <Text style={styles.inputname}>Serving Size:</Text>
                    <TextBox
                        onChangeText={setServingSizeInput}
                        style={styles.input}
                    />
                    <Text style={styles.inputname}>Total Fat (g):</Text>
                    <TextBox
                        onChangeText={setTotalFatInput}
                        keyboardType="decimal-pad"
                        style={styles.input}
                    />
                    <Text style={styles.inputname}>Sodium (mg):</Text>
                    <TextBox
                        onChangeText={setSodiumInput}
                        keyboardType="decimal-pad"
                        style={styles.input}
                    />
                    <Text style={styles.inputname}>Total Carbs (g):</Text>
                    <TextBox
                        onChangeText={setTotalCarbsInput}
                        keyboardType="decimal-pad"
                        style={styles.input}
                    />
                    <Text style={styles.inputname}>Protein Amount (g):</Text>
                    <TextBox
                        onChangeText={setProteinAmountInput}
                        keyboardType="decimal-pad"
                        style={styles.input}
                    />
                    <View style={styles.padding} />
                </ScrollView>
                <ErrorText message={errorMessage} />
                <Button
                    title="Add New Meal"
                    onPress={addNewMealHandler}
                    style={styles.button}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    modal: {
        width: "75%",
        height: "80%",
        justifyContent: "flex-start",
        padding: 20,
        backgroundColor: "white",
        borderColor: Colors.mint_green,
        borderRadius: 10,
        borderWidth: 5,
        borderStyle: "solid",
        shadowColor: "black",
        shadowOffset: { width: 5, height: 8 },
        shadowOpacity: 0.4,
    },
    heading: {
        color: "green",
        textAlign: "center",
        fontSize: 28,
    },
    subheading: {
        color: "#45CB1D",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
    },
    subheadingAlt: {
        textAlign: "center",
        fontSize: 20,
    },
    input: {
        alignSelf: "stretch",
        backgroundColor: "white",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 0,
    },
    mealList: {},
    meal: {
        alignSelf: "center",
        alignItems: "center",
        width: "70%",
        margin: 6,
        borderRadius: 10,
        backgroundColor: "lightgreen",
    },
    mealName: {
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
    },
    nutrients: {},
    scrollview: {
        padding: 4,
    },
    button: {},
    padding: {
        paddingBottom: 40,
    },
});
