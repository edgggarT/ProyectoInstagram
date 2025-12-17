
import FormEnterCode from "../../components/FormEnterCode";
import { styles } from "./style";

import React from "react";
import { View } from "react-native";


function EnterCode() {

    return (
        <View style={styles.container}>
            <FormEnterCode />
        </View>
    )
}

export default EnterCode;
