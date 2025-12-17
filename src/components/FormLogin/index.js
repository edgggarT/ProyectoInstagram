import styles from "./style";
import LoginSchema from "./LoginSchema";

import {auth} from '../../../firebase'
import * as wb from 'expo-web-browser'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { ResponseType } from "expo-auth-session";

import {signInWithEmailAndPassword, FacebookAuthProvider, signInWithCredential, onAuthStateChanged} from 'firebase/auth'
import { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Input, Button, Text, Divider } from "react-native-elements";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";



const Logo = require('../../../assets/img/Logo.png')

wb.maybeCompleteAuthSession()

const FACE_APP_ID = "689844140587894"

function FormLogin() {
    
    const [showPassword, setShowPassword] = useState(true)
    const navigation = useNavigation()

    useEffect(() => {
        const persistence = onAuthStateChanged(auth, (user) => {
            if (user) {
                Toast.show({
                    type: "success",
                    visibilityTime: 3000,
                    text1: `Iniciando Sesion...`,
                    position: "top"
                })
                navigation.replace('Dashboard')
            } else {
                Toast.show({
                    type: "info",
                    visibilityTime: 3000,
                    text1: `No hay una cuenta logueada`,
                    position: "top"
                })
            }
        })
        return () => persistence()
    }, [])


    const [request, response, promptAsync] = Facebook.useAuthRequest({
        responseType: ResponseType.Token,
        clientId: FACE_APP_ID,
        scopes: ['public_profile', 'email']
    })

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleFacebookLogin = async (token) => {
        try {
            const FaceCredential = FacebookAuthProvider.credential(token)
            const userCredential = await signInWithCredential(auth, FaceCredential)
            const user = userCredential.user
            Toast.show({
                    type: "info",
                    visibilityTime: 3000,
                    text1: `Ingreso como ${user.displayName}!`,
                    position: "top"
                })
            console.log('Inicio de sesion exitoso con facebook: ', user.displayName)
        } catch (e) {
            if (e.code === "auth/account-exists-with-different-credential") {
                Toast.show({
                    type: "error",
                    visibilityTime: 3000,
                    text1: `Cuenta ya registrada con este email!`,
                    position: "top"
                })
            } else {
                Toast.show({
                    type: "error",
                    visibilityTime: 3000,
                    text1: `Error de inicio de sesion con Facebook!`,
                    position: "top"
                })
            }
            console.log('Error: ', e)
        }
    }


    useEffect(() => {
        if (response?.type === 'success') {
            const {access_token} = response.params;
            handleFacebookLogin(access_token)
        } else if (response?.type === 'cancel') {
            Toast.show({
                type: 'error',
                visibilityTime: 3000,
                text1: 'Login Cancelado',
                position: 'top'
            })
        }
    }, [response])


    const SingInWithFacebook = async () => {
        await promptAsync()
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
                console.log('Datos ingresado correctamente')
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
                <Input placeholder="Correo electronico"
                       style={styles.input}
                       onChangeText={formik.handleChange('email')}
                       onBlur={formik.handleBlur('email')}
                       value={formik.values.email}
                       errorMessage={formik.errors.email}
                       />
                <Input  placeholder="Contraseña"
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
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgPass}>Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
                <Button  title='Ingresar'
                         containerStyle={styles.btn}
                         onPress={formik.handleSubmit}
                         loading={formik.isSubmitting}/>
                <View style={styles.dividers}>
                    <Divider style={styles.divider1} width={2} />
                        <Text style={styles.dividerText}>O</Text>
                    <Divider style={styles.divider1} width={2} />
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={SingInWithFacebook}>
                    <View style={styles.loginfacecontainer}>
                        <Ionicons name="logo-facebook" size={20} color='#0f5defff'/>
                        <Text style={styles.loginFace}>Ingresar con facebook</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.dividerSingUp}>
                    <Divider width={2}/>
                </View>
                <View style={styles.singUpContainer}>
                    <Text style={styles.dontAcc}>
                        No tienes una cuenta? 
                    </Text>
                    <TouchableOpacity style={styles.buttonSingUp} activeOpacity={0.8}>
                        <Text style={styles.signUpLink} onPress={() => navigation.navigate('Register')}>
                            Registrate
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default FormLogin;