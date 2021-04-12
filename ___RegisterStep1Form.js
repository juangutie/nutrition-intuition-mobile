import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import TextBox from "./__TextBox";
import Button from "./__Button";
import ErrorText from "./__ErrorText";
import Colors from "./_Colors";

export default RegisterStep1Form = ({
    defaultUsernameInput,
    defaultEmailInput,
    defaultPasswordInput,
    defaultConfirmPasswordInput,
    setUsernameInput,
    setEmailInput,
    setPasswordInput,
    setConfirmPasswordInput,
    errorMessage,
    onNextStep,
    onGoBack,
}) => {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Register: Step 1</Text>
            <TextBox
                placeholder="Username"
                defaultValue={defaultUsernameInput}
                onChangeText={setUsernameInput}
                textContentType="username"
                style={styles.input}
            />
            <TextBox
                placeholder="Email"
                defaultValue={defaultEmailInput}
                onChangeText={setEmailInput}
                textContentType="emailAddress"
                style={styles.input}
            />
            <TextBox
                placeholder="Password"
                defaultValue={defaultPasswordInput}
                onChangeText={setPasswordInput}
                textContentType="password"
                secureTextEntry={true}
                style={styles.input}
            />
            <TextBox
                placeholder="Confirm Password"
                defaultValue={defaultConfirmPasswordInput}
                onChangeText={setConfirmPasswordInput}
                textContentType="password"
                secureTextEntry={true}
                style={styles.input}
            />
            <Button
                title="Next Step"
                onPress={onNextStep}
                style={styles.button}
            />
            <ErrorText style={styles.error} message={errorMessage} />
            <Button
                title="Go Back"
                onPress={onGoBack}
                style={styles.button_red}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
    title: {
        color: Colors.mint_green,
        fontSize: 30,
        marginVertical: 10,
    },
    input: {
        width: 240,
        alignSelf: "stretch",
    },
    button: {
        alignSelf: "stretch",
    },
    error: {
        fontSize: 16,
    },
    button_red: {
        alignSelf: "stretch",
        backgroundColor: Colors.error,
    },
});
