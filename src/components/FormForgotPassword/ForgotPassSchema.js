import * as yup from 'yup'

export const ForgotPassSchema = yup.object({
    email: yup.string().email('Email invalido!').required('Este campo es obligatorio!')
})

