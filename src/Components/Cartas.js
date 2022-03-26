/*
Nombre: Javier Sebastián Valle Balsells
Carnet: 20159
Sección: 10

Referencias:
1. https://www.youtube.com/watch?v=ZCKohZwGZMw&list=PL4cUxeGkcC9iQ7g2eoNXHCJBBBz40S_Lm
*/

//Este archivo tiene algunas propiedades de las cartas para que sea más sencillo hacer algunas features de las cartas.
import './Cartas.css'

export default function Cartas({carta, hEleccion, flipped, deshabilitados}){

  const handleClick = () => {
    //Aquí se actualizarán ciertos estados de las cartas.
    if(!deshabilitados){
       //Si en caso no se ha deshabilitado ninguna carta, entonces se puede hacer una elección en el tablero.
        hEleccion(carta) //Pasando la elección desde la App.
    }

  }

  return(
    <div className="carta"> {/*Daándole un id a las cartas*/}
      <div className={flipped ? "flipped" : ""}> {/*Si en caso la carta está volteada, entonces se aplica la clase flipped. Si no lo está, entonces se manda un string vacío*/}
        <img className="frente" src={carta.src} alt="Frente"/> {/*Esta es una imagen dinámica de las cartas que tienen números*/}
        <img className="trasero"
        src="/img/atras.png"
        onClick={handleClick}
        alt="Trasero"
        /> {/*Esta es la imagen de la parte trasera de todas las cartas. Tiene diseño de yu gi oh y es la que tiene opción para que se volteen las cartas*/}
      </div>
    </div>
  )
}
