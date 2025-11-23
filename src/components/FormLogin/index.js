import styles from "./style";
import LoginSchema from "./LoginSchema";

import {auth} from '../../../firebase'
import * as Facebook from 'expo-facebook'

import {signInWithEmailAndPassword, FacebookAuthProvider, signInWithCredential} from 'firebase/auth'
import { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Input, Button, Text, Divider } from "react-native-elements";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";



const Logo = require('../../../assets/img/Logo.png')

const FACE_APP_ID = "689844140587894"

function FormLogin() {
    
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleFacebookLogin = async () => {
        try {
            
            await Facebook.initializeAsync({
                appId: FACE_APP_ID,
            })
            
            const {type, token} = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            })

            
            if (type === 'success') {
                const FaceToken = token
    
                const FaceCredential = FacebookAuthProvider.credential(FaceToken)
                const userCredential = await signInWithCredential(auth, FaceCredential)
                const user = userCredential.user
                Toast.show({
                        type: "info",
                        visibilityTime: 3000,
                        text1: `Ingreso como ${user.displayName}!`,
                        position: "top"
                    })

            } else if (type === 'cancel') {
                Toast.show({
                        type: "error",
                        visibilityTime: 3000,
                        text1: "Login cancelado!",
                        position: "top"
                    })
            }


        } catch (e) {
            console.log('Error: ', e)
            Toast.show({
                    type: "error",
                    visibilityTime: 3000,
                    text1: 'No fue posible ingresa con Facebook!',
                    position: "top"
                })
        }
    }



    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, {setSubmitting}) => {
            try {
                await signInWithEmailAndPassword(auth, values.email, values.password)                
                Toast.show({
                    type: "success",
                    visibilityTime: 3000,
                    text1: 'Inicio de sesion exitoso!',
                    position: "top"
                })
                console.log('Datos ingresado correctament')
            } catch (e) {
                Toast.show({
                    type: 'error',
                    visibilityTime: 3000,
                    text1: 'Error de inicio de sesion',
                    position: "top"
                })
            } finally {
                setSubmitting(false)
            }
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Image source={Logo} style={styles.image}/> 
                <Input placeholder="Email Address"
                       style={styles.input}
                       onChangeText={formik.handleChange('email')}
                       onBlur={formik.handleBlur('email')}
                       value={formik.values.email}
                       errorMessage={formik.errors.email}
                       />
                <Input  placeholder="Password"
                        secureTextEntry={showPassword}
                        onChangeText={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                        value={formik.values.password}
                        errorMessage={formik.errors.password}
                        rightIcon={
                            <TouchableOpacity onPress={handleShowPassword}>
                                {showPassword ? <Ionicons name="eye" size={30} color='#686868ff'/> : <Ionicons name="eye-off" size={30} color='#686868ff'/>}
                            </TouchableOpacity>
                    }
                        style={styles.input}
                        />
                <Text style={styles.forgPass}>Forgotten Password?</Text>
                <Button  title='Log in'
                         containerStyle={styles.btn}
                         onPress={formik.handleSubmit}
                         loading={formik.isSubmitting}/>
                <View style={styles.dividers}>
                    <Divider style={styles.divider1} width={2} />
                    <Text style={styles.dividerText}>OR</Text>
                    <Divider style={styles.divider1} width={2} />
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={handleFacebookLogin}>
                    <View style={styles.loginfacecontainer}>
                        <Ionicons name="logo-facebook" size={20} color='#0f5defff'/>
                        <Text style={styles.loginFace}>Log in with Facebook</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.dividerSingUp}>
                    <Divider width={2}/>
                </View>
                <View style={styles.singUpContainer}>
                    <Text style={styles.dontAcc}>
                        Dont have an account? 
                    </Text>
                    <TouchableOpacity style={styles.buttonSingUp} activeOpacity={0.8}>
                        <Text style={styles.signUpLink}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default FormLogin;