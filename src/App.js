import { useEffect, useState } from 'react' //Importando estados y efectos.
import './App.css';
import Cartas from './components/Cartas' //Importando el método de cartas desde el archivo de Cartas.

//Cartas que se usarán para la memoria.
const cartas = [
    { "src": "/img/1.png" },
    { "src": "/img/2.png" },
    { "src": "/img/3.png" },
    { "src": "/img/4.png" },
    { "src": "/img/5.png" },
    { "src": "/img/6.png" },
    { "src": "/img/7.png" },
    { "src": "/img/8.png" },
    { "src": "/img/9.png" },
    { "src": "/img/10.png" }
]

function App() {

    const [mezclas, setMezclas] = useState([]) //Se guarda el estado de las cartas.
        //Términos para que el usuario pueda tomar turnos en el juego.
    const [turno, setTurno] = useState(0)

    //Mezclar las cartas.
    const mezcla = () => {
        //Agarrar las cartas, mezclarlas y duplicarlas.
        const mezcla = [...cartas, ...cartas] //Ya se duplicaron las cartas.
            .sort(() => Math.random() - 0.5) //Busca una función para cada elemento del array.
            //Si regresa un número menor a cero, entonces las cartas se mantienen igual. Si en caso se regresa un número mayor a cero, entonces se cartas se mezcla.
            .map((carta) => ({...carta, id: Math.random() })) //Se mapean las cartas, se le pone un id a cada carta y luego se colocan en el grid.

        setMezclas(mezcla) //Se actualiza el estado de las cartas.
        setTurno(0)
    }

    console.log(mezclas, turno) //Imprimiendo la matriz de las cartas y el turno de la persona.

    return (
      <div className = "App" >
        <h1> Juego de Memoria(Lab6) </h1>
        <button onClick = { mezcla }> Nuevo juego </button>
        <div className = "grilla" > { /*Esta es la grilla de las cartas*/ }
        {mezclas.map(carta => (
          <Cartas key={carta.id} card = {carta}/>
            ))
        }
        </div>
        </div>
    );
}

export default App;
