import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, tipo }) {
  const tipo_usuario = localStorage.getItem("tipo_usuario");
  if (tipo_usuario !== tipo) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
