import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {Feather} from '@expo/vector-icons';

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";

type RouteDetailParams = {
    FinishOrder: {
        number: string | number;
        order_id: string;
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export function FinishOrder(){
    const route = useRoute<FinishOrderRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function handleFinish(){
        try{
            await api.put('/order/send', {order_id: route.params?.order_id})

            navigation.popToTop();

        }catch(err){
            console.log('ERRO AO FINALIZAR. Tente mais tarde')
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.alert}>
                Finalizar este pedido?
            </Text>
            <Text style={styles.title}>
                Mesa: {route.params?.number}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton}>Finalizar Pedido</Text>
                <Feather size={20} name="shopping-cart" color="#FFF" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        paddingHorizontal: '4%',
        paddingVertical: '4%'

    },

    alert: {
        color: '#FFF',
        fontSize: 24,
        marginBottom: 10
    },

    title: {
        color: '#FFF',
        fontSize: 32,
        marginBottom: 25
    },

    button: {
        backgroundColor: '#F00',
        width: '80%',
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    textButton: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 20
    }
})