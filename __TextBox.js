import React from "react";
import { StyleSheet, TextInput } from "react-native";

import Colors from "./_Colors";

export default TextBox = (props) => {
    return (
        <TextInput
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            {...props}
            style={{ ...styles.input, ...props.style }}
        >
            {props.children}
        </TextInput>
    );
};

const styles = StyleSheet.create({
    input: {
        textAlign: "center",
        color: Colors.input_text,
        backgroundColor: Colors.off_white,
        fontSize: 20,
        padding: 12,
        marginVertical: 10,
        marginHorizontal: 0,
        borderRadius: 5,
    },
});
