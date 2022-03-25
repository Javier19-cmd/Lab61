import {useState} from 'react'
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

  console.log(mezclas, turno)

  return (
    <div className="App">
      <h1>Juego de Memoria (Lab6)</h1>
      <button onClick={mezcla}>Nuevo juego</button>

      <div className="grid">
        {cartas.map(carta => (
          <div className ="card" key={carta.id}>
            <div>
              <img className = "front" src={carta.src} alt="frente"/>
              <img className = "back" src="/uno.png" alt="trasero"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
