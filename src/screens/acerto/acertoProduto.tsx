import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Modal, Touchable, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from 'react-native';


export const AcertoProduto = () => {
    const [produtos, setProdutos] = useState<any>();
    const [selectedItem, setSelectedItem] = useState<any>({})
    const [pesquisa, setPesquisa] = useState();
    const [visible, setVisible] = useState(false);
    const [novoSaldo, setNovoSaldo] = useState(0);
    const [setor, setSetor] = useState();
    const [selectedSetor, setSelectedSetor] = useState<any>();
    const [saldoSistema, setSaldoSistema] = useState();

    const [value, setValue] = useState<any>();

    function changeSetor(item:any) {
        return (
            <View style={{flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity onPress={() => setSelectedSetor(item)} style={{ backgroundColor: '#FFF', margin: 10, padding: 7, borderRadius: 5, flexDirection:'row',justifyContent:'space-between', width:'80%', elevation:5 }}>
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
                    const aux = await api.get(`/acerto/produtos/${pesquisa}`);
                    setProdutos(aux.data);
                    //console.log(aux.data);
                } catch (err) {
                    console.log(err)
                }
            }
            busca();
                    //setSaldoSistema()
        }, [pesquisa]
    )


useEffect( ()=>{
    async function busca(){
                try {
                    const response = await api.get(`/acerto/setores`)
                    setSetor(response.data);
                } catch (err) {
                    console.log(err);
                }
            }
            busca();

},[selectedItem]
)

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
        console.log(selectedItem)
    }

    function toggleSelection(item: any) {
        setVisible(true);
        setSelectedItem(item);
    }

    function adicionaPesquisa(dado:any) {
        setPesquisa(dado);
    }



  async function postAcerto(){
    try{

   await api.post('/acerto/',prod);
      
  //    console.log(prod)
    const response =  await api.post('/acerto/',prod);

    if(response.status ==200 ){
      Alert.alert(response.data.ok, `saldo ${prod.estoque}`)
      setNovoSaldo(0)
    }

      setSelectedSetor(undefined);      
      console.log(response.data)
    
    }catch(err) {
    console.log(err)
  }
  }

  function atualizaSaldo(v: any) {
    setSaldoSistema(selectedSetor?.estoque);
    setNovoSaldo(v);
    let aux = parseInt(v)
    selectedSetor.estoque = aux;
    //item.estoque = v;
}

    function renderItem(item: any) {
     
        return (
            <TouchableOpacity style={styles.item}
                onPress={() => toggleSelection(item)}
            >
                <Text
                >CODIGO: {item.codigo} </Text>
                <Text style={styles.txt}>  {item.descricao}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                </View>
            </TouchableOpacity>
        )
    }
    


    return (
        <View style={{backgroundColor:'#3331'}}>

            <View style={{margin:'3%' }}  >
                <TextInput  
                style={{ backgroundColor:'#FFF',padding:5, borderRadius:10, elevation:5 }}
                placeholder="PESQUISAR :" 
                onChangeText={(value) => adicionaPesquisa(value)}
                 />
            </View>
            
            <Modal visible={visible} >
                <View style={{ flex: 1,  backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems:'center' ,justifyContent:'center'}}>
                           
                           <View style={{ backgroundColor: "#f0f0f0", borderRadius: 7, marginTop: 40, padding: 20, elevation: 9 }}>
    

                             <TouchableOpacity onPress={() => closeModal()} style={{margin:10}}>
                                <Text style={{color:'red'}} >voltar</Text>
                             </TouchableOpacity>
                                     <Text style={{ fontWeight: 'bold' }}>
                                        CODIGO: {selectedItem?.codigo}
                                    </Text>
                                  <Text>
                                    {selectedItem?.descricao}
                                  </Text>
        {    selectedSetor !== undefined ?
                  <View >
                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                              <Text style={{ fontSize: 15, fontWeight:'bold', color: '#42414d' }} >setor: {selectedSetor?.nome}</Text>
                          </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                              <Text style={{ fontSize: 15, fontWeight:'bold', color: '#42414d'}}> novo saldo {novoSaldo} </Text>
                            {/** <Text style={{ fontSize: 15, fontWeight:'bold', color: '#42414d'}} >saldo atual: {saldoSistema}</Text>
                         */}
                         </View>

                       <View style={{ alignItems: 'center' }}>
                            <TextInput style={{ backgroundColor:'#FFF', marginTop: 5, borderRadius: 5,  paddingHorizontal: 95 , elevation:7}}
                               onChangeText={(v) => atualizaSaldo(v)}
                                placeholder="ex. 5"
                               keyboardType='numeric'
                            />

                        <TouchableOpacity style={{backgroundColor:"#FFF", borderRadius:5, alignItems:'center', elevation:7, marginTop:"15%", padding:8, width:"80%"}}
                          onPress={()=> postAcerto()}
                           >
                        <Text  style={{ fontSize: 15, fontWeight:'bold', color: '#42414d'}} >
                          GRAVAR
                        </Text>
                      </TouchableOpacity>
                      
                      </View>
                  </View>

                  :
                  <View style={{borderWidth:1, borderColor:'#333', marginTop:5, borderRadius:6 }}>
                      <View style={{ alignItems: 'center' }} >
                          <Text>selecione um setor</Text>
                      </View>
                      <View style={{padding:5,  maxHeight:200, overflow:'scroll'}}>
                         
                          { setor === undefined ?
                          <Text>carregando setores...</Text>
                              :
                              <FlatList
                              data={setor}
                              //horizontal= {true}
                              renderItem={({ item }) => changeSetor(item)}
                              keyExtractor={item => item.codigo}
                            />
                          }
                      </View>
                  </View>
                  }
                               </View>
                          
                                
                        </View>

                    </Modal>

            <View >
                    <FlatList
                        data={produtos}
                        renderItem={({ item }) => renderItem(item)}
                        keyExtractor={ item =>item.codigo}
                    />
            </View>
                
        </View>
    )
}

const styles = StyleSheet.create({
    txt: {
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: '#FFF', //#dcdcdd
        elevation:5,
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