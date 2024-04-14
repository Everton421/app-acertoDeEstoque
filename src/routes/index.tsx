

import { NavigationContainer } from "@react-navigation/native"

import { MyStack } from "./stack/stack"
import { AuthStack } from "./stack/authStack"

import { useContext } from "react"
import { AuthContext } from "../contexts/auth"

export const Routes = ()=>{
    const { logado}:any = useContext(AuthContext)

    return(
        <NavigationContainer>
            {/** <MyDrawer/>*/}
        {
        //    logado ? <MyStack/> : <AuthStack/> 
        }
<MyStack/>
        </NavigationContainer>
    )
}