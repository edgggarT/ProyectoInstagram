import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        
    },
    textContent: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 40,
        gap: 10,
    },
    title: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    subtitle: {
        color: 'gray',
        fontSize: 15,
        textAlign: 'center',
        marginHorizontal: 40,
    },
    formBody: {
        marginHorizontal: 20,
        display: 'flex',
        justifyContent: 'center'
    },
    input: {
        color: 'white'
    }
})

export default styles;