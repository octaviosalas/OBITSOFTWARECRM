import apiBackendUrl from "../../../lib/axiosData"
import { useState } from "react"
import "../proyectMain.css"


const MainProjectTableData = () => { 
   return ( 
      <div>
        <div className="search-bar">
            <input type="text" placeholder="Buscar proyectos..."/>
        </div>

         <table className="projects-table">
            <thead>
                <tr>
                    <th>Referencia Cliente</th>
                    <th>Usuarios Participantes</th>
                    <th>Tipo de Proyecto</th>
                    <th>Servicios</th>
                    <th>Fecha de Inicio</th>
                    <th>Última Reunión</th>
                    <th>Próxima Reunión</th>
                    <th>Información Adicional</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Cliente A</td>
                    <td>Usuario1, Usuario2</td>
                    <td>Tipo A</td>
                    <td>Servicio1, Servicio2</td>
                    <td>2024-01-01</td>
                    <td>2024-02-01</td>
                    <td>2024-03-01</td>
                    <td>Información adicional</td>
                    <td>
                        <button className="btn-action edit"><i className="fas fa-pencil-alt"></i></button>
                        <button className="btn-action delete"><i className="fas fa-trash-alt"></i></button>
                        <button className="btn-action details"><i className="fas fa-eye"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
     </div>
   )
}

export default MainProjectTableData