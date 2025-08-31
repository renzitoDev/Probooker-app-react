import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import RegistroProfesional from "../pages/RegistroProfesional";
import Login from "../pages/Login"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/registro-profesional" element={<RegistroProfesional />} />
        <Route path="/login" element={<Login />} />
        {/* Agrega aquí más rutas a futuro */}
        <Route path="*" element={<h1>404 No encontrado</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
