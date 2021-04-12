import React from "react";
import { StyleSheet } from "react-native";
import { Video } from "expo-av";

import LoginRegisterCard from "./___LoginRegisterCard";
import Screen from "./__Screen";

export default LoginRegisterScreen = () => {
    return (
        <Screen>
            <Video
                source={require("./media/background.mp4")}
                style={styles.background_video}
                resizeMode={Video.RESIZE_MODE_STRETCH}
                useNativeControls={false}
                shouldPlay={true}
                isLooping={true}
            />
            <LoginRegisterCard />
        </Screen>
    );
};

const styles = StyleSheet.create({
    background_video: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
