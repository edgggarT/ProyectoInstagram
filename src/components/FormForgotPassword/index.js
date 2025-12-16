import { ForgotPassSchema } from "./ForgotPassSchema";

import {sendPasswordResetEmail} from 'firebase/auth'
import {auth} from '../../../firebase'

import styles from "./style"
const Padlock = require('../../../assets/img/padlock.png')

import React from "react";
import { View, Text, Image, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";


function FormForgotPassword() {

    const formik = useFormik({
        initialValues: {email: ''},
        validationSchema: ForgotPassSchema,
        onSubmit: async (values, {setSubmitting}) => {
            try {
                await sendPasswordResetEmail(auth, values.email)
                Toast.show({
                    type: 'success',
                    text1: '¡Enlace Enviado!',
                    text2: 'Revisa tu bandeja de entrada (incluyendo spam).',
                    visibilityTime: 6000,
                });
            } catch (e) {
                console.error("Error en firebase", e.code)
                Alert.alert(title='Problema de servicio', 'El servicio asociado esta teniendo problemas')
            } finally {
                setSubmitting(false)
            }
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.containerText}>
                <Image source={Padlock} style={styles.padlock}/>
                <Text style={styles.title}>Problemas para iniciar sesion?</Text>
                <Text style={styles.subtitle}>Ingresa tu correo electronico para que podamos mandarte un codigo para que recuperes tu cuenta</Text>
            </View>
            <View style={styles.formBody}>
                <Input placeholder="Correo electronico"
                       onChangeText={formik.handleChange('email')}
                       onBlur={formik.handleBlur('email')} 
                       errorMessage={formik.errors.email}
                       value={formik.values.email}
                       style={styles.input}/>
                <Button title='Enviar enlace de recuperacion'
                        onPress={formik.handleSubmit}
                        loading={formik.isSubmitting}/>
            </View>
        </View>
    )
}

export default FormForgotPassword;