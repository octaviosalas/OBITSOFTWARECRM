import "./styles.css"

const FollowsUpTable = () => { 
    return ( 
        <div>
           <table className="trackings-table">
                <thead>
                    <tr>
                        <th>Referencia Cliente</th>
                        <th>Última Comunicación</th>
                        <th>Próxima Comunicación</th>
                        <th>Información Adicional</th>
                        <th>Histórico</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cliente A</td>
                        <td>2024-08-01 Detalles aquí</td>
                        <td>2024-09-01 Detalles aquí</td>
                        <td>Información adicional</td>
                        <td><button className="btn-action view-history" data-client="Cliente A">Ver Histórico</button></td>
                        <td>
                            <button className="btn-action edit" data-client="Cliente A"><i className="fas fa-pencil-alt"></i></button>
                            <button className="btn-action delete" data-client="Cliente A"><i className="fas fa-trash-alt"></i></button>
                            <button className="btn-action details" data-client="Cliente A"><i className="fas fa-eye"></i></button>
                        </td>
                    </tr>
                </tbody>
           </table>
        </div>
    )
}

export default FollowsUpTable