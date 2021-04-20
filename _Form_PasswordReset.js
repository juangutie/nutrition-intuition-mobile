import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Colors from "./___Colors";
import TextBox from "./__TextBox";
import Button from "./__Button";
import ErrorText from "./__ErrorText";

export default PasswordResetForm = ({
    defaultUsernameInput,
    defaultPasswordInput,
    defaultConfirmPasswordInput,
    setUsernameInput,
    setPasswordInput,
    setConfirmPasswordInput,
    errorMessage,
    onSendResetPasswordEmail,
    onBackToLogin,
}) => {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Password Reset</Text>
            <TextBox
                placeholder="Account Username"
                defaultValue={defaultUsernameInput}
                onChangeText={setUsernameInput}
                textContentType="username"
                style={styles.input}
            />
            <TextBox
                placeholder="New Password"
                defaultValue={defaultPasswordInput}
                onChangeText={setPasswordInput}
                textContentType="password"
                secureTextEntry={true}
                style={styles.input}
            />
            <TextBox
                placeholder="Confirm New Password"
                defaultValue={defaultConfirmPasswordInput}
                onChangeText={setConfirmPasswordInput}
                textContentType="password"
                secureTextEntry={true}
                style={styles.input}
            />
            <Button
                title="Send Reset Password Email"
                onPress={onSendResetPasswordEmail}
                style={styles.button}
            />
            <ErrorText style={styles.error} message={errorMessage} />
            <Button
                title="Back to login"
                onPress={onBackToLogin}
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
        marginVertical: 0,
        width: 240,
        alignSelf: "stretch",
    },
    button: {
        marginVertical: 0,
        alignSelf: "stretch",
    },
    error: {
        fontSize: 16,
    },
    button_red: {
        marginTop: 0,
        alignSelf: "stretch",
        backgroundColor: Colors.error,
    },
});
