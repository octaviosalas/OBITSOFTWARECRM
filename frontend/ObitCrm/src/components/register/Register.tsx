import React from 'react'
import "./register.css"

const Register = () => {
  return (
    <body>
   
      <main className="main-content">
        <div className="form-container">
          <h2>Registro de Cuenta</h2>
          <form className="registration-form">
            <div className="form-group">
              <label htmlFor="first-name">Nombre</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
              
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Apellido</label>
              <input
                type="text"
                id="last-name"
                name="lastName"
      
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
           
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
               
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Rol</label>
              <select
                id="role"
                name="role"
           
                required
              >
                <option value="" disabled>Selecciona un rol</option>
                <option value="admin">Administrador</option>
                <option value="developer">Desarrollo</option>
                <option value="designer">Diseño</option>
                <option value="sales">Ventas</option>
              </select>
            </div>
            <button type="submit" className="submit-button">Registrar</button>
          </form>
        </div>
      </main>
    </body>
  )
}

export default Register
