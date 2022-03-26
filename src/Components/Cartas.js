//Este archivo tiene algunas propiedades de las cartas para que sea más sencillo hacer algunas features.
import './Cartas.css'

export default function Cartas({carta, hEleccion, flipped}){

  const handleClick = () => {
    //Aquí se actualizarán ciertos estados de las cartas.
    hEleccion(carta) //Pasando la elección desde la App.
  }

  return(
    <div className="carta"> {/*Daándole un id a las cartas*/}
      <div className={flipped ? "flipped" : ""}> {/*Si en caso la carta está volteada, entonces se aplica la clase flipped. Si no lo está, entonces se manda un string vacío*/}
        <img className="frente" src={carta.src} alt="Frente"/> {/*Esta es una imagen dinámica de las cartas*/}
        <img className="trasero"
        src="/img/atras.png"
        onClick={handleClick}
        alt="Trasero"
        />
      </div>
    </div>
  )
}
