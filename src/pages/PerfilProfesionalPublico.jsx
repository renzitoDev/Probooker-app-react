import React, { useEffect, useState } from "react";
import {
  Box, Typography, Card, CardContent, CardActions,
  Button, Avatar, Grid, Divider
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import SnackbarGlobal from "../components/SnackbarGlobal";



export default function PerfilProfesionalPublico() {
  const { url_personalizada } = useParams();
  const [datosProfesional, setDatosProfesional] = useState(null);
  const { nombre_unico } = useParams(); // Suponiendo ruta tipo /perfil/:nombre_unico
  const navigate = useNavigate();
  const [pro, setPro] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener datos del profesional y sus servicios
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        // Petición al backend (ajusta la ruta real de tu API)
        const profRes = await fetch(`http://localhost:4000/api/profesionales/publico/${nombre_unico}`);
        const profData = await profRes.json();
        if (profData.ok) {
          setPro(profData.profesional);
          setServicios(profData.servicios || []);
        }
      } catch (err) {
        setPro(null);
      }
      setLoading(false);
    };
    getData();
  }, [nombre_unico]);

  if (loading) return <Typography>Cargando perfil...</Typography>;
  if (!pro) return <Typography color="error">Profesional no encontrado</Typography>;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", my: 4, p: 2 }}>
      {/* Banner y datos */}
      <Box sx={{
        // Si quieres branding coloca color/fondo dinámico 
        bgcolor: "#f4f8fb", p: 2, borderRadius: 3, boxShadow: 2, mb: 4, display: "flex", alignItems: "center", gap: 4
      }}>
        <Avatar alt={pro.nombre} src={pro.foto_perfil || ""} sx={{ width: 92, height: 92, fontSize: 38 }}>
          {pro.nombre?.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h4">{pro.nombre} {pro.apellidos}</Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>{pro.especialidad}</Typography>
          <Typography color="textSecondary">{pro.ciudad} {pro.direccion && ("| " + pro.direccion)}</Typography>
          <Typography color="textSecondary">{pro.email}</Typography>
          {pro.descripcion_bio && (
            <Typography sx={{ mt: 2 }}>{pro.descripcion_bio}</Typography>
          )}
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h5" sx={{ mb: 2 }}>Servicios</Typography>
      <Grid container spacing={3}>
        {servicios.length === 0 && (
          <Grid item xs={12}>
            <Typography>Ningún servicio registrado aún.</Typography>
          </Grid>
        )}
        {servicios.map((serv) => (
          <Grid item xs={12} sm={6} md={4} key={serv.id_servicio}>
            <Card sx={{ p: 1, minHeight: 220 }}>
              <CardContent>
                <Typography variant="h6">{serv.nombre_servicio}</Typography>
                <Typography color="textSecondary">{serv.descripcion}</Typography>
                <Typography sx={{ mt: 1, fontWeight: "bold", color: "var(--color-primario)" }}>
                  ${serv.precio} COP
                </Typography>
                <Typography sx={{ fontSize: 14, color: "#777", mt: 1 }}>
                  Modalidad: {serv.modalidad} | Duración: {serv.duracion_minutos} min
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/reservar/${serv.id_servicio}`)}
                  size="small"
                >
                  Reservar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
