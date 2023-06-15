import react, {useState, useEffect} from 'react';

import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { Ionicons  } from '@expo/vector-icons'; 

import { api } from '../../services/api';

import { ModalPicker } from '../../components/ModalPicker';
import { ListItem } from '../../components/ListItem';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParamsList } from '../../routes/app.routes';

type RouteDetailParams = {
    Order: {
        number: number | string;
        order_id: string
    }
}

type ProductProps = {
    id: string;
    name: string;
}

export type CategoryProps = {
    id: string;
    name: string;
}

type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order(){
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>();
    const [modalProductVisible, setModalProductVisible] = useState(false);

    const [amount, setAmount] = useState('1');

    const [items, setItems] = useState<ItemProps[]>([]);

    useEffect(() => {
        async function loadInfo(){
            const response = await api.get('/category')
            setCategory(response.data)
            setCategorySelected(response.data[0])
        }

        loadInfo();
    }, [])

    useEffect(() => {
        async function loadProducts(){
            const response = await api.get('/category/product', {
                params:{
                    category_id: categorySelected?.id
                }
            })
            setProducts(response.data);
            setProductSelected(response.data[0])
        }

        loadProducts();

    }, [categorySelected])


    async function handleCloseOrder(){
        try{

            await api.delete('/order', {params: {order_id: route.params?.order_id}})

            navigation.goBack();

        }catch(err){
            console.log(err)

        }
    }

    async function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item);

    }

    async function handleChangeProduct(item: ProductProps){
        setProductSelected(item);
    }

    async function handleAdd(){
        const response = await api.post('/order/add', {
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        })

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray, data])
    }

    async function handleDeleteItem(item_id: string){

        await api.delete('/order/remove', {
            params: {
                item_id: item_id
            }
        })

        let removeItem = items.filter( item => {
            return (item.id !== item_id)
        })

        setItems(removeItem)
    }

    function handleFinishOrder(){
        navigation.navigate('FinishOrder', {number: route.params?.number, order_id: route.params?.order_id})
    }

    return(
        <SafeAreaView style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                {items.length === 0 && (
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Ionicons name='trash-sharp' size={30} color='#F00' />
                </TouchableOpacity>
                )}
            </View>

            {category.length !== 0 && (

            <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                <Text style={{textTransform: 'uppercase'}}>
                    {categorySelected?.name}
                </Text>
            </TouchableOpacity>

            )}

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{textTransform: 'uppercase'}}>
                        {productSelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            <View style={styles.quantidade}>
                <Text style={styles.qtdTitle}>Quantidade: </Text>
                <TextInput style={[styles.input, {width: '60%', textAlign:'center'}]} value={amount} onChangeText={setAmount} keyboardType='numeric' />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={ handleAdd }>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]} disabled={items.length === 0} onPress={handleFinishOrder}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>

            </View>

            <FlatList 
                showsVerticalScrollIndicator={false} 
                style={{ flex: 1, marginTop: 24}} 
                data={items} 
                keyExtractor={(item) => item.id} 
                renderItem={ ({ item }) => <ListItem data={item} deleteItem={handleDeleteItem}></ListItem>}
            />



            <Modal transparent={true} visible={modalCategoryVisible} animationType='fade'>
                <ModalPicker handleCloseModal={ () => {setModalCategoryVisible(false)}} options={category} selectedItem={ handleChangeCategory } />
            </Modal>

            <Modal transparent={true} visible={modalProductVisible} animationType='fade'>
                <ModalPicker handleCloseModal={ () => {setModalProductVisible(false)}} options={products} selectedItem={ handleChangeProduct } />
            </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },

    header: {
        flexDirection: 'row',
        marginBottom: 12,
        marginTop: 20,
        alignItems: 'center'

    },

    title: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
        marginRight: 15
    },

    input: {
        borderRadius: 8,
        width: '100%',
        height: 40,
        backgroundColor: '#FFF',
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 10,
        fontSize: 20

    },

    quantidade: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30

    },

    qtdTitle: {
        color: '#FFF',
        fontSize: 20,
        marginRight: 10

    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },

    buttonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'

    },

    buttonAdd: {
        width: '30%',
        height: 60,
        backgroundColor: '#F00',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        borderRadius: 8

    },

    button: {
        backgroundColor: '#F00',
        width: '65%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8

    }

    
})