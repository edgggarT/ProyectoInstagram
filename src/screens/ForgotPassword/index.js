
import FormForgotPassword from "../../components/FormForgotPassword"
import './style'


import React from "react"
import { View } from "react-native"
import { styles } from "./style"



function ForgotPassword() {

    return (
        <View style={styles.container}>
            <FormForgotPassword />
        </View>
    )
}

export default ForgotPassword;