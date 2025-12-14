import { View } from "react-native";
import { useFormik } from "formik";
import { Input, Button } from "react-native-elements";
import Toast from "react-native-toast-message";
import { updateProfile } from "firebase/auth";
import { initialValues, validationSchema } from "./index.data";
import { auth } from "../../../util/firebase";

export function ChangeDisplayNameForm({ onReload }) {
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
    </View>
  );
}
