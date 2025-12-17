
import { View } from "react-native";

import styles from "./style";

import FormLogin from "../../components/FormLogin"


function Login() {

    return (
        <View style={styles.container}>
            <FormLogin />
        </View>
    )
}

export default Login;