import { useEffect, useState } from 'react' //Importando estados y efectos.
import './App.css';
import Cartas from './components/Cartas' //Importando el método de cartas desde el archivo de Cartas.

//Cartas que se usarán para la memoria.
//Las cartas empiezan teniendo el match en false para hacer bien la comparación.
const cartas = [
    { "src": "/img/1.png", matched: false },
    { "src": "/img/2.png", matched: false },
    { "src": "/img/3.png", matched: false },
    { "src": "/img/4.png", matched: false },
    { "src": "/img/5.png", matched: false },
    { "src": "/img/6.png", matched: false },
    { "src": "/img/7.png", matched: false },
    { "src": "/img/8.png", matched: false },
    { "src": "/img/9.png", matched: false },
    { "src": "/img/10.png", matched: false }
]

function App() {

    const [mezclas, setMezclas] = useState([]) //Se guarda el estado de las cartas.
    //Términos para que el usuario pueda tomar turnos en el juego.
    const [turno, setTurno] = useState(0)

    //Creando estado para la elección de las cartas.
    const[eleccionUno, setEleccionUno] = useState(null) //Estado para la elección de la carta 1.
    const[eleccionDos, setEleccionDos] = useState(null) //Estado para la elección de la carta 2.


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

    //console.log(mezclas, turno) //Imprimiendo la matriz de las cartas y el turno de la persona.

    //Función para la elección.
    const hEleccion = (carta) => {
        //console.log(carta)
        //Si la variable está null es porque no se ha elegido nada. Si no está null, es porque ya se escogió una carta.
        //Si la variable eleccionUno está null, entonces pasa a setEleccionUno(carta). Si no está null, entonces pasa a setEleccionDos(carta).
        eleccionUno ? setEleccionDos(carta) : setEleccionUno(carta)
        //No es recomendable comparar más cosas en este método.
    }

    //Comparando las dos elecciones.
    //A este método se le pasa una segunda dependencia.
    useEffect(() => {
      //Se evalúa si eleccionUno y eleccionDos tienen un valor.
      if(eleccionUno && eleccionDos){

        //Si el source de la elección 1 es igual al source de la elección 2, entonces se dice que hay un match.
        if(eleccionUno.src === eleccionDos.src){
          //Se va a actualizar lo siguiente: const [mezclas, setMezclas] = useState([])
          setMezclas(prevMezclas => {
            return prevMezclas.map(carta => {
              if (carta.src === eleccionUno.src){
                return {...carta, matched: true}
              }else{
                return carta
              }
            })
          })
          formTurno() //Se llama para limpiar las dos elecciones y para incrementar el turno.
        }else {
          console.log("No hay match")
          formTurno() //Se llama para limpiar las dos elecciones y para incrementar el turno.
        }

      }
    }, [eleccionUno, eleccionDos]) //Cuando se seleccione la carta 1, entonces se buscará esta función y cuando se seleccione la carta 2, entonces se busca este método otra vez.

    console.log(cartas)

    //Este método formatea las elecciones e incrementa el turno.
    const formTurno = () => {
      setEleccionUno(null) //Formateando la elección 1.
      setEleccionDos(null) //Formateando la elección 2.
      setTurno(prevTurno => prevTurno + 1) //Incrementando el turno de elección.
    }

    return (
      <div className = "App" >
        <h1 > Juego de Memoria(Lab6) < /h1>
        <button onClick = { mezcla } > Nuevo juego < /button>
        <div className = "grilla" > { /*Esta es la grilla de las cartas*/ }
        {mezclas.map(carta => (
          <Cartas
          key={carta.id}
          carta={carta}
          hEleccion = {hEleccion}
          />
        ))} {/*Enviando a la clase Cartas el id de las cartas y la imagen. También se está pasando como parámetro la función que lee la elección*/}
        </div>
      </div>
    );
}

export default App;
