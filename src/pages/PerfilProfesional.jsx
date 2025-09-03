import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import SnackbarGlobal from "../components/SnackbarGlobal";



export default function PerfilProfesional() {
  const { id_profesional } = useParams();
  const navigate = useNavigate();
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
  const id_profesional = localStorage.getItem("id_profesional");
  fetch(`http://localhost:4000/api/servicios/profesional/${id_profesional}`)
    .then(res => res.json())
    .then(data => { if (data.ok) setServicios(data.servicios || []); });
  }, [id_profesional]);
  // Aquí podrías hacer fetch de los datos del profesional usando id_profesional si deseas mostrar info
  // O solo mostrar opciones administrativas de perfil

  return (
    <Box sx={{ maxWidth: 600, m: "auto", p: 3 }}>
      <Typography variant="h4" mb={2}>Mi Perfil Profesional</Typography>
      {/* Puedes mostrar aquí los datos del profesional, avatar, etc. */}
       <Typography variant="h6" mt={4}>Mis Servicios ({servicios.length})</Typography>
        <ul>
          {servicios.map(s => (
            <li key={s.id_servicio}>
              <b>{s.nombre_servicio}</b> – {s.modalidad} – ${s.precio}
            </li>
          ))}
        </ul>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => navigate("/servicios-profesional")}
      >
        Gestionar mis servicios
      </Button>
      
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        href={`/perfil/${id_profesional}`}
        target="_blank">
        Ver mi perfil público
       </Button>

       <Button
          variant="outlined"
          sx={{ mt: 2, mr: 2 }}
          onClick={() => navigate("/panel-citas")}>
          Panel de Reservas
       </Button>

      {/* Luego puedes agregar más secciones para configurar datos, foto, agenda, etc. */}
    </Box>
    
  );
}
