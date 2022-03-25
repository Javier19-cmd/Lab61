import {useState} from 'react'
import './App.css';

//Cartas que se usarán para la memoria.
const cartas = [
  {"src":"/img/1.png"},
  {"src":"/img/2.png"},
  {"src":"/img/3.png"},
  {"src":"/img/4.png"},
  {"src":"/img/5.png"},
  {"src":"/img/6.png"},
  {"src":"/img/7.png"},
  {"src":"/img/8.png"},
  {"src":"/img/9.png"},
  {"src":"/img/10.png"}
]

function App() {

  const [mezcla, setMezcla] = useState([]) //Se guarda el estado de las cartas.
  //Términos para que el usuario pueda tomar turnos en el juego.
  const [turno, setTurno] = useState(0)

  //Mezclar las cartas.
  const mezcla = () => {
    //Agarrar las cartas, mezclarlas y duplicarlas.
    const mezclado = [...cartas, ...cartas] //Ya se duplicaron las cartas.
      .sort(() => Math.random() - 0.5)//Busca una función para cada elemento del array.
                                      //Si regresa un número menor a cero, entonces las cartas se mantienen igual. Si en caso se regresa un número mayor a cero, entonces se cartas se mezcla.
      .map((carta)=> ({..carta, id:Math.random()})) //Se mapean las cartas, se le pone un id a cada carta y luego se colocan en el grid.

      setMezcla(mezcla) //Se actualiza el estado de las cartas.
      setTurno(0)
  }

  return (
    <div className="App">
      <h1>Juego de Memoria (Lab6)</h1>
      <button>Nuevo juego</button>
    </div>
  );
}

export default App;
