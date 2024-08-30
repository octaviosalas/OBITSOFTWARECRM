import React from 'react'
import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import "./styles/clientModule.css"

const ClientProjectsModal = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const projectsData = [
        { id: 1, nombre: 'Proyecto X' },
        { id: 2, nombre: 'Proyecto Y' },
    ];


  return (
    <div>
         <button className="btn-btn" onClick={onOpen}>Proyectos</button>
         <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                
                <div id="projects-modal" className="modal">
                    <div className="modal-content">
                        <h2>Proyectos del Cliente</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre del Proyecto</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectsData.map(project => (
                                    <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>{project.nombre}</td>
                                        <td><span className="table-icon" >Ir</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                </>
            )}
            </ModalContent>
        </Modal>
    </div>
  )
}

export default ClientProjectsModal
