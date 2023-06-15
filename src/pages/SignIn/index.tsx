import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn(){

    const {signIn, loadingAuth} = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(){

        if(email === '' || password === ''){
            return;
        }

        await signIn({ email, password})

    }

    return(
        <KeyboardAvoidingView style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/hopebarlg-250.jpg')} />

            <Text style={styles.title}>administração</Text>

            <View style={styles.inputContainer}>

                <TextInput placeholder='Digite seu e-mail' style={styles.input} value={email} onChangeText={setEmail} />

                <TextInput placeholder='Digite sua senha' style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword}  />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    { loadingAuth ? (<ActivityIndicator size={40} color='#FFF' /> ) : (<Text style={styles.buttonText}>Acessar</Text>) }
                    
                </TouchableOpacity>

            </View>
            
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#000'
    },

    logo: {
        marginBottom: 20
    },

    title: {
        color:'#FFF',
        fontSize: 20,
        textTransform: 'uppercase',
        letterSpacing: 7,
        marginBottom: 20
    },

    inputContainer: {
        width: '95%',
        alignItems: 'center'
    },

    input: {
        width: '95%',
        height: 40,
        marginBottom: 12,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10
    },

    button: {
        width: '95%',
        backgroundColor: '#F00',
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    }

})