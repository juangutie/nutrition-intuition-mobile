import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

import TextBox from "./__TextBox";
import Button from "./__Button";
import ErrorText from "./__ErrorText";
import Colors from "./_Colors";
import { ScrollView } from "react-native-gesture-handler";

export default RegisterStep2Form = ({
    defaultFirstNameInput,
    defaultLastNameInput,
    defaultGenderInput,
    defaultWeightInput,
    defaultAgeInput,
    defaultHeightInput,
    setFirstNameInput,
    setLastNameInput,
    setGenderInput,
    setWeightInput,
    setAgeInput,
    setHeightInput,
    errorMessage,
    onNextStep,
    onGoBack,
}) => {
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Register: Step 2</Text>
            <ScrollView>
                <TextBox
                    placeholder="First Name"
                    defaultValue={defaultFirstNameInput}
                    onChangeText={setFirstNameInput}
                    textContentType="givenName"
                    style={styles.input}
                />
                <TextBox
                    placeholder="Last Name"
                    defaultValue={defaultLastNameInput}
                    onChangeText={setLastNameInput}
                    textContentType="familyName"
                    style={styles.input}
                />
                <Picker
                    selectedValue={defaultGenderInput}
                    onValueChange={setGenderInput}
                    style={styles.picker}
                    itemStyle={styles.picker_item}
                >
                    <Picker.Item label="Gender:" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
                <TextBox
                    placeholder="Weight (lbs)"
                    defaultValue={defaultWeightInput}
                    onChangeText={setWeightInput}
                    keyboardType="decimal-pad"
                    style={styles.input}
                />
                <TextBox
                    placeholder="Age"
                    defaultValue={defaultAgeInput}
                    onChangeText={setAgeInput}
                    keyboardType="number-pad"
                    style={styles.input}
                />
                <TextBox
                    placeholder="Height (in)"
                    defaultValue={defaultHeightInput}
                    onChangeText={setHeightInput}
                    keyboardType="decimal-pad"
                    style={styles.input}
                />
            </ScrollView>
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
        padding: 9,
        width: 240,
        alignSelf: "stretch",
    },
    picker: {
        marginVertical: 10,
        backgroundColor: Colors.off_white,
        borderRadius: 5,
    },
    picker_item: {
        height: 110,
        color: Colors.input_text,
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
