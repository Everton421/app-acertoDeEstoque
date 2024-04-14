import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Modal, TouchableOpacity, ScrollView, TouchableOpacityBase } from 'react-native';
import { Camera } from 'expo-camera';
import { api } from '../../services/api';
import { FlatList, TextInput } from 'react-native-gesture-handler';

export default function AcertoCamera() {

 

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [value, setValue] = useState<any>();
  const [prod, setProd] = useState<any>([]);

  const [saldo, setSaldo] = useState(0);

  
  
  const [preco, setPreco] = useState([]);
  const [ setor, setSetor ] = useState <any> ([]);
  const [dataRequest, setDataRequest ] = useState<any>([]);
  const [loading , setLoading ] = useState(false);
  const [novoSaldo, setNovoSaldo] = useState(0);
  const [saldoSistema, setSaldoSistema] = useState();


  const [selectedSetor, setSelectedSetor] = useState<any>();



  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    async function busca() {
      setLoading(true)
      try {
        const valor = await api.get(`/acerto/produto/${value}`);
        setDataRequest(valor.data);
        setProd(valor.data);
          if(!valor.data){
            Alert.alert("produto nao encontrado")
            setScanned(false)
            
          }
          if (valor.data) {
            try {
                const response = await api.get(`/acerto/setores`)
                setSetor(response.data);

            } catch (err) {
                console.log(err);
            }
        }


        
        if(valor.data){  
          console.log("produto sistema " +valor.data.codigo)
      }


      } catch (err) {
        console.log('erro ao buscar o produto', err);
      }finally{
        setLoading(false);
      }
    }


    if (scanned && value) {
      busca();
    }
  }, [scanned, value]);

function closeModal(){
  setScanned(false);
  setValue(null)
  setSelectedSetor(null)
}

function changeSetor(item:any) {
  return (
      <View>
      <TouchableOpacity onPress={() => setSelectedSetor(item)} style={{ backgroundColor: '#FFF', margin: 5,  borderRadius: 5, elevation:5}}>
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
  
function atualizaSaldo(v: any) {
  setSaldoSistema(selectedSetor?.estoque);
  setNovoSaldo(v);
  let aux = parseInt(v)
  selectedSetor.estoque = aux;
  //item.estoque = v;
}

  const handleBarCodeScanned = ({ type, data }:any) => {
    setScanned(true);
    console.log("produto pesquisado "+data)
    setValue(data);

   /**  Alert.alert(
      'Código de barras lido!',
      `Tipo: ${type}\nValor: ${data}`,
      [{ text: 'OK', onPress: () => setScanned(false) }]
    );
    */
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Acesso à câmera negado</Text>;
  }

  function addSaldo(v:any){
    let value:number = parseInt(v)
     dataRequest.setores[0].estoque = value
  } 

//  function addPreco(v){
//    const value = parseInt(v);
//    setPreco(value)
//    let obj = {...prod, novoPreco: preco}
//    setProd(obj);
//  }
//
  async function postProduto(){
    try{
//    await api.post('/acerto/',prod);
   const response =  await api.post('/acerto/',prod);
      setScanned(false);
      setSaldo(0)
      console.log(response.data)
    }catch(err) {
    console.log(err)
  }
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
    { 
    
    scanned && value && (
        <Modal visible={ scanned }>
                    <View style={{ flex: 1,  backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems:'center' ,justifyContent:'center'}}>
                  
            { loading ? ( // Display "buscando produto" message when loading is true
              <Text>Buscando produto...</Text>
            ) : (
              prod !== undefined ? (
                <View>
                
                <View style={{ backgroundColor: "#f0f0f0", borderRadius: 7, margin: 10, padding: 20, elevation: 9 }}>
                <TouchableOpacity onPress={() => closeModal()} style={{ alignSelf: "flex-end", padding: 5 }}>
                                <Text style={{ color: "red" }}>Fechar</Text>
                            </TouchableOpacity>  

                  <View style={{flexDirection:'row'}}>
                   <Text style={{fontWeight:'bold' ,color: '#42414d'}}> Código:  </Text> 
                    <Text style={{color:'#42414d'}} > { prod.codigo }</Text>
                  </View>
                
                  <View style={{flexDirection:'column',marginTop:3}}>
                    <Text style={{fontWeight:'bold', color: '#42414d'}}> { prod.descricao }</Text>
                  </View>

                 

                          {selectedSetor !== undefined ?

                  <View >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                          <Text style={{ fontSize: 15, fontWeight:'bold', color: '#42414d' }} >setor: {selectedSetor.nome}</Text>
                          <Text style={{ fontSize: 15, fontWeight:'bold', color: '#42414d'}} >saldo atual: {saldoSistema}</Text>
                      </View>

                      <View>
                          <Text>
                              novo saldo {novoSaldo}
                          </Text>
                      </View>

                      <View style={{ alignItems: 'center' }}>
                          <TextInput style={{ backgroundColor:'#FFF', marginTop: 5, borderRadius: 5,  paddingHorizontal: 95 , elevation:7}}
                              onChangeText={(v) => atualizaSaldo(v)}
                              placeholder="ex. 5"
                              keyboardType='numeric'
                          />

                    <TouchableOpacity style={{backgroundColor:"#FFF", borderRadius:5, alignItems:'center', elevation:7, marginTop:"15%", padding:8, width:"80%"}}>
                        <Text  style={{ fontSize: 15, fontWeight:'bold', color: '#42414d'}} >
                          GRAVAR
                        </Text>
                      </TouchableOpacity>
                      
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
                              //horizontal= {true}
                              renderItem={({ item }) => changeSetor(item)}
                            />

                          }
                          


                      </View>
                  </View>
                  }

            
                 </View>
                </View>
              ) : (
                <View>
                  <Text>Produto não encontrado!</Text>
                  <Button 
                  title='OK'
                   onPress={()=>{setScanned(false)}}
                     />
                </View>
              )
            )
            }
          </View>
        </Modal>
      )
     }
      
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop:20
  },
  camera: {
    flex: 1,
  },
});
