import React from 'react'
import "../login/login.css"
import obitLogo from "../../images/obitLogo.png"

const ForgotPassword = () => {
  return (
    <div>
        <main className="main-content">
                    <div className="form-container">
                    <div className="flex items-center justify-center">
                        <img src={obitLogo} className="h-14 w-14"/>
                    </div>
                    <h2 className="mt-4">Inicio de Sesión</h2>
                    <form className="login-form" >
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" name="password" required />
                        </div>
              
                        <div className="forgot-password">
                            <a href="/forgot-password" className="link">¿Olvidaste tu contraseña?</a>
                        </div>
                        <div className="register-link">
                            <a href="/register" className="link">¿Aún no tienes cuenta? Regístrate</a>
                        </div>
                    </form>
                    </div>
            </main>
    </div>
  )
}

export default ForgotPassword