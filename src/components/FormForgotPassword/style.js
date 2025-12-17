import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efe9e9ff',
        display: 'flex',
        justifyContent: 'flex-start',
    },
    containerText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    padlock: {
        width: '100%',
        height: '50%',
        resizeMode: 'center'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        color: 'gray',
        marginHorizontal: 60,
        marginTop: 6, 
    },
    formBody: {
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal: 25,
    },
    input: {
        color: '#000000ff'
    }
})

export default styles;