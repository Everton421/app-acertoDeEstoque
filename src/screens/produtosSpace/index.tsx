import { useEffect, useState } from "react";
import { View,Text, TouchableOpacity, Modal, Button } from "react-native"
import { FlatList, TextInput } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { api } from "../../services/api";


export const ProdutosSpace = ()=>{
    const [pesquisa, setPesquisa] = useState();
    const [produtos, setProdutos] = useState<any>();
    const [selectedItem, setSelectedItem] = useState<any>({})
    const [visible, setVisible] = useState(false);
    const [selectedSetor, setSelectedSetor] = useState<any>();


    function closeModal() {
        setVisible(false);
        setSelectedSetor(undefined);
    }


    useEffect(
        () => {
            async function busca() {
                try {
                    if(!pesquisa){
                        setProdutos(null)
                    }
                    const aux = await api.get(`/empresa1/produtos/${pesquisa}`);
                    setProdutos(aux.data);
                    //console.log(aux.data);
                } catch (err) {
                    console.log(err)
                }
            }
            busca();
        }, [pesquisa, selectedItem]
    )



    function adicionaPesquisa(dado:any) {
        setPesquisa(dado);
    }

    function renderItem(item: any) {
        
        return (
            <TouchableOpacity style={ { backgroundColor: '#FFF', //#dcdcdd
            marginTop:25,
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
            borderRadius: 5,
            elevation:8
        } }
            >

                <Text
                style={{fontWeight:'bold'}}
                >CODIGO: {item.codigo} </Text>
                <Text style={{fontWeight:'bold'}}>  {item.descricao}</Text>
                <Text style={{fontWeight:'bold'}}> SKU:  {item.sku}</Text>
                

            </TouchableOpacity>
        )
    }
    return(
        <View style={{ backgroundColor: '#e9ecf1' }} >

        <View style={{backgroundColor:'#333', alignItems:'center', padding:8 , elevation:9}} >
            <TextInput  placeholder="pesquisa" onChangeText={(value) => adicionaPesquisa(value)} 
                style={{width:"75%",  backgroundColor:"#FFF", padding:5,  borderRadius:20}}
            />
        </View>

        <FlatList
            data={produtos}
            renderItem={({ item }) => renderItem(item)}
        />

       
    </View>
    )
}