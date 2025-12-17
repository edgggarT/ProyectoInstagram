import * as yup from 'yup'

export const ResetPasswordSchema = yup.object({
    newPassword: yup.string()
                    .required('Este campo es obligatorio!')
                    .min(8, 'Debe tener almenos 8 caracteres!')
                    .max(50, 'No puede tener mas de 50 caracteres!')
                    .matches(/[a-z]/, 'Debe contener almenos una minuscula!')
                    .matches(/[A-Z]/, 'Debe contener almenos una mayuscula!')
                    .matches(/[_]/, 'Debe contener almenos un guion bajo!')
                    .matches(/[1-9]/, 'Debe contener almenos un numero!'),
    confirmNewPassword: yup.string().oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden')
})