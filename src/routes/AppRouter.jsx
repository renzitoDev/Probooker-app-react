import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import RegistroProfesional from "../pages/RegistroProfesional";
import Login from "../pages/Login"
import RegistroCliente from "../pages/RegistroCliente";
import PerfilProfesionalPublico from "../pages/PerfilProfesionalPublico";
import ReservaCita from "../pages/ReservaCita";
import ServiciosProfesional from "../pages/ServiciosProfesional";
import PerfilProfesional from "../pages/PerfilProfesional";
import PrivateRoute from "../components/PrivateRoute";
import PanelCitasProfesional from "../pages/PanelCitasProfesional";
import MisReservas from "../pages/MisReservas";
import DirectorioProfesionales from "../pages/DirectorioProfesionales";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/registro-profesional" element={<RegistroProfesional />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro-cliente" element={<RegistroCliente />} />
        <Route path="/perfil/:nombre_unico" element={<PerfilProfesionalPublico />} />
        <Route path="/reservar/:idServicio" element={<ReservaCita />} />
        <Route path="/profesionales" element={<DirectorioProfesionales />} />
        <Route path="/perfil/:url_personalizada" element={<PerfilProfesionalPublico />} />

        
        <Route
          path="/perfil-profesional/:id_profesional"
          element={
            <PrivateRoute tipo="profesional">
              <PerfilProfesional />
            </PrivateRoute>
          }
        />

        <Route
            path="/servicios-profesional"
            element={
              <PrivateRoute tipo="profesional">
                <ServiciosProfesional />
              </PrivateRoute>
            }
          />
          <Route
            path="/perfil-profesional/:id_profesional"
            element={
              <PrivateRoute tipo="profesional">
                <PerfilProfesional />
              </PrivateRoute>
            }
          />

          <Route
            path="/panel-citas"
            element={
              <PrivateRoute tipo="profesional">
                <PanelCitasProfesional />
              </PrivateRoute>
            }
          />

          <Route
            path="/mis-reservas"
            element={
              <PrivateRoute tipo="cliente">
                <MisReservas />
              </PrivateRoute>
            }
          />

        {/* Agrega aquí más rutas a futuro */}
        <Route path="*" element={<h1>404 No encontrado</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
