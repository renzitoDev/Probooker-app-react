import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { AppBar, Toolbar, Button, Box, Typography, Stack, Grid, Card, CardContent,CardMedia } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoProbooker from "../components/LogoProbooker";
// Puedes cambiar la imagen por una tuya en assets si prefieres local:
import ilustracion from "../assets/landing-hero.svg";

export default function Landing() {
   const [profesionales, setProfesionales] = useState([]);
   const navigate = useNavigate();

    useEffect(() => {
      // Obtener profesionales y quedarnos con 6 random para el slider:
      fetch("http://localhost:4000/api/profesionales")
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            // Mezcla y toma 6 random; si tienes campo destacado, filtra primero por eso:
            const mezclados = [...data.profesionales].sort(() => 0.5 - Math.random());
            setProfesionales(mezclados.slice(0, 6));
          }
        });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: Math.min(3, profesionales.length),
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        responsive: [
          { breakpoint: 900, settings: { slidesToShow: 2 } },
          { breakpoint: 600, settings: { slidesToShow: 1 } },
        ],
      };
        

  return (
    <Box>
      {/* NAVBAR CON LOGO Y BOTONES */}
      <AppBar position="static" color="inherit" elevation={1} sx={{ mb: 1 }}>
        <Toolbar>
          <LogoProbooker width={140} style={{ cursor: "pointer" }} onClick={() => navigate("/")} />
          <Box sx={{ flexGrow: 1 }} />
          <Button color="primary" variant="text" onClick={() => navigate("/profesionales")}>
            Buscar profesionales
          </Button>
          <Button color="secondary" variant="outlined" sx={{ mx: 1 }} component={Link} to="/registro-profesional">
            Quiero ser profesional
          </Button>
          <Button color="primary" onClick={() => navigate("/login")}>
            Iniciar sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* HERO LANDING */}
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          textAlign: "center",
          py: { xs: 4, md: 8 },
          background: "#f6f8fb"
        }}
      >
        <Typography variant="h2" color="primary" sx={{ mb: 2, fontWeight: 'bold', letterSpacing: 1 }}>
          Bienvenido a ProBooker
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Reserva servicios profesionales online <span style={{ color: "#1976d2", fontWeight: 600 }}>¡en minutos!</span>
        </Typography>
        <img
          alt="Servicios profesionales"
          src={ilustracion}
          // src={heroImg}
          style={{ width: 340, borderRadius: 16, marginBottom: 36, maxWidth: "100%" }}
        />
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={5}>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate("/profesionales")}>
            Buscar profesionales
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            component={Link}
            to="/registro-profesional"
          >
            Quiero ser profesional
          </Button>
        </Stack>
        <Grid container spacing={3} maxWidth={950} mb={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">Agenda rápida</Typography>
                <Typography variant="body2">Reserva tus citas en menos de 3 clics.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">Solo profesionales verificados</Typography>
                <Typography variant="body2">Calidad garantizada y opiniones reales de clientes.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">Gestiona todo online</Typography>
                <Typography variant="body2">Tu espacio, tus servicios, tu marca.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      {/* SLIDER PROFESIONALES DESTACADOS */}
      <Box sx={{ mt: 6, mb: 2 }}>
        <Typography variant="h5" align="center" sx={{ mb: 4, fontWeight: 600, color: "primary.main" }}>
          Profesionales destacados esta semana
        </Typography>
        <Slider {...settings}>
          {profesionales.map(p => (
            <Box key={p.id_profesional} px={2}>
              <Card sx={{ maxWidth: 320, m: "auto", cursor: "pointer" }} onClick={() => navigate(`/perfil/${p.url_personalizada}`)}>
                <CardMedia
                  component="img"
                  image={p.foto_url || "/default-avatar.png"}
                  sx={{ height: 160, objectFit: "cover", background: "#eaeaea" }}
                  alt={p.nombre}
                />
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {p.nombre} {p.apellidos}
                  </Typography>
                  <Typography variant="body2">{p.ciudad}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                    {p.descripcion?.slice(0, 60) || "-"}
                  </Typography>
                  <Button sx={{ mt: 1 }} variant="outlined" size="small" fullWidth>
                    Ver perfil
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>

      <Box sx={{ mt: 7, mb: 4, maxWidth: 900, mx: "auto" }}>
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 600, color: "secondary.main" }}>
          Lo que opinan nuestros usuarios
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="body1">“Gracias a ProBooker conseguí clientes en mi zona al instante, ¡es súper fácil!”</Typography>
              <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: 700 }}>Juan (Entrenador)</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="body1">“La agenda y las alertas son lo mejor. Ahora mis pacientes reservan y cancelan online.”</Typography>
              <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: 700 }}>Renzo (Nutriólogo)</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="body1">“Encontré una masajista genial. Reservar fue simple y confiable, 100% recomendado.”</Typography>
              <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: 700 }}>Carla (Cliente)</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
}
