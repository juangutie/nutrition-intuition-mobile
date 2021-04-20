import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";

import Colors from "./___Colors";
import TextBox from "./__TextBox";
import Button from "./__Button";
import ErrorText from "./__ErrorText";

export default LoginForm = ({
    defaultUsernameInput,
    defaultPasswordInput,
    setUsernameInput,
    setPasswordInput,
    onLogin,
    onForgotPassword,
    errorMessage,
    onRegister,
}) => {
    return (
        <View style={styles.form}>
            <TextBox
                placeholder="Username"
                defaultValue={defaultUsernameInput}
                onChangeText={setUsernameInput}
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
            <Button title="Log In" onPress={onLogin} style={styles.button} />
            <Pressable onPress={onForgotPassword}>
                <Text style={styles.link}>Forgot Password?</Text>
            </Pressable>
            <ErrorText message={errorMessage} />
            <Text style={styles.text}>
                Don't have an account? Register below and look forward to a
                healthier future!
            </Text>
            <Button
                title="Register"
                onPress={onRegister}
                style={styles.button_big}
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
    input: {
        width: 240,
        alignSelf: "stretch",
    },
    button: {
        alignSelf: "stretch",
    },
    link: {
        color: Colors.dark_green,
        marginTop: 6,
    },
    text: {
        color: Colors.off_white,
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
    button_big: {
        alignSelf: "stretch",
        padding: 20,
    },
});
