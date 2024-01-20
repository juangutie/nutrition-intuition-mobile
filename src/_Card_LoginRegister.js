import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Pressable, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import {
    setItemAsync as storeItem,
    getItemAsync as retrieveItem,
} from "expo-secure-store";

import * as API from "./___API";
import Colors from "./___Colors";
import LoginForm from "./_Form_Login";
import RegisterStep1Form from "./_Form_RegisterStep1";
import RegisterStep2Form from "./_Form_RegisterStep2";
import RegisterStep3Form from "./_Form_RegisterStep3";
import EmailConfirmationForm from "./_Form_EmailConfirmation";
import PasswordResetForm from "./_Form_PasswordReset";

export default LoginRegister = () => {
    const navigation = useNavigation();
    const md5 = require("md5");

    const [errorMessage, setErrorMessage] = useState("");
    const [currentStage, setCurrentStage] = useState("login");

    useEffect(() => {
        (async () => {
            try {
                const id = await retrieveItem("userId");
                const token = await retrieveItem("userJWT");

                if (id === null || token === null) throw "";

                const response = await API.getUserInfo(id, token);

                if (response.error) throw "";

                navigation.navigate("Home");
            } catch (error) {
                setErrorMessage(error.toString());
            }
        })();
    }, []);

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

    const [calorieGoalInput, setCalorieGoalInput] = useState("");
    const [weightGoalInput, setWeightGoalInput] = useState("");

    const [recoveryUsernameInput, setRecoveryUsernameInput] = useState("");
    const [newPasswordInput, setNewPasswordInput] = useState("");
    const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState("");

    const changeStageTo = (stage) => {
        return () => {
            setErrorMessage("");
            setCurrentStage(stage);
        };
    };

    const loginHandler = async function () {
        try {
            setErrorMessage("");

            if (usernameInput.trim() === "") throw "No Username provided";
            if (passwordInput.trim() === "") throw "No Password provided";

            const response = await API.login(usernameInput, md5(passwordInput));

            if (response.error) throw response.error;
            if (response.id <= 0) throw "User/Password combination incorrect";

            const token = response.id.accessToken;
            await storeItem("userJWT", token);
            await storeItem("userId", jwt_decode(token).userId);

            navigation.navigate("Home");
        } catch (error) {
            setErrorMessage(error.toString());
        }

        Keyboard.dismiss();
    };

    const registerStep1Handler = async function () {
        try {
            setErrorMessage("");

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

            if (response.error) throw response.error;
            if (response.id <= 0) throw response.error;

            changeStageTo("registerStep2")();
        } catch (error) {
            setErrorMessage(error.toString());
        }

        Keyboard.dismiss();
    };

    const registerStep2Handler = function () {
        try {
            setErrorMessage("");

            if (firstNameInput.trim() === "")
                throw "Please enter your First Name";
            if (lastNameInput.trim() === "")
                throw "Please enter your Last Name";
            if (genderInput.trim() === "") throw "Please select your Gender";
            if (weightInput.trim() === "") throw "Please enter your Weight";
            if (ageInput.trim() === "") throw "Please enter your Age";
            if (heightInput.trim() === "") throw "Please enter your Height";

            if (genderInput.toLowerCase() === "male")
                setCalorieGoalInput(
                    (Number(weightInput) * 12 * 1.1).toFixed(2)
                );
            else
                setCalorieGoalInput(
                    (Number(weightInput) * 12 * 1.0).toFixed(2)
                );

            changeStageTo("registerStep3")();
        } catch (error) {
            setErrorMessage(error.toString());
        }

        Keyboard.dismiss();
    };

    const registerStep3Handler = async function () {
        try {
            setErrorMessage("");

            if (calorieGoalInput.trim() === "")
                throw "Please enter a Calorie Goal";
            if (weightGoalInput.trim() === "")
                throw "Please enter a Weight Goal";

            const response = await API.register({
                login: registerUsernameInput,
                email: emailInput,
                password: md5(registerPasswordInput),
                firstName: firstNameInput,
                lastName: lastNameInput,
                age: ageInput,
                weight: weightInput,
                goalWeight: weightGoalInput,
                calorieGoal: calorieGoalInput,
                height: heightInput,
                gender: genderInput,
            });

            if (response.error) throw response.error;
            if (response.id <= 0) throw "User already exists";

            changeStageTo("emailConfirmation")();
        } catch (error) {
            setErrorMessage(error.toString());
        }

        Keyboard.dismiss();
    };

    const resendEmailHandler = async function () {
        try {
            setErrorMessage("");

            const response = await API.resendVerificationEmail(emailInput);

            if (response.error) throw response.error;

            setErrorMessage("Confirmation email sent");
        } catch (error) {
            setErrorMessage(error.toString());
        }
    };

    const passwordResetHandler = async function () {
        try {
            setErrorMessage("");

            if (recoveryUsernameInput.trim() === "")
                throw "Please enter your Username";
            if (newPasswordInput.trim() === "")
                throw "Please enter your New Password";
            if (confirmNewPasswordInput.trim() === "")
                throw "Please confirm your New Password";
            if (newPasswordInput !== confirmNewPasswordInput)
                throw "Passwords do not match";

            const response = await API.sendPasswordResetEmail(
                recoveryUsernameInput,
                md5(newPasswordInput)
            );

            if (response.error) throw response.error;

            setErrorMessage(
                "An email will be sent to the associated username if it exists"
            );
        } catch (error) {
            setErrorMessage(error.toString());
        }
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
                onForgotPassword={changeStageTo("passwordReset")}
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
        registerStep3: (
            <RegisterStep3Form
                defaultCalorieGoalInput={calorieGoalInput}
                defaultWeightGoalInput={weightGoalInput}
                setCalorieGoalInput={setCalorieGoalInput}
                setWeightGoalInput={setWeightGoalInput}
                onFinalizeRegistration={registerStep3Handler}
                onGoBack={changeStageTo("registerStep2")}
                errorMessage={errorMessage}
            />
        ),
        emailConfirmation: (
            <EmailConfirmationForm
                errorMessage={errorMessage}
                onResendEmail={resendEmailHandler}
                onBackToLogin={changeStageTo("login")}
            />
        ),
        passwordReset: (
            <PasswordResetForm
                defaultUsernameInput={recoveryUsernameInput}
                defaultPasswordInput={newPasswordInput}
                defaultConfirmPasswordInput={confirmNewPasswordInput}
                setUsernameInput={setRecoveryUsernameInput}
                setPasswordInput={setNewPasswordInput}
                setConfirmPasswordInput={setConfirmNewPasswordInput}
                errorMessage={errorMessage}
                onSendResetPasswordEmail={passwordResetHandler}
                onBackToLogin={changeStageTo("login")}
            />
        ),
    };

    return (
        <Pressable onPress={Keyboard.dismiss}>
            <View style={styles.card}>
                <Image
                    style={styles.image}
                    source={require("./media/logo2.jpg")}
                />
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
    image: {
        width: 200,
        height: 72,
    },
});
