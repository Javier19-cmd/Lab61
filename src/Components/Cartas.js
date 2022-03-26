import './Cartas.css'
export default function Cartas({carta}){
  return(
    <div className="carta"> {/*Daándole un id a las cartas*/}
      <div>
        <img className="frente" src={carta.src} alt="Frente"/> {/*Esta es una imagen dinámica de las cartas*/}
        <img className="trasero" src="/img/uno.png"
        alt="Trasero"/> {/*Esta es la grilla de las cartas*/}
      </div>
    </div>
  )
}
