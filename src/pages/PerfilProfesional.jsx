import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

export default function PerfilProfesional() {
  const navigate = useNavigate();
  const [servicios, setServicios] = useState([]);
  const [profesional, setProfesional] = useState(null);

  useEffect(() => {
    const id_profesional = localStorage.getItem("id_profesional");
    if (!id_profesional) return;
    fetch(`http://localhost:4000/api/profesionales/${id_profesional}`)
      .then(res => res.json())
      .then(data => { if (data.ok) setProfesional(data.profesional); });
    fetch(`http://localhost:4000/api/servicios/profesional/${id_profesional}`)
      .then(res => res.json())
      .then(data => { if (data.ok) setServicios(data.servicios || []); });
  }, []);

  return (
    <Box sx={{ maxWidth: 600, m: "auto", p: 3 }}>
      <Typography variant="h4" mb={2}>Mi Perfil Profesional</Typography>
      {/* Puedes mostrar otros datos aquí */}
      <Typography variant="h6" mt={4}>
        Mis Servicios ({servicios.length})
      </Typography>
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
        sx={{ mt: 2, ml: 2 }}
        disabled={!profesional || !profesional.url_personalizada}
        onClick={() => navigate(`/perfil/${profesional.url_personalizada}`)}
      >
        Ver mi perfil público
      </Button>
      <Button
        variant="outlined"
        sx={{ mt: 2, mr: 2 }}
        onClick={() => navigate("/panel-citas")}
      >
        Panel de Reservas
      </Button>
    </Box>
  );
}
