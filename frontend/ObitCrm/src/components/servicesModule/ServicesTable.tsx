import "./styles.css"

const ServicesTable =  () => { 
  return ( 
     <div>
       <table className="services-table">
    <thead>
        <tr>
            <th>Servicio</th>
            <th>Proveedor</th>
            <th>Estado</th>
            <th>Vencimiento</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Servicio A</td>
            <td>Proveedor A</td>
            <td>Activo</td>
            <td>2024-12-31</td>
            <td>
                <button className="btn-action edit"><i className="fas fa-pencil-alt"></i></button>
                <button className="btn-action delete"><i className="fas fa-trash-alt"></i></button>
                <button className="btn-action details"><i className="fas fa-eye"></i></button>
                <button className="btn-action configure-alert" id="openAlertSection"><i className="fas fa-bell"></i></button>
            </td>
        </tr>
    </tbody>
</table>
     </div>
  )
}

export default ServicesTable