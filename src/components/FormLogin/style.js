import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#1c1b1bff',
        padding: 1,
    },
    subcontainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        paddingVertical: '12%',
    },
    title: {
        fontSize: 20,
        color:'#fff',
        textAlign: 'center'
    },
    btn: {
        paddingHorizontal: 10,
    },
    input: {
        color: '#fff',
    },
    forgPass: {
        color: '#0fa0efff',
        display: "flex",
        textAlign: "right",
        marginBottom: '7%',
        marginRight: '3%',
    },
    image: {
        width: '100%',
        height: '20%',
        resizeMode: 'contain'
    },

    divider1: {
        color: '#fff',
        width: 135,
        marginVertical: 15,
        marginHorizontal: 35,
    },
    dividers: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dividerText: {
        color: '#fff',
        fontSize: 10,
        marginVertical: 10,
    },
    loginFace: {
        color: '#0f5defff',
        marginHorizontal: 5,
        fontSize: 15,
        fontWeight: "700",
    },
    loginfacecontainer: {
        display: "flex",
        justifyContent: 'center',
        flexDirection: "row",
        marginTop: 20,
    },
    dividerSingUp: {
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    singUpContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20,
    },
    dontAcc: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'center'
    },
    signUpLink: {
        color: '#0fa0efff'
    }
})

export default styles;