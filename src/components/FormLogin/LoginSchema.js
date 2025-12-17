import * as yup from 'yup'

const LoginSchema = yup.object({
    email: yup.string().email('Email invalido!'),
    password: yup.string()
})

export default LoginSchema;