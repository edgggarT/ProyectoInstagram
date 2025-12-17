

import { EnterCodeSchema } from "./EnterCodeSchema";
import {styles} from './style'

import { useFormik } from "formik";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";


function FormEnterCode() {

    const formik = useFormik({
        validationSchema: EnterCodeSchema,
        initialValues: {code: ''},
        onSubmit: (values, {setSubmitting}) => {

        }

    })


    return (
        <View style={styles.container}>
            <View style={styles.text}> 
                <Text style={styles.title}>Enter Your Security Code</Text>
                <Text style={styles.subtitle}>Enter the 6-digit code we sent to the email address</Text>
            </View>
            <View style={styles.formBody}>
                <Input onChangeText={formik.handleChange('code')}
                       onBlur={formik.handleBlur('code')}
                       errorMessage={formik.errors.code}
                       placeholder="Code"
                       value={formik.values.code}/>
                <Button title='Confirm Code'
                        onPress={formik.handleSubmit}
                        disabled={!formik.isValid}
                        loading={formik.isSubmitting}/>
            </View>
        </View>
    )
}

export default FormEnterCode;