
import axios from "axios";

    export const api = axios.create({
        baseURL:"http://100.108.116.119:3000",
        headers:{
            "authorization": "token h43895jt9858094bun6098grubn48u59dsgfg234543tf",
        }
    })