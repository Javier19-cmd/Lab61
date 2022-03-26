//Este archivo tiene algunas propiedades de las cartas para que sea más sencillo hacer algunas features.
import './Cartas.css'

export default function Cartas({carta, hEleccion}){

  const handleClick = () => {
    //Aquí se actualizarán ciertos estados de las cartas.
    hEleccion(carta) //Pasando la elección desde la App.
  }

  return(
    <div className="carta"> {/*Daándole un id a las cartas*/}
      <div>
        <img className="frente" src={carta.src} alt="Frente"/> {/*Esta es una imagen dinámica de las cartas*/}
        <img className="trasero"
        src="/img/uno.png"
        onClick={handleClick}
        alt="Trasero"/> {/*Esta es la grilla de las cartas*/}
      </div>
    </div>
  )
}
