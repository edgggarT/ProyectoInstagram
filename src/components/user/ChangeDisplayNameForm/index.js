import { View, Alert } from "react-native";
import { useFormik } from "formik";
import { Input, Button } from "react-native-elements";
import Toast from "react-native-toast-message";
import { updateProfile, signOut } from "firebase/auth";
import { initialValues, validationSchema } from "./index.data";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../../firebase";

function ChangeDisplayNameForm({ onReload }) {

  const navigation = useNavigation()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async ({ displayName }, { setSubmitting }) => {
      try {
        if (!auth.currentUser) {
          throw new Error("Usuario no autenticado");
        }

        await updateProfile(auth.currentUser, {
          displayName: displayName.trim(),
        });

        Toast.show({
          type: "success",
          text1: "Nombre actualizado",
        });

        onReload(); // 👈 vuelve al Dashboard
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Error al cambiar nombre",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });


  const handleLogout = async () => {
    try {
      await signOut(auth)
      Toast.show({
        type: "info",
        visibilityTime: 3000,
        text1: 'Sesion cerrada!'
      })
      navigation.replace('Login')
    } catch (e) {
      Toast.show({
        type: 'error',
        visibilityTime: 3000,
        text1: 'No fue posible cerrar sesion!'
      })
    }
  }

  const handleAlertLogout = () => {
    Alert.alert(
      "Cerrar sesion",
      "Estas seguro de cerrar la sesion?",
      [
        {
          text: 'Aceptar',
          onPress: handleLogout,
          style: 'default'
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ],
      {cancelable: true}
    )
  }

  return (
    <View>
      <Input
        placeholder="Nuevo nombre"
        value={formik.values.displayName}
        onChangeText={formik.handleChange("displayName")}
        errorMessage={formik.errors.displayName}
      />

      <Button
        title="Cambiar nombre"
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
      <Button
        title="Cerrar sesion"
        type="outline"
        containerStyle={{backgroundColor: 'red', marginVertical: 3}}
        titleStyle={{color: 'white'}}
        onPress={handleAlertLogout}
      />
    </View>
  );
}

export default ChangeDisplayNameForm;