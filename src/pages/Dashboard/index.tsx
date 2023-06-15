import React, {useContext, useState} from "react";

import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet} from "react-native";

import { AuthContext } from "../../contexts/AuthContext";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";

export default function Dashboard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [number, setNumber] = useState('');

    async function openOrder(){
        
        if(number === ''){
            return;
        }

    const response = await api.post('/order', {table: Number(number)})

    navigation.navigate('Order', {number: number, order_id: response.data.id})

    setNumber('');

    }



    const {signOut} = useContext(AuthContext);


    return(
        <SafeAreaView style={styles.container}>
                    
            <Text style={styles.title}>Abrir Mesa</Text>
            
            <TextInput placeholder="Digite o número da mesa" style={styles.input} 
            keyboardType="numeric" value={number} onChangeText={setNumber} />

            <TouchableOpacity style={styles.buttonAbrir}>
                <Text style={styles.buttonText} onPress={openOrder}>Abrir Mesa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSair} onPress={signOut} >
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        color: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        color: '#FFF',
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold'

    },

    input: {
        width: '90%',
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 20
    },

    buttonAbrir: {
        width: '90%',
        backgroundColor: '#F00',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },

    buttonSair: {
        width: '90%',
        backgroundColor: '#666',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
        
    },

    buttonText: {
        color: '#FFF',
        fontSize: 20
        
    }
})