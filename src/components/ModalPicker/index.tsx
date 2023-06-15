import React from "react"

import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";

import { CategoryProps } from "../../pages/Order";

interface ModalPickerProps{
    options: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: (item: CategoryProps) => void;
}

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

export function ModalPicker({ options, handleCloseModal, selectedItem}: ModalPickerProps){

    function onPressItem(item: CategoryProps){
        selectedItem(item);
        handleCloseModal();

    }

    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={ () => onPressItem(item)}>
            <Text style={styles.textItem}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    ))
    return(
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                 {option}
                </ScrollView>
            </View>

        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },

    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1

    },

    option: {
        alignItems: 'flex-start',
        borderTopWidth: 1,
        borderTopColor: '#CCC'

    },

    textItem: {
        textTransform: 'uppercase',
        margin: 18,
        fontWeight: 'bold'
    }
})
