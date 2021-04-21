import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
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

    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [weightGoal, setWeightGoal] = useState("");
    const [calorieGoal, setCalorieGoal] = useState("");
    const [gender, setGender] = useState("");

    const loadData = async function () {
        try {
            const id = await retrieveItem("userId");
            const token = await retrieveItem("userJWT");

            if (id === null || token === null) throw "";

            let response = await API.getUserInfo(id, token);

            if (response.error) throw "";

            setFirstName(response.firstName);
            setLastName(response.lastName);
            setAge(response.age);
            setWeight(response.weight);
            setHeight(response.height);
            setWeightGoal(response.goalWeight);
            setCalorieGoal(response.calorieGoal);
            setGender(response.gender);
            // console.log(response);
        } catch (error) {
            setErrorMessage(error.toString());
        }
    };

    useEffect(() => {
        loadData();
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

    const GenderField = {
        viewing: (
            <TextBox
                defaultValue={
                    String(gender).charAt(0).toUpperCase() +
                    String(gender).slice(1)
                }
                editable={false}
                style={styles.input}
            />
        ),
        editing: (
            <Picker
                selectedValue={gender}
                onValueChange={setGender}
                style={styles.picker}
                itemStyle={styles.picker_item}
            >
                <Picker.Item label="Gender:" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
            </Picker>
        ),
    };

    return (
        <Screen style={styles.screen}>
            <View style={styles.heading}>
                <Text style={styles.profile_title}>{firstName}'s Profile</Text>
            </View>
            <ScrollView style={styles.scrollview}>
                <View style={styles.doubleForm}>
                    <View style={styles.inputColumn}>
                        <Text style={styles.inputname}>First Name</Text>
                        <TextBox
                            defaultValue={String(firstName)}
                            onChangeText={setFirstName}
                            editable={isEditing}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputColumn}>
                        <Text style={styles.inputname}>Last Name</Text>
                        <TextBox
                            defaultValue={String(lastName)}
                            onChangeText={setLastName}
                            editable={isEditing}
                            style={styles.input}
                        />
                    </View>
                </View>
                <Text style={styles.inputname}>Age</Text>
                <TextBox
                    defaultValue={String(age)}
                    onChangeText={setAge}
                    editable={isEditing}
                    style={styles.input}
                />
                <View style={styles.doubleForm}>
                    <View style={styles.inputColumn}>
                        <Text style={styles.inputname}>Weight (lbs)</Text>
                        <TextBox
                            defaultValue={String(weight)}
                            onChangeText={setWeight}
                            editable={isEditing}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputColumn}>
                        <Text style={styles.inputname}>Height (in)</Text>
                        <TextBox
                            defaultValue={String(height)}
                            onChangeText={setHeight}
                            editable={isEditing}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={styles.doubleForm}>
                    <View style={styles.inputColumn}>
                        <Text style={styles.inputname}>Weight Goal (lbs)</Text>
                        <TextBox
                            defaultValue={String(weightGoal)}
                            onChangeText={setWeightGoal}
                            editable={isEditing}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputColumn}>
                        <Text style={styles.inputname}>Calorie Goal</Text>
                        <TextBox
                            defaultValue={String(calorieGoal)}
                            onChangeText={setCalorieGoal}
                            editable={isEditing}
                            style={styles.input}
                        />
                    </View>
                </View>
                <Text style={styles.inputname}>Gender</Text>
                {GenderField[isEditing ? "editing" : "viewing"]}
                <Button
                    style={styles.button_red}
                    title="Log Out"
                    onPress={logOutHandler}
                />
            </ScrollView>
            <ErrorText message={errorMessage} />
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
    scrollview: {
        alignSelf: "stretch",
        padding: 4,
        paddingTop: 8,
    },
    padding: {
        paddingBottom: 40,
    },
    inputname: {
        fontSize: 18,
        marginTop: 8,
        fontWeight: "bold",
        alignSelf: "center",
        textAlign: "center",
    },
    input: {
        alignSelf: "stretch",
        backgroundColor: Colors.off_white,
    },
    doubleForm: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputColumn: {
        width: "48%",
    },
    picker: {
        marginVertical: 10,
        backgroundColor: Colors.off_white,
        borderRadius: 5,
    },
    picker_item: {
        height: 110,
        color: Colors.input_text,
    },
    button_red: {
        alignSelf: "center",
        width: "75%",
        backgroundColor: Colors.error,
    },
});
