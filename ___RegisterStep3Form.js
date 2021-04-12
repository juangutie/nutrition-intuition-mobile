import React from "react";
import { StyleSheet, View, Text } from "react-native";

import TextBox from "./__TextBox";
import Button from "./__Button";
import ErrorText from "./__ErrorText";
import Colors from "./_Colors";

export default RegisterStep3Form = ({
    defaultCalorieGoalInput,
    defaultWeightGoalInput,
    setCalorieGoalInput,
    setWeightGoalInput,
    errorMessage,
    onFinalizeRegistration,
    onGoBack,
}) => {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Register: Step 3</Text>
            <TextBox
                placeholder="Calorie Goal"
                defaultValue={defaultCalorieGoalInput}
                onChangeText={setCalorieGoalInput}
                keyboardType="decimal-pad"
                style={styles.input}
            />
            <TextBox
                placeholder="Weight Goal"
                defaultValue={defaultWeightGoalInput}
                onChangeText={setWeightGoalInput}
                keyboardType="decimal-pad"
                style={styles.input}
            />
            <Button
                title="Finalize Registration"
                onPress={onFinalizeRegistration}
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
        marginVertical: 0,
        padding: 18,
        width: 240,
        alignSelf: "stretch",
    },
    button: {
        marginVertical: 0,
        padding: 28,
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
