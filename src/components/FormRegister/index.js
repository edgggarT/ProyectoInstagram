import {View, Text} from "react-native";
import { useState } from "react";
import {useFormik} from "formik";
import {Input, Button} from "react-native-elements";
import { initialValues, Validar, validationSchema, Variables } from "./index.data";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { style } from "./index.style";
import Toast from 'react-native-toast-message';
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { TextLarge, TextMedium, TextSmall } from "../Text";




export function FormRegister() {
    const navigation= useNavigation ();
   
    const [showPassword, setShowPassword] = useState (false)
    const formik = useFormik({
        initialValues: Variables(),
        validationSchema: Validar(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
            const auth = getAuth();

            await createUserWithEmailAndPassword(auth,formValue.email,formValue.password);
            navigation.reset({
            index: 0,
            routes: [{ name: "Onboarding" }],
            });


            Toast.show({
                type: "success",
                position: "bottom",
                text1: "Usuario creado correctamente",
            });
            } catch (error) {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "Usuario o contraseña incorrecta",
            });
            console.log(error);
            }
        },
    });

    const opcionesContraseña = () => {
    setShowPassword(!showPassword)
    }
    return (
        <View style={style.screen1} >
            <TextLarge text="¿Cuál es tu correo electronico?" />
            <TextMedium text="Ingresa un correo electronico de contacto.Nadie más lo verá en tu perfil" />
            <Input
                placeholder="Correo electrónico"
                value={formik.values.email}
                inputContainerStyle={style.inputContainer}
                inputStyle={style.input}
                placeholderTextColor="#888"
                onChangeText={(text) => formik.setFieldValue("email", text)}
                errorMessage={formik.errors.email}
                />

            
             <TextLarge text="¿Crea una contraseña?" />
             <TextMedium text="Crea una contraseña que tenga al menos 6 letras o números.Debe ser algo dificil de adivinar." />
           <Input
                placeholder="Password"
                value={formik.values.password}
                secureTextEntry={!showPassword}
                inputContainerStyle={style.inputContainer}
                inputStyle={style.input}
                placeholderTextColor="#888"
                onChangeText={(text) => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
                rightIcon={
                    <MaterialCommunityIcons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#888"
                    onPress={opcionesContraseña}
                    />
                }
                />

                
               <TextLarge text="Crea un nombre de usuario" />
                <TextMedium text="Agrega un nombre de usuario o usa el que te sugerimos.Puedes cambiarlo cuando quieras." />
                <Input
                placeholder="Nombre de usuario"
                value={formik.values.nombre}
                inputContainerStyle={style.inputContainer}
                inputStyle={style.input}
                placeholderTextColor="#888"
                onChangeText={(text) => formik.setFieldValue("nombre", text)}
                errorMessage={formik.errors.nombre}
                />

             <Image
                source={require("../../../../assets/img/condiciones.jpg")}
                style={style.Image}
            />

            <TextLarge text="Para registrarte, lee y acepta nuestras condiciones" />
            <TextMedium text="Puntos clave que debes tener en cuenta" />
            
        <View style={style.ventana}>
          <Image
            source={require("../../../../assets/img/icono4.png")}
            style={style.ico}
          />
          <Text style={style.condiciones}>
            Usamos tu información para crear una cuenta, mostrarte anuncios y
            contenidos que podrían gustarte.{" "}
            <Text style={style.condiciones2}>Más información</Text>
          </Text>
        </View>

        <View style={style.ventana}>
          <Image
            source={require("../../../../assets/img/icono2.png")}
            style={style.ico}
          />
          <Text style={style.condiciones}>
            Puedes optar por proporcionar información con protección especial
            según tu legislación local.{" "}
            <Text style={style.condiciones2}>Más información</Text>
          </Text>
        </View>

        <View style={style.ventana}>
          <Image
            source={require("../../../../assets/img/icono5.png")}
            style={style.ico}
          />
          <Text style={style.condiciones}>
            Puedes acceder a tu información, modificarla o eliminarla.{" "}
            <Text style={style.condiciones2}>Más información</Text>
          </Text>
        </View>

        <View style={style.ventana}>
          <Image
            source={require("../../../../assets/img/icono3.png")}
            style={style.ico}
          />
          <Text style={style.condiciones}>
            Es posible que otras personas hayan subido tu información de contacto.
            <Text style={style.condiciones2}> Más información</Text>
          </Text>

  </View>
            <Button title="Registrarse"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
           
            />
           
    <TextSmall text="¿ya tengo una cuenta?" onPress={() => navigation.navigate("Login")}
/>
    </View>
    )
}
