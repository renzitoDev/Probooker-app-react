import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DirectorioProfesionales() {
  const [profesionales, setProfesionales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/profesionales")
      .then(res => res.json())
      .then(data => { if (data.ok) setProfesionales(data.profesionales); });
  }, []);

  return (
    <Box sx={{ maxWidth: 1200, m: "auto", p: 3 }}>
      <Typography variant="h4" mb={3}>Busca y encuentra tu profesional</Typography>
      <Grid container spacing={3}>
        {profesionales.length === 0 && (
          <Typography>No hay profesionales registrados aún.</Typography>
        )}
        {profesionales.map(p => (
          <Grid item xs={12} md={4} key={p.id_profesional}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar src={p.foto_url} sx={{ width: 64, height: 64, mr: 2 }} />
                  <Box>
                    <Typography variant="h6">
                      {p.nombre} {p.apellidos}
                    </Typography>
                    <Typography variant="body2">{p.ciudad}</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" gutterBottom>
                  {p.descripcion?.slice(0, 80) || "Sin descripción"}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {p.cantidad_servicios} servicio(s) publicados
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/perfil/${p.url_personalizada}`)}
                  fullWidth
                >
                  Ver perfil público
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
