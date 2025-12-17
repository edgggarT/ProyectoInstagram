import * as Yup from 'yup';


export function Variables(){
    return{
        email:"",
        nombre:"",
        password:"",


    };
}


export function Validar(){
    return Yup.object({
        email: Yup.string().email("el email ingresado no es valido").required("No se puede dejar vacio este campo"),        
        nombre:Yup.string()
        .required("No se puede dejar vacio este campo")
        .min(3, "Mínimo 3 caracteres")
        .max(24, "Máximo 24 caracteres"),
        password: Yup.string()
        .required("No se puede dejar vacío este campo")
        .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
        .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .matches(/[0-9]/, "Debe contener al menos un número")
        .min(8, "Debe tener al menos 8 caracteres"),
    });
}
