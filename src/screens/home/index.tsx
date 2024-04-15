import React, { useEffect, useContext } from "react";
import { View, FlatList, Text, Alert, BackHandler, TouchableOpacity } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { EnviaProduto } from "../enviaProdutos";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Home = ({navigation}:any) => {
  const { setLogado , setUsuario}: any = useContext(AuthContext);

  useEffect(() => {
    const handleBackButton = () => {
      showAlert();
      return true;
    };

    // Adiciona um ouvinte de evento para o botão de voltar
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    // Remove o ouvinte de evento quando o componente for desmontado
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [showAlert]); // showAlert deve ser uma dependência para que useEffect seja refeito quando showAlert mudar

  const showAlert = () =>
    Alert.alert(
      'Sair do Aplicativo',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Sim',
          onPress: () => {
            console.log('Sim Pressionado');
            setLogado(false); // Define o usuário como deslogado
            setUsuario(null)
          },
        },
        {
          text: 'Cancelar',
          onPress: () => {
            console.log('Cancelar Pressionado');
          },
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          console.log('Este alerta foi dispensado ao tocar fora do diálogo de alerta.'),
      }
    );

  const data = [
 
    { "nome": "AcertoCamera",
    "icon":<MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
     },
     { "nome":"configurações",
      "icon":<Feather name="settings" size={24} color="black" />
      }

    ];

  const Item = ({ value }: any) => {
    return (
<View style={{alignItems:"center"}}>
      <TouchableOpacity onPress={ ()=> navigation.navigate(value.nome) }
        style={{
          backgroundColor: "#FFF",
          margin: 15,
          borderRadius: 100,
          width: 65,
          height: 65,
          alignItems: "center",
          justifyContent: "center",
          elevation:5
        }}
      >
        {value.icon}
      </TouchableOpacity>
        <Text style={{fontSize:12}}> {value.nome}</Text>
        </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e9ecf1" }}>
      <View style={{margin:20,}}>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={({ item }) => <Item value={item} />}
        showsHorizontalScrollIndicator={false}
      />
      </View>
    </View>
  );
};
