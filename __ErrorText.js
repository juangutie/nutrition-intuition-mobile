import React from "react";
import { StyleSheet, Text } from "react-native";

import Colors from "./_Colors";

export default ErrorText = (props) => {
    return (
        <Text
            style={
                props.message.trim() !== ""
                    ? { ...styles.error, ...props.style }
                    : { ...styles.no_error, ...props.style }
            }
        >
            {props.message}
        </Text>
    );
};

const styles = StyleSheet.create({
    error: {
        color: Colors.error,
        textAlign: "center",
        marginVertical: 12,
    },
    no_error: {
        color: Colors.error,
        textAlign: "center",
        marginVertical: 0,
    },
});
