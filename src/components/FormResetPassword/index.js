import { ResetPasswordSchema } from "./ResetPasswordSchema";
import styles from "./style";

import React, {useState} from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { Ionicons } from "@expo/vector-icons";


function FormResetPassword() {

    const [showPass, setShowPass] = useState(true)

    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    const formik = useFormik({
        initialValues: {newPassword: '', confirmNewPassword: ''},
        validationSchema: ResetPasswordSchema,
        onSubmit: (values, {setSubmitting})=>{

        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.textContent}>
                <Text style={styles.title}>
                    Create A Strong Password
                </Text>
                <Text style={styles.subtitle}>
                    Your password must be at least 6 characters and should include a combination of numbers and letters
                </Text>
            </View>
            <View style={styles.formBody}>
                <Input onChangeText={formik.handleChange('newPassword')}
                       onBlur={formik.handleBlur('newPassword')}
                       placeholder="New Password"
                       value={formik.values.newPassword}
                       secureTextEntry={showPass}
                       errorMessage={formik.errors.newPassword}
                       style={styles.input}/>

                <Input onChangeText={formik.handleChange('confirmNewPassword')}
                       onBlur={formik.handleBlur('confirmNewPassword')}
                       placeholder="Confirm new password"
                       value={formik.values.confirmNewPassword}
                       secureTextEntry={showPass}
                       errorMessage={formik.errors.confirmNewPassword}
                       rightIcon={
                        <TouchableOpacity onPress={handleShowPass}>
                            {showPass ? <Ionicons name="eye" size={25} color='white'/> : <Ionicons name="eye-off" size={25} color='white'/>}
                        </TouchableOpacity>
                       }
                       style={styles.input}/>

                <Button title='Reset Password'
                        loading={formik.isSubmitting}
                        onPress={formik.handleSubmit}/>
            </View>
        </View>
    )
}

export default FormResetPassword;