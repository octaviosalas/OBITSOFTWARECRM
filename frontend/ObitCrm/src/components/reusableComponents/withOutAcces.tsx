interface Props { 
    typeData: string
}


const WithOutAcces = ({typeData}: Props) => { 
    return ( 
        <div className="mt-36 flex items-center justify-center">
           <p className="font-semibold text-black">No se encontraron {typeData} a los cuales tengas acceso</p>
        </div>
    )
}

export default WithOutAcces