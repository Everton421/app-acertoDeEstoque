
import axios from "axios";

    export const api = axios.create({
        baseURL:"http://192.168.54.149:3000",
        headers:{
            "authorization": "token 123456789123456789",
        }
    })