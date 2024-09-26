import React from 'react'
import { useState, useEffect } from 'react'
import "./myProfileStyle.css"

const MainMyProfile = () => {
  return (
    <div className="mi-perfil-container">
      <h2 className="mi-perfil-title">Mi Perfil</h2>

    <form id="profile-form" className="mi-perfil-form">
      <div className="mi-perfil-form-group">
        <label htmlFor="firstName" className="mi-perfil-label">Nombre:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Ingrese su nombre"
          required
          className="mi-perfil-input"
        />
      </div>

      <div className="mi-perfil-form-group">
        <label htmlFor="lastName" className="mi-perfil-label">Apellido:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Ingrese su apellido"
          required
          className="mi-perfil-input"
        />
      </div>

      <div className="mi-perfil-form-group">
        <label htmlFor="username" className="mi-perfil-label">Usuario:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Ingrese su nombre de usuario"
          required
          className="mi-perfil-input"
        />
      </div>

      <div className="mi-perfil-form-group">
        <label htmlFor="password" className="mi-perfil-label">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Ingrese su nueva contraseña"
          required
          className="mi-perfil-input"
        />
      </div>

      <div className="mi-perfil-form-group">
        <label htmlFor="email" className="mi-perfil-label">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Ingrese su email"
          required
          className="mi-perfil-input"
        />
      </div>

      <button type="submit" className="mi-perfil-submit-button">
        Guardar Cambios
      </button>
    </form>

    <button className="mi-perfil-back-button" >
      Volver
    </button>
  </div>
  )
}

export default MainMyProfile