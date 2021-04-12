import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import LoginForm from "./___LoginForm";
import RegisterStep1Form from "./___RegisterStep1Form";
import RegisterStep2Form from "./___RegisterStep2Form";
import * as API from "./_API";
import Colors from "./_Colors";

export default LoginRegister = () => {
    const navigation = useNavigation();

    const [errorMessage, setErrorMessage] = useState("");
    const [currentStage, setCurrentStage] = useState("login");

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [registerUsernameInput, setRegisterUsernameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [registerPasswordInput, setRegisterPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [genderInput, setGenderInput] = useState("");
    const [weightInput, setWeightInput] = useState("");
    const [ageInput, setAgeInput] = useState("");
    const [heightInput, setHeightInput] = useState("");

    const changeStageTo = (stage) => {
        return () => {
            setErrorMessage("");
            setCurrentStage(stage);
        };
    };

    const loginHandler = async function () {
        try {
            if (usernameInput.trim() === "") throw "No Username provided";
            if (passwordInput.trim() === "") throw "No Password provided";

            const response = await API.login(usernameInput, passwordInput);

            if (response.id <= 0) throw "User/Password combination incorrect";

            setErrorMessage("");
            navigation.navigate("Home");
        } catch (error) {
            setErrorMessage(error.toString());
        }

        Keyboard.dismiss();
    };

    const registerStep1Handler = async function () {
        try {
            if (registerUsernameInput.trim() === "")
                throw "Please enter a Username";
            if (emailInput.trim() === "") throw "Please enter your Email";
            if (registerPasswordInput.trim() === "")
                throw "Please enter your Password";
            if (confirmPasswordInput.trim() === "")
                throw "Please confirm your Password";
            if (registerPasswordInput !== confirmPasswordInput)
                throw "Passwords do not match";

            const response = await API.checkUsernameAndEmail(
                registerUsernameInput,
                emailInput
            );

            if (response.id <= 0) throw response.error;

            setErrorMessage("");
            changeStageTo("registerStep2")();
        } catch (error) {
            setErrorMessage(error.toString());
        }

        Keyboard.dismiss();
    };

    const registerStep2Handler = function () {
        try {
            if (firstNameInput.trim() === "")
                throw "Please enter your First Name";
            if (lastNameInput.trim() === "")
                throw "Please enter your Last Name";
            if (genderInput.trim() === "") throw "Please select your Gender";
            if (weightInput.trim() === "") throw "Please enter your Weight";
            if (ageInput.trim() === "") throw "Please enter your Age";
            if (heightInput.trim() === "") throw "Please enter your Height";

            setErrorMessage("");
            changeStageTo("registerStep3")();
        } catch (error) {
            setErrorMessage(error.toString());
        }

        Keyboard.dismiss();
    };

    const Form = {
        login: (
            <LoginForm
                defaultUsernameInput={usernameInput}
                defaultPasswordInput={passwordInput}
                setUsernameInput={setUsernameInput}
                setPasswordInput={setPasswordInput}
                onLogin={loginHandler}
                onRegister={changeStageTo("registerStep1")}
                onForgotPassword={() =>
                    alert('changeStageTo("forgotPassword")')
                }
                errorMessage={errorMessage}
            />
        ),
        registerStep1: (
            <RegisterStep1Form
                defaultUsernameInput={registerUsernameInput}
                defaultEmailInput={emailInput}
                defaultPasswordInput={registerPasswordInput}
                defaultConfirmPasswordInput={confirmPasswordInput}
                setUsernameInput={setRegisterUsernameInput}
                setEmailInput={setEmailInput}
                setPasswordInput={setRegisterPasswordInput}
                setConfirmPasswordInput={setConfirmPasswordInput}
                onNextStep={registerStep1Handler}
                onGoBack={changeStageTo("login")}
                errorMessage={errorMessage}
            />
        ),
        registerStep2: (
            <RegisterStep2Form
                defaultFirstNameInput={firstNameInput}
                defaultLastNameInput={lastNameInput}
                defaultGenderInput={genderInput}
                defaultWeightInput={weightInput}
                defaultAgeInput={ageInput}
                defaultHeightInput={heightInput}
                setFirstNameInput={setFirstNameInput}
                setLastNameInput={setLastNameInput}
                setGenderInput={setGenderInput}
                setWeightInput={setWeightInput}
                setAgeInput={setAgeInput}
                setHeightInput={setHeightInput}
                onNextStep={registerStep2Handler}
                onGoBack={changeStageTo("registerStep1")}
                errorMessage={errorMessage}
            />
        ),
    };

    return (
        <Pressable onPress={Keyboard.dismiss}>
            <View style={styles.card}>
                {/* TODO: Replace Logo Text with Logo Image */}
                <Image
                    style={styles.image}
                    source={require("./media/logo.png")}
                />
                {/* <Text style={styles.logo_text}>Nutrition Intuition</Text> */}
                {Form[currentStage]}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.dark_blue,
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        marginVertical: "12%",
        marginHorizontal: "6%",
        width: 300,
        padding: 20,
        borderColor: Colors.mint_green,
        borderRadius: 10,
        borderWidth: 5,
        borderStyle: "solid",
        shadowColor: "black",
        shadowOffset: { width: 5, height: 8 },
        shadowOpacity: 0.4,
    },
    logo_text: {
        color: Colors.mint_green,
        fontWeight: "bold",
        fontSize: 30,
    },
    image: {
        width: 220,
        height: 70,
        marginBottom: 5,
    },
});
