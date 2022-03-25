import {useEffect, useState} from 'react'
import './App.css';

//Cartas que se usarán para la memoria.
const cartas = [
  {"src":"./1.png"},
  {"src":"./2.png"},
  {"src":"./3.png"},
  {"src":"./4.png"},
  {"src":"./5.png"},
  {"src":"./6.png"},
  {"src":"./7.png"},
  {"src":"./8.png"},
  {"src":"./9.png"},
  {"src":"./10.png"}
]

function App() {

  const [mezclas, setMezclas] = useState([]) //Se guarda el estado de las cartas.
  //Términos para que el usuario pueda tomar turnos en el juego.
  const [turno, setTurno] = useState(0)

  const [eleccionUno, setEleccionUno] = useState(null)
  const [eleccionDos, setEleccionDos] = useState(null)

    //Método que lee el clic en las cartas.
    const handleClick = (carta) => {
      //Se va a actualizar el estado de las cartas.
      //Si está nulo, entonces se va a la elección 1. Si en caso ya no está nulo, entonces se va a la elecicón 2.
      eleccionUno ? setEleccionDos(carta) : setEleccionUno(carta)
    }

    //Comparando las dos cartas seleccionadas.
    //Cuando se seleccione la carta 1, se va a buscar a esta función.
    //Cuando se seleccione la carta 2, se va a buscar a esta función.
    useEffect(() => {
      if(eleccionUno && eleccionDos){
        if(eleccionUno.src === eleccionDos.src){
          resTurno()
        }else{
          console.log("Las cartas no son iguales")
          resTurno()
        }
      }
    },[eleccionUno, eleccionDos])

    //Reset de las elecciones e incremento en el turno.
    const resTurno = () => {
      setEleccionUno(null)
      setEleccionDos(null)
      setTurno(prevTurno => prevTurno + 1)
    }

  //Mezclar las cartas.
  const mezcla = () => {
    //Agarrar las cartas, mezclarlas y duplicarlas.
    const mezcla = [...cartas, ...cartas] //Ya se duplicaron las cartas.
      .sort(() => Math.random() - 0.5)//Busca una función para cada elemento del array.
                                      //Si regresa un número menor a cero, entonces las cartas se mantienen igual. Si en caso se regresa un número mayor a cero, entonces se cartas se mezcla.
      .map((carta) => ({...carta, id:Math.random()})) //Se mapean las cartas, se le pone un id a cada carta y luego se colocan en el grid.

      setMezclas(mezcla) //Se actualiza el estado de las cartas.
      setTurno(0)
  }


  return (
    <div className="App">
      <h1>Juego de Memoria (Lab6)</h1>
      <button onClick={mezcla}>Nuevo juego</button>

      <div className="grilla">
        {mezclas.map(carta => (
          <div className ="carta" key={carta.id}>
            <div>
              <img className = "front" src={carta.src} alt="frente"/>
              <img className = "back" src="/uno.png" onClick={handleClick} alt="trasero"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
