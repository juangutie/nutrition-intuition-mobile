import React, { useState } from "react";
import { StyleSheet, View, Image, Pressable, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";

import LoginForm from "./___LoginForm";
import RegisterStep1Form from "./___RegisterStep1Form";
import RegisterStep2Form from "./___RegisterStep2Form";
import RegisterStep3Form from "./___RegisterStep3Form";
import EmailConfirmationForm from "./___EmailConfirmationForm";
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

    const [calorieGoalInput, setCalorieGoalInput] = useState("");
    const [weightGoalInput, setWeightGoalInput] = useState("");

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

            const response = await API.login(usernameInput, passwordInput);

            if (response.error) throw response.error;
            if (response.id <= 0) throw "User/Password combination incorrect";

            navigation.navigate("Dashboard");
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
                password: registerPasswordInput,
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
