import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import {
    getItemAsync as retrieveItem,
    deleteItemAsync as deleteItem,
} from "expo-secure-store";
import { MaterialIcons } from "@expo/vector-icons";

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

    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [ageInput, setAgeInput] = useState("");
    const [weightInput, setWeightInput] = useState("");
    const [heightInput, setHeightInput] = useState("");
    const [weightGoalInput, setWeightGoalInput] = useState("");
    const [calorieGoalInput, setCalorieGoalInput] = useState("");
    const [genderInput, setGenderInput] = useState("");

    const loadData = async function () {
        try {
            setErrorMessage("");

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

            setFirstNameInput(response.firstName);
            setLastNameInput(response.lastName);
            setAgeInput(response.age);
            setWeightInput(response.weight);
            setHeightInput(response.height);
            setWeightGoalInput(response.goalWeight);
            setCalorieGoalInput(response.calorieGoal);
            setGenderInput(response.gender);
        } catch (error) {
            setErrorMessage(error.toString());
        }
    };

    useEffect(() => {
        loadData();
    }, [isEditing]);

    async function logOutHandler() {
        try {
            await deleteItem("userId");
            await deleteItem("userJWT");

            navigation.navigate("LoginRegister");
        } catch (error) {
            setErrorMessage(error.toString());
        }
    }

    async function updateProfileHandler() {
        try {
            setErrorMessage("");

            if (firstNameInput.trim() === "")
                throw "Please enter your First Name";
            if (lastNameInput.trim() === "")
                throw "Please enter your Last Name";
            if (ageInput.trim() === "") throw "Please enter your Age";
            if (weightInput.trim() === "") throw "Please enter your Weight";
            if (heightInput.trim() === "") throw "Please enter your Height";
            if (weightGoalInput.trim() === "")
                throw "Please enter a Weight Goal";
            if (calorieGoalInput.trim() === "")
                throw "Please enter a Calorie Goal";
            if (genderInput.trim() === "") throw "Please select your Gender";

            const id = await retrieveItem("userId");
            const token = await retrieveItem("userJWT");

            if (id === null || token === null) throw "";

            let response = await API.getUserInfo(id, token);

            if (response.error) throw "";

            response = await API.updateProfile({
                userId: id,
                firstName: firstNameInput,
                lastName: lastNameInput,
                age: ageInput,
                weight: weightInput,
                goalWeight: weightGoalInput,
                calorieGoal: calorieGoalInput,
                height: heightInput,
                gender: genderInput,
                jwtToken: token,
            });

            if (response.error) throw response.error;

            setIsEditing(false);
        } catch (error) {
            setErrorMessage(error.toString());
        }
        Keyboard.dismiss();
    }

    const GenderField = {
        viewing: (
            <TextBox
                defaultValue={
                    String(gender).charAt(0).toUpperCase() +
                    String(gender).slice(1)
                }
                editable={false}
                style={isEditing ? styles.input_edit : styles.input}
            />
        ),
        editing: (
            <Picker
                selectedValue={String(genderInput)}
                onValueChange={setGenderInput}
                style={isEditing ? styles.picker_edit : styles.picker}
                itemStyle={styles.picker_item}
            >
                <Picker.Item label="Gender:" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
            </Picker>
        ),
    };

    const BottomButton = {
        viewing: (
            <Button
                style={styles.button_red}
                title="Log Out"
                onPress={logOutHandler}
            />
        ),
        editing: (
            <Button
                style={styles.button}
                title="Update Profile"
                onPress={updateProfileHandler}
            />
        ),
    };

    return (
        <Screen style={styles.screen}>
            <View style={styles.heading}>
                <Text style={styles.profile_title}>{firstName}'s Profile</Text>
                <Pressable
                    onPress={() => setIsEditing(!isEditing)}
                    style={styles.editbutton}
                >
                    <MaterialIcons
                        name={isEditing ? "cancel" : "edit"}
                        size={24}
                        color={isEditing ? Colors.error : "green"}
                    />
                </Pressable>
            </View>
            <ScrollView style={styles.scrollview}>
                <View style={styles.doubleForm}>
                    <View style={styles.inputColumn}>
                        <Text style={styles.inputname}>First Name</Text>
                        <TextBox
                            defaultValue={String(firstName)}
                            value={String(firstNameInput)}
                            onChangeText={setFirstNameInput}
                            textContentType="givenName"
                            editable={isEditing}
                            style={isEditing ? styles.input_edit : styles.input}
                        />
                    </View>
                    <View style={styles.inputColumn}>
                        <Text style={styles.inputname}>Last Name</Text>
                        <TextBox
                            defaultValue={String(lastName)}
                            value={String(lastNameInput)}
                            onChangeText={setLastNameInput}
                            textContentType="familyName"
                            editable={isEditing}
                            style={isEditing ? styles.input_edit : styles.input}
                        />
                    </View>
                </View>
                <Text style={styles.inputname}>Age</Text>
                <TextBox
                    defaultValue={String(age)}
                    value={String(ageInput)}
                    onChangeText={setAgeInput}
                    keyboardType="number-pad"
                    editable={isEditing}
                    style={isEditing ? styles.input_edit : styles.input}
                />
                <View style={styles.doubleForm}>
                    <View style={styles.inputColumn}>
                        <Text style={styles.inputname}>Weight (lbs)</Text>
                        <TextBox
                            defaultValue={String(weight)}
                            value={String(weightInput)}
                            onChangeText={setWeightInput}
                            keyboardType="decimal-pad"
                            editable={isEditing}
                            style={isEditing ? styles.input_edit : styles.input}
                        />
                    </View>
                    <View style={styles.inputColumn}>
                        <Text style={styles.inputname}>Height (in)</Text>
                        <TextBox
                            defaultValue={String(height)}
                            value={String(heightInput)}
                            onChangeText={setHeightInput}
                            keyboardType="decimal-pad"
                            editable={isEditing}
                            style={isEditing ? styles.input_edit : styles.input}
                        />
                    </View>
                </View>
                <View style={styles.doubleForm}>
                    <View style={styles.inputColumn}>
                        <Text style={styles.inputname}>Weight Goal (lbs)</Text>
                        <TextBox
                            defaultValue={String(weightGoal)}
                            value={String(weightGoalInput)}
                            onChangeText={setWeightGoalInput}
                            keyboardType="decimal-pad"
                            editable={isEditing}
                            style={isEditing ? styles.input_edit : styles.input}
                        />
                    </View>
                    <View style={styles.inputColumn}>
                        <Text style={styles.inputname}>Calorie Goal</Text>
                        <TextBox
                            defaultValue={String(calorieGoal)}
                            value={String(calorieGoalInput)}
                            onChangeText={setCalorieGoalInput}
                            keyboardType="decimal-pad"
                            editable={isEditing}
                            style={isEditing ? styles.input_edit : styles.input}
                        />
                    </View>
                </View>
                <Text style={styles.inputname}>Gender</Text>
                {GenderField[isEditing ? "editing" : "viewing"]}
                {BottomButton[isEditing ? "editing" : "viewing"]}
                <View style={styles.padding} />
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
    heading: {
        flexDirection: "row",
        justifyContent: "center",
    },
    profile_title: {
        marginLeft: 24,
        marginRight: 12,
        fontSize: 32,
        textDecorationLine: "underline",
        fontWeight: "400",
        color: "green",
    },
    editbutton: {
        top: 8,
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
    input_edit: {
        alignSelf: "stretch",
        backgroundColor: "white",
        borderColor: "grey",
        borderWidth: 1,
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
    picker_edit: {
        marginVertical: 10,
        backgroundColor: "white",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,
    },
    picker_item: {
        height: 110,
        color: Colors.input_text,
    },
    button: {
        alignSelf: "center",
        width: "75%",
    },
    button_red: {
        alignSelf: "center",
        width: "75%",
        backgroundColor: Colors.error,
    },
});
