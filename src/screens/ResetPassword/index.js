import FormResetPassword from "../../components/FormResetPassword";
import styles from "./style";

import { View, Text } from "react-native";
import React from "react";



function ResetPassword() {

    return (
        <View style={styles.container}>
            <FormResetPassword />
        </View>
    )
}


export default ResetPassword;