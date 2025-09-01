import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

export default function ReservaCita() {
  const { idServicio } = useParams();
  const navigate = useNavigate();
  const [servicio, setServicio] = useState(null);
  const [form, setForm] = useState({
    fecha_cita: "",
    hora_cita: "",
    modalidad: "",
    lugar: "",
    notas: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // Simular usuario logueado (en producción obtén de JWT/localStorage)
  const id_cliente = localStorage.getItem("id_cliente"); // o pide login primero

  useEffect(() => {
    // Trae detalles del servicio
    const fetchServicio = async () => {
      const res = await fetch(`http://localhost:4000/api/servicios/${idServicio}`);
      const data = await res.json();
      if (data.ok) setServicio(data.servicio);
    };
    fetchServicio();
  }, [idServicio]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReservar = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    if (!form.fecha_cita || !form.hora_cita || !form.modalidad || !id_cliente) {
      setError("Completa todos los campos y asegúrate de iniciar sesión.");
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/citas/crear', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_servicio: idServicio,
          id_cliente,
          ...form,
        })
      });
      const data = await res.json();
      if (data.ok) {
        setMsg("¡Cita reservada!");
        setTimeout(() => navigate("/"), 1800);
      } else {
        setError(data.error || "No se pudo reservar");
      }
    } catch {
      setError("Error de conexión.");
    }
  };

  if (!servicio) return <Typography>Cargando detalles de servicio...</Typography>;

  return (
    <Box sx={{ maxWidth: 440, m: "auto", p: 3, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h5">Reservar: {servicio.nombre_servicio}</Typography>
      <Typography sx={{ mb: 2 }}>{servicio.descripcion}</Typography>
      <form onSubmit={handleReservar}>
        <TextField
          label="Fecha"
          name="fecha_cita"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.fecha_cita} onChange={handleChange} fullWidth margin="normal"
        />
        <TextField
          label="Hora"
          name="hora_cita"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={form.hora_cita} onChange={handleChange} fullWidth margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Modalidad</InputLabel>
          <Select
            name="modalidad"
            value={form.modalidad}
            onChange={handleChange}
            label="Modalidad"
          >
            <MenuItem value="presencial">Presencial</MenuItem>
            <MenuItem value="virtual">Virtual</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Lugar / Link (opcional)"
          name="lugar"
          value={form.lugar} onChange={handleChange} fullWidth margin="normal"
        />
        <TextField
          label="Notas adicionales (opcional)"
          name="notas"
          value={form.notas} onChange={handleChange} fullWidth margin="normal"
        />
        <Button variant="contained" type="submit" sx={{ mt: 2, width: "100%" }}>
          Reservar cita
        </Button>
        {msg && <Typography color="primary" mt={2}>{msg}</Typography>}
        {error && <Typography color="error" mt={2}>{error}</Typography>}
      </form>
    </Box>
  );
}
