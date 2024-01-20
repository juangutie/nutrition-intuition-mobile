import React from "react";
import { View, StyleSheet } from "react-native";

export default Screen = (props) => {
    return (
        <View {...props} style={{ ...styles.screen, ...props.style }}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
});
