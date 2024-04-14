import { View, Text, Button, Alert } from "react-native"
import { api } from "../../services/api"
import { useEffect, useState } from "react"

export const Configurações = () => {
    const [conectado, setConectado] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()

    


    async function connect() {
        try {
            const response = await api.get('/');
            if (response.status === 200 && response.data.ok) {
                setConectado(true)
            console.log(response.data)

            } else {
                setConectado(false)
                console.log({"err":"erro ao conectar"})
            }
            setError(undefined)
        } catch (err) {
            setError("Erro ao conectar na API. Por favor, tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        connect();

        // Configura um temporizador para verificar a conexão com a API a cada 60 segundos
        const intervalId = setInterval(() => {
            connect();
        }, 30000);

        return () => clearInterval(intervalId); // Limpa o temporizador quando o componente é desmontado
    }, []);



    const Conectado = ()=>{
            return(
                <View>
                    
             </View>
        )
    }

    return (
        <View>
            {loading ? (
                <Text>Conectando...</Text>
            ) : (
                <>
                    {error ? (
                        <Text>{error}</Text>
                    ) : (
                        <Text>{conectado ? 'Conectado' : 'Não conectado'}</Text>
                    )}
                </>
            )}
        </View>
    )
}
