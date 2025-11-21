import { ForgotPassSchema } from "./ForgotPassSchema";

import styles from "./style"
const Padlock = require('../../../assets/img/padlock.png')

import React from "react";
import { View, Text, Image, InputAccessoryView } from "react-native";
import { Input, Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";


function FormForgotPassword() {

    const formik = useFormik({
        initialValues: {email: ''},
        validationSchema: ForgotPassSchema,
        onSubmit: (values, {setSubmitting}) => {

        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.containerText}>
                <Image source={Padlock} style={styles.padlock}/>
                <Text style={styles.title}>Trouble Logging in?</Text>
                <Text style={styles.subtitle}>Enter your email and we'll send you a code to get back into your account</Text>
            </View>
            <View style={styles.formBody}>
                <Input placeholder="Email"
                       onChangeText={formik.handleChange('email')}
                       onBlur={formik.handleBlur('email')} 
                       errorMessage={formik.errors.email}
                       value={formik.values.email}
                       style={styles.input}/>
                <Button title='Send Login Link'
                        onPress={formik.handleSubmit}
                        disabled={!formik.isValid}
                        loading={formik.isSubmitting}/>
            </View>
        </View>
    )
}

export default FormForgotPassword;