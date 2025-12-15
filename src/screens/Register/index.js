import { ScrollView} from "react-native";

import { FormRegister } from "../../components/FormRegister";
import { style} from  "./index.style"

export default function Register() {
    return (
        <ScrollView style={style.container} >
                <FormRegister />
        </ScrollView>
    );
}