import React, { useState } from 'react';
import {
  Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, Typography
} from '@mui/material';

const ciudades = ['Medellín', 'Bogotá', 'Cali', 'Barranquilla', 'Otra'];

export default function RegistroCliente() {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    ciudad: '',
    direccion: '',
    password: '',
  });
  const [error, setError] = useState({});
  const [submitMsg, setSubmitMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errs = {};
    if (!form.nombre) errs.nombre = "Campo requerido";
    if (!form.apellidos) errs.apellidos = "Campo requerido";
    if (!form.email.match(/.+@.+\..+/)) errs.email = "Email inválido";
    if (!form.telefono) errs.telefono = "Campo requerido";
    if (!form.ciudad) errs.ciudad = "Campo requerido";
    if (!form.direccion) errs.direccion = "Campo requerido";
    if (!form.password || form.password.length < 6) errs.password = "Mínimo 6 caracteres";
    setError(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await fetch('http://localhost:4000/api/clientes/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      setSubmitMsg(data.ok ? "¡Registro exitoso!" : "Error: " + (data.error || ''));
    } catch (err) {
      setSubmitMsg('Error en la comunicación con backend.');
    }
  };

  return (
    <Box sx={{ maxWidth: 480, m: "auto", p: 2, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h4" mb={2}>Registro Cliente</Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          error={!!error.nombre}
          helperText={error.nombre}
          fullWidth margin="normal"
        />
        <TextField
          label="Apellidos"
          name="apellidos"
          value={form.apellidos}
          onChange={handleChange}
          error={!!error.apellidos}
          helperText={error.apellidos}
          fullWidth margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={!!error.email}
          helperText={error.email}
          fullWidth margin="normal"
        />
        <TextField
          label="Teléfono"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          error={!!error.telefono}
          helperText={error.telefono}
          fullWidth margin="normal"
        />
        <FormControl fullWidth margin="normal" error={!!error.ciudad}>
          <InputLabel>Ciudad</InputLabel>
          <Select name="ciudad" value={form.ciudad} onChange={handleChange} label="Ciudad">
            {ciudades.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
          {error.ciudad && <Typography color="error">{error.ciudad}</Typography>}
        </FormControl>
        <TextField
          label="Dirección"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          error={!!error.direccion}
          helperText={error.direccion}
          fullWidth margin="normal"
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={!!error.password}
          helperText={error.password}
          fullWidth margin="normal"
        />
        <Button variant="contained" type="submit" sx={{ mt: 2, width: "100%" }}>
          Registrarme
        </Button>
        {submitMsg && <Typography color={submitMsg.includes('exitoso') ? "primary" : "error"} mt={2}>{submitMsg}</Typography>}
      </form>
    </Box>
  );
}
