import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Colors from "./___Colors";
import TextBox from "./__TextBox";
import Button from "./__Button";
import ErrorText from "./__ErrorText";

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
            <Text style={styles.body}>
                Calorie goal reccomended based on your profile:
            </Text>
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
        marginTop: 10,
    },
    body: {
        color: Colors.off_white,
        textAlign: "center",
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
