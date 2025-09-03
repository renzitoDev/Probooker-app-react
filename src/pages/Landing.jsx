import React from "react";
import { AppBar, Toolbar, Button, Box, Typography, Stack, Grid, Card, CardContent } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoProbooker from "../components/LogoProbooker";
// Puedes cambiar la imagen por una tuya en assets si prefieres local:
import ilustracion from "../assets/landing-hero.svg";

export default function Landing() {
  const navigate = useNavigate();

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
    </Box>
  );
}
