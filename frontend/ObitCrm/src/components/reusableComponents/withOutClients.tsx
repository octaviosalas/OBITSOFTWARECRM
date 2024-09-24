import "../ClientsModule/styles/clientModule.css"

interface Props { 
    close: () => void
}

const WithOutClients = ({close}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
         <p className="font-bold">No se encontraron clientes a los cuales puedas generarle un seguimiento</p>
         <button className="mt-4 bg-red-600 text-white font-medium w-32 h-12 rounded-lg" onClick={() => close()}>Cerrar</button>
    </div>
  )
}

export default WithOutClients