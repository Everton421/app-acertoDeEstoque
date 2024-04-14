import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Modal, Touchable, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from 'react-native';


export const acertoProduto = () => {
    const [produtos, setProdutos] = useState<any>();
    const [selectedItem, setSelectedItem] = useState<any>({})
    const [pesquisa, setPesquisa] = useState();
    const [visible, setVisible] = useState(false);
    const [novoSaldo, setNovoSaldo] = useState(0);
    const [setor, setSetor] = useState();
    const [selectedSetor, setSelectedSetor] = useState<any>();
    const [saldoSistema, setSaldoSistema] = useState();

    const Item = ({ item }:any) => {
        return (
            <View>
                <Text>
                    {item.codigo}
                </Text>
            </View>

        )
    }

    function closeModal() {
        setVisible(false);
        setSelectedSetor(undefined);
    }


    async function postSaldo() {

        if( !selectedSetor ){
            Alert.alert('selecione um setor ')
            return;
        }

        if(selectedSetor){
            selectedItem.estoque = selectedSetor.estoque
            selectedItem.setor = selectedSetor.codigo
        }


    //    try {
    //        const res = await api.post(`/acerto/`, selectedSetor);
    //        if(res !== undefined){
    //             Alert.alert(`produto ${selectedSetor.produto} atualizado com successo `)
    //            console.log(res.data)
    //            closeModal();
    //            setNovoSaldo(0);
    //            }
    //    } catch (err) {
    //        console.log(err);
    //    }
        console.log(selectedItem)
}

    function toggleSelection(item: any) {
        setVisible(true);
        setSelectedItem(item);
    }

    function adicionaPesquisa(dado:any) {
        setPesquisa(dado);
    }

    function renderItem(item: any) {
        function atualizaSaldo(v: any) {
            setSaldoSistema(selectedSetor?.estoque);
            setNovoSaldo(v);
            let aux = parseInt(v)
            selectedSetor.estoque = aux;
            //item.estoque = v;
        }
        return (
            <TouchableOpacity style={styles.item}
                onPress={() => toggleSelection(item)}
                
            >

                <Text

                >CODIGO: {item.codigo} </Text>
                <Text style={styles.txt}>  {item.descricao}</Text>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    

                    <Modal
                        visible={visible}
                    >
                        <View style={{ paddingHorizontal: 3 }}>


                            <Button  onPress={() => closeModal()} 
                                title="voltar"
                            />

                            <View style={{ backgroundColor: '#74d5e4', borderRadius: 5, width: 'auto', margin: 3, padding: 15, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    CODIGO: {selectedItem?.codigo}
                                </Text>

                                <Text>
                                    {selectedItem?.descricao}
                                </Text>
                            </View>



                            {selectedSetor !== undefined ?

                                <View >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }} >setor: {selectedSetor.nome}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }} >saldo atual: {saldoSistema}</Text>
                                    </View>

                                    <View>
                                        <Text>
                                            novo saldo {novoSaldo}
                                        </Text>
                                    </View>

                                    <View style={{ alignItems: 'center' }}>
                                        <TextInput style={{ borderWidth: 1, marginTop: 5, borderRadius: 5, width: '80%', paddingHorizontal: 5 }}
                                            onChangeText={(v) => atualizaSaldo(v)}
                                            placeholder="ex. 5"
                                        />


                                    </View>
                                </View>

                                :
                                <View style={{borderWidth:1, borderColor:'black', marginTop:5, margin:5, borderRadius:6}}>
                                    <View style={{ alignItems: 'center' }} >
                                        <Text>selecione um setor</Text>
                                    </View>
                                    <View >
                                        { setor === undefined ?
                                        <Text>carregando setores...</Text>
                                            :
                                            <FlatList
                                            data={setor}
                                            renderItem={({ item }) => changeSetor(item)}
                                        />
                                        }
                                        


                                    </View>
                                </View>
                            }



                                <View style={{marginTop:50, alignItems:'center'}}>
                                    
                                    <TouchableOpacity style={{ backgroundColor:'#66b75e', borderRadius:5 ,width:250,height:40,  alignItems:'center'}}  onPress={() => postSaldo()} >
                                    <Text style={{color:'white'}}>
                                        gravar
                                    </Text>

                                    </TouchableOpacity>
                                </View>

                        </View>
                    </Modal>
                </View>

            </TouchableOpacity>
        )
    }
    function changeSetor(item:any) {
        return (
            <View style={{flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity onPress={() => setSelectedSetor(item)} style={{ backgroundColor: '#cf4943', margin: 10, padding: 7, borderRadius: 5, flexDirection:'row',justifyContent:'space-between', width:'70%' }}>
                <Text style={{ fontWeight: 'bold' }}>
                    CODIGO: {item.codigo}
                  
                </Text>
                <Text style={{ fontWeight: 'bold' }}>
                   SETOR: {item.nome}
                </Text>
                
            </TouchableOpacity>
            </View>
        )
    }

    

    useEffect(
        () => {

            async function busca() {
                try {
                    const aux = await api.get(`/produtos/${pesquisa}`);
                    setProdutos(aux.data);
                    //console.log(aux.data);
                } catch (err) {
                    console.log(err)
                }

                if (produtos) {
                    try {
                        const response = await api.get(`/setores`)
                        setSetor(response.data);
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
            busca();

                    //setSaldoSistema()
        }, [pesquisa, selectedItem]
    )



    return (
        <SafeAreaView >

            <View>
                <TextInput  placeholder="Round" onChangeText={(value) => adicionaPesquisa(value)} />
            </View>

            <FlatList
                data={produtos}
                renderItem={({ item }) => renderItem(item)}
            />

           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    txt: {
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: '#74d5e4', //#dcdcdd
        marginTop:25,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 4,
        paddingHorizontal: 70,
        marginTop: 3,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10
    },
})