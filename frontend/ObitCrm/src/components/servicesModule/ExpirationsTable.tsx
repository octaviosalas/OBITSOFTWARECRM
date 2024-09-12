import "./styles.css"


const ExpirationsTable = () => { 
    return ( 
        <div>
            <table className="expirations-table">
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Proveedor</th>
                        <th>Vencimiento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Servicio B</td>
                        <td>Proveedor B</td>
                        <td>2024-09-15</td>
                    </tr>
                    <tr>
                        <td>Servicio C</td>
                        <td>Proveedor C</td>
                        <td>2024-10-20</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ExpirationsTable