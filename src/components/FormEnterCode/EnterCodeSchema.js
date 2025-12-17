import * as yup from 'yup'

export const EnterCodeSchema = yup.object({
    code: yup.number('Debe ser un numero!').max(6, 'Maximo de 6 digitos').min(6, 'Minimo de 6 digitos')
})
