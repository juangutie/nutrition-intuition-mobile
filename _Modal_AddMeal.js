import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    Keyboard,
} from "react-native";

import Colors from "./___Colors";
import TextBox from "./__TextBox";
import Button from "./__Button";

export default AddMealModal = (props) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.background} onPress={props.onHide} />
            <Pressable style={styles.modal} onPress={Keyboard.dismiss}>
                <Text style={styles.heading}>Quick Add</Text>
                <Text style={styles.subheading}>
                    Add an existing meal by searching below:
                </Text>
                <TextBox style={styles.input} />
                <Text style={styles.subheadingAlt}>Or</Text>
                <Text style={styles.subheading}>Add a new Meal</Text>
                <ScrollView style={styles.scrollview}>
                    <Text style={styles.inputname}>Meal Name:</Text>
                    <TextBox style={styles.input} />
                    <Text style={styles.inputname}>Calories:</Text>
                    <TextBox style={styles.input} />
                    <Text style={styles.inputname}>Serving Size:</Text>
                    <TextBox style={styles.input} />
                    <Text style={styles.inputname}>Total Fat (g):</Text>
                    <TextBox style={styles.input} />
                    <Text style={styles.inputname}>Sodium (mg):</Text>
                    <TextBox style={styles.input} />
                    <Text style={styles.inputname}>Total Carbs (g):</Text>
                    <TextBox style={styles.input} />
                    <Text style={styles.inputname}>Protein Amount (g):</Text>
                    <TextBox style={styles.input} />
                    <View style={styles.padding} />
                </ScrollView>
                <Button
                    title="Add New Meal"
                    onPress={props.onHide}
                    style={styles.button}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    modal: {
        width: "75%",
        height: "80%",
        justifyContent: "flex-start",
        padding: 20,
        backgroundColor: "white",
        borderColor: Colors.mint_green,
        borderRadius: 10,
        borderWidth: 5,
        borderStyle: "solid",
        shadowColor: "black",
        shadowOffset: { width: 5, height: 8 },
        shadowOpacity: 0.4,
    },
    heading: {
        color: "green",
        textAlign: "center",
        fontSize: 28,
    },
    subheading: {
        color: "#45CB1D",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
    },
    subheadingAlt: {
        textAlign: "center",
        fontSize: 20,
    },
    input: {
        alignSelf: "stretch",
        backgroundColor: "white",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 0,
    },
    scrollview: {
        padding: 4,
    },
    button: {},
    padding: {
        paddingBottom: 40,
    },
});
