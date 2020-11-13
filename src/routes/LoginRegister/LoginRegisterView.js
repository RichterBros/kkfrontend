import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
    Image
} from 'react-native';
import FullPage from "../../common/FullPage";

import KKButton from "../../common/KKButton";

const {width, height} = Dimensions.get("window");
const LoginRegisterView = (props) => (
    <FullPage>
        <ImageBackground
            height={height}
            width={width}
            style={{width:width, height, flex:1, alignSelf: 'stretch'}}
            resizeMode={"cover"}
            source={require("../../../assets/images/children-cute-excited-225017.jpg")}>
            <View style={styles.logoContainer}>
                <Image
                    style={{width: width * 0.75}}
                    source={require("../../../assets/images/kk-combo.png")} />
            </View>
            <View style={styles.buttonContainer}>
            <KKButton type="primary" to={"/nonauth/onboarding/1"}>Take a tour!</KKButton>
                <KKButton type="primary" to={"/nonauth/login"}>Login</KKButton>
                <KKButton type="secondary" to='/nonauth/registerchooseparentchild'>Register</KKButton>
            </View>
        </ImageBackground>
    </FullPage>
);

const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        height: height * 0.35,
        alignSelf: 'stretch',
        alignItems: 'center'
    }
});

export default LoginRegisterView;