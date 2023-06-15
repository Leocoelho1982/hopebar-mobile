import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons  } from '@expo/vector-icons'; 
import { api } from "../../services/api";

interface ItemProps {
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    };
    deleteItem: (item_id: string) => void;
}



export function ListItem( { data, deleteItem } : ItemProps){

    function handleDeleteItem(){
        deleteItem(data.id)
    }

    return(
    <View style={styles.container}>
        <Text style={styles.itemText}>
            {data.amount} - {data.name}
        </Text>

        <TouchableOpacity onPress={ handleDeleteItem}>
            <Ionicons name='trash-sharp' size={30} color='#F00' />
        </TouchableOpacity>

    </View>
    )
}


const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#111',
        marginBottom: 10,
        paddingVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 8,
        borderColor: '#FFF',
        borderWidth: 0.5


    },

    itemText: {
        color: '#FFF',
        textTransform: 'uppercase'
    }
})