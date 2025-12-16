import { ScrollView} from "react-native";

import { FormRegister } from "../../components/FormRegister";
import { style} from  "./index.style"

function Register() {
    return (
        <ScrollView style={style.container} >
                <FormRegister />
        </ScrollView>
    );
}

export default Register;