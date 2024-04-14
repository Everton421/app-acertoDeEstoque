import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { Login } from "../../screens/login";
const Stack = createStackNavigator();

  

    export const  AuthStack = ()=>{
        return(
                <Stack.Navigator>
                    <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
                </Stack.Navigator>
        )
    }