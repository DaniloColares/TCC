import { useNavigate } from "react-router-dom";
import { Container, ArrowIcon } from "./styles";
import mqtt from "mqtt"
import { FiArrowLeft, FiSun } from "react-icons/fi";
const TEMPERATURE_TOPIC = 'esp32/temperature'

export function Temperature() {
  const [metrics, setMetrics] = useState('') 
    
  useEffect(() => {
    const client = mqtt.connect('ws://localhost:8080') //connecta ao mqtt broker
    client.on('connect', handleConnection) //Ao conectar chama a função `handleConnection`

    function handleConnection () {
      client.subscribe(TEMPERATURE_TOPIC) //Escuta o tópico de temperatura

      client.on('message', (topic, message) => { //Ao recebem mensagem, executa essa função que recebe a mensagem que e seu topico
        if(topic === TEMPERATURE_TOPIC) setMetrics(message.toString())
      })
    }
  }, [])
  return(
    <Container>
      <ArrowIcon onClick={() => navigate("/home")}>
        <FiArrowLeft size={50}/>
      </ArrowIcon>
      <FiSun size={350}/>
      <p>A temperatura atual no jarro é:{metrics} </p>
    </Container>
  )
}