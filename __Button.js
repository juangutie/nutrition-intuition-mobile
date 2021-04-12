import React, { useState } from "react";
import { StyleSheet, Pressable, Text } from "react-native";

import Colors from "./_Colors";

export default Button = (props) => {
    const [buttonStyle, setButtonStyle] = useState(styles.button);

    const pressInHandler = () => {
        setButtonStyle(styles.button_pressed);
        if (props.onPressIn !== undefined) props.onPressIn();
    };

    const pressOutHandler = () => {
        setButtonStyle(styles.button);
        if (props.onPressOut !== undefined) props.onPressOut();
    };

    return (
        <Pressable
            onPress={props.onPress}
            {...props}
            style={{ ...buttonStyle, ...props.style }}
            onPressIn={pressInHandler}
            onPressOut={pressOutHandler}
        >
            <Text style={styles.button_title}>{props.title}</Text>
            {props.children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.mint_green,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 14,
        marginVertical: 12,
        marginHorizontal: 0,
        borderRadius: 5,
    },
    button_pressed: {
        backgroundColor: Colors.off_green,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 14,
        marginVertical: 12,
        marginHorizontal: 0,
        borderRadius: 5,
    },
    button_title: {
        color: Colors.off_white,
        fontSize: 20,
        fontWeight: "bold",
    },
});
