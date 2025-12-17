import * as Yup from "yup";

// Función de valores iniciales para el formulario
export function initialValues() {
  return {
    displayName: "", // Campo de nombre de usuario
  };
}

// Validación con Yup
export function validationSchema() {
  return Yup.object({
    displayName: Yup.string().required("El nombre es obligatorio"),
  });
}
