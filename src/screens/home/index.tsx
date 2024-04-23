import React, { useEffect, useContext } from "react";
import { View, FlatList, Text, Alert, BackHandler, TouchableOpacity, StatusBar } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { EnviaProduto } from "../enviaProdutos";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export const Home = ({navigation}:any) => {
  const { setLogado , setUsuario}: any = useContext(AuthContext);

  

  const data = [
 
    { "nome": "AcertoCamera",
    "icon":<MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
     },
     { "nome": "acertoProduto",
     "icon":<AntDesign name="database" size={24} color="black" />
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
      <StatusBar backgroundColor={'#333'}/>
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
