import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Button from "./__Button";
import ErrorText from "./__ErrorText";
import Colors from "./_Colors";

export default EmailConfirmationForm = ({
    errorMessage,
    onResendEmail,
    onBackToLogin,
}) => {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Email Confirmation Sent</Text>
            <Text style={styles.text}>
                Please check your associated inbox to confirm your email
                address.
            </Text>
            <ErrorText style={styles.error} message={errorMessage} />
            <Button
                title="Resend Email"
                onPress={onResendEmail}
                style={styles.button}
            />
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
        justifyContent: "center",
    },
    title: {
        color: Colors.off_white,
        fontWeight: "bold",
        fontSize: 22,
        marginVertical: 10,
        textAlign: "center",
    },
    text: {
        color: Colors.off_white,
        textAlign: "center",
        fontSize: 20,
        marginBottom: 15,
        alignSelf: "stretch",
    },
    button: {
        marginBottom: 15,
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
