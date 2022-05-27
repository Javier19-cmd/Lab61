/*
Nombre: Javier Sebastián Valle Balsells
Carnet: 20159
Sección: 10

Referencias:
1. https://www.youtube.com/watch?v=ZCKohZwGZMw&list=PL4cUxeGkcC9iQ7g2eoNXHCJBBBz40S_Lm
*/

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

    //Creando estado deshabilitado en las cartas.
    const[deshabilitado, setDeshabilitado] = useState(false)


    //Mezclar las cartas.
    const mezcla = () => {
        //Agarrar las cartas, mezclarlas y duplicarlas.
        const mezcla = [...cartas, ...cartas] //Ya se duplicaron las cartas.
            .sort(() => Math.random() - 0.5) //Busca una función para cada elemento del array.
            //Si regresa un número menor a cero, entonces las cartas se mantienen igual. Si en caso se regresa un número mayor a cero, entonces se cartas se mezcla.
            .map((carta) => ({...carta, id: Math.random() })) //Se mapean las cartas, se le pone un id a cada carta y luego se colocan en el grid.
        //Inicializando las elecciones en null por si tuvieran algo almacenado de algún intento anterior.
        setEleccionUno(null)
        setEleccionDos(null)
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

        setDeshabilitado(true) //Esto hace que las demás cartas se deshabiliten cuando haya un match entre dos cartas elegidas anteriormente.

        //Si el source de la elección 1 es igual al source de la elección 2, entonces se dice que hay un match.
        if(eleccionUno.src === eleccionDos.src){
          //Se va a actualizar lo siguiente: const [mezclas, setMezclas] = useState([])
          //Si el source de la elección uno es exactamente igual al source de la elección dos entonces:
          setMezclas(prevMezclas => { //Se actualiza el estado de la carta anterior
            return prevMezclas.map(carta => { //Se retorna un nuevo array de cartas basado en el estado anterior de las cartas.
              //Función que recorre a c/u de las cartas.
              if (carta.src === eleccionUno.src){ //Si en caso el estado de la carta es igual al estado de la carta seleccionada, entonces pasa lo siguiente: se retorna el estado de la carta en true.
                return {...carta, matched: true} //Retornando el estado de la carta que hizo match en true.
              }else{
                return carta //Si en caso las cartas no son iguales, entonces se retorna el estado de la carta sin cambiar.
              }
            })
          })
          formTurno() //Se llama para limpiar las dos elecciones y para incrementar el turno.
        }else {
          console.log("No hay match")
          setTimeout(() => formTurno(), 5000) //Se llama para limpiar las dos elecciones y para incrementar el turno. Tiene un delay de gracia.
        }
      }
    }, [eleccionUno, eleccionDos]) //Cuando se seleccione la carta 1, entonces se buscará esta función y cuando se seleccione la carta 2, entonces se busca este método otra vez.


    console.log(mezclas) //Imprimiendo la matriz de mezclas.

    //Este método formatea las elecciones e incrementa el turno.
    const formTurno = () => {
      setEleccionUno(null) //Formateando la elección 1.
      setEleccionDos(null) //Formateando la elección 2.
      setTurno(prevTurno => prevTurno + 1) //Incrementando el turno de elección.
      setDeshabilitado(false) //Cuando ya se hizo la comparación entre las cartas, ya se deshabilita el bloqueo establecido.
    }

    //Empezando el juego de manera automática
    useEffect(() => {
      mezcla() //Llamando al método que mezcla todas las cartas.
    },[])

    return (
      <div className = "App" >
        <h1> Juego de Memoria(Lab6) < /h1> {/*Dándole título a la página*/}
        <button onClick = { mezcla } > Nuevo juego </button> {/*Botón para mezclar cartas*/}
        <div className = "grilla" > { /*Esta es la grilla de las cartas*/ }
        {mezclas.map(carta => (
          <Cartas
          key={carta.id}
          carta={carta}
          hEleccion = {hEleccion}
          flipped = {carta === eleccionUno || carta === eleccionDos || carta.matched}
          deshabilitados={deshabilitado}
          />
        ))} {/*Mandando el id de la carta a la clase Cartas. Enviando el source de las cartas a la clase de Cartas. Enviando el evento de click a la clase de Cartas*/}
            {/*Hay tres escenarios: 1. Si se seleccionó la carta uno 2. Si se seleccionó la carta dos y 3. Si las cartas hacen match*/}
            {/*También se pasa el estado deshabilitado. Esto ocurre cuando hay un match entre dos cartas, entonces se bloquean las demás cartas. Si no, se habilita escoger cualquier otra carta*/}
        </div>
        <p>Movimientos: {turno} </p>
      </div>
    )
}

export default App;
