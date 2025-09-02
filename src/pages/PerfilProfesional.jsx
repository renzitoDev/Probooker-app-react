import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

export default function PerfilProfesional() {
  const { id_profesional } = useParams();
  const navigate = useNavigate();

  // Aquí podrías hacer fetch de los datos del profesional usando id_profesional si deseas mostrar info
  // O solo mostrar opciones administrativas de perfil

  return (
    <Box sx={{ maxWidth: 600, m: "auto", p: 3 }}>
      <Typography variant="h4" mb={2}>Mi Perfil Profesional</Typography>
      {/* Puedes mostrar aquí los datos del profesional, avatar, etc. */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => navigate("/servicios-profesional")}
      >
        Gestionar mis servicios
      </Button>
      {/* Luego puedes agregar más secciones para configurar datos, foto, agenda, etc. */}
    </Box>
  );
}
