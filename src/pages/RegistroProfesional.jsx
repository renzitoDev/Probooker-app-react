import React, { useState } from 'react';
import {
  Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, Typography
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ciudades = ['Medellín', 'Bogotá', 'Cali', 'Barranquilla', 'Otra'];

export default function RegistroProfesional() {
  const [form, setForm] = useState({
    nombre: '', apellidos: '', email: '', telefono: '',
    ciudad: '', direccion: '', especialidad: '', password: ''
  });
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState({});
  const [submitMsg, setSubmitMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setDoc(e.target.files[0]);
  };

  const validate = () => {
    let errs = {};
    if (!form.nombre) errs.nombre = "Campo requerido";
    if (!form.email.match(/.+@.+\..+/)) errs.email = "Email inválido";
    if (!form.password || form.password.length < 6) errs.password = "Mínimo 6 caracteres";
    if (!doc) errs.doc = "Debe adjuntar acreditación";
    setError(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  // Crea un nuevo FormData para enviar campos + archivo
  const formData = new FormData();
  // Agrega todos los campos del formulario
  Object.entries(form).forEach(([key, value]) => formData.append(key, value));
  // Agrega el archivo (asegúrate que doc está seteado vía handleFile)
  formData.append('documento', doc);

  try {
    const response = await fetch('http://localhost:4000/api/profesionales/registro', {
      method: 'POST',
      // NO pongas "Content-Type": fetch lo agrega automáticamente para FormData
      body: formData,
    });
    const data = await response.json();
    if (data.ok) {
      setSubmitMsg('¡Registro exitoso!');
      // Si quieres, puedes limpiar el form aquí
      // setForm({/* valores vacíos */}); setDoc(null);
    } else {
      setSubmitMsg('Fallo el registro: ' + (data.error || ''));
    }
  } catch (err) {
    setSubmitMsg('Error en la comunicación con backend.');
  }
};



  return (
    <Box sx={{ maxWidth: 480, m: "auto", p: 2, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h4" mb={2}>Registro Profesional</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange}
          error={!!error.nombre} helperText={error.nombre} fullWidth margin="normal" />
        <TextField label="Apellidos" name="apellidos" value={form.apellidos} onChange={handleChange}
          fullWidth margin="normal" />
        <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange}
          error={!!error.email} helperText={error.email} fullWidth margin="normal" />
        <TextField label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange}
          fullWidth margin="normal" />
        <FormControl fullWidth margin="normal">
          <InputLabel>Ciudad</InputLabel>
          <Select name="ciudad" value={form.ciudad} onChange={handleChange}>
            {ciudades.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField label="Dirección" name="direccion" value={form.direccion} onChange={handleChange}
          fullWidth margin="normal" />
        <TextField label="Especialidad" name="especialidad" value={form.especialidad} onChange={handleChange}
          fullWidth margin="normal" />
        <FormControl fullWidth margin="normal">
          <Button
            variant="contained"
            color={error.doc ? "error" : "primary"}
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Adjuntar Acreditación
            <input type="file" hidden onChange={handleFile} />
          </Button>
          {doc && <span style={{ marginLeft: 10 }}>{doc.name}</span>}
          {error.doc && <Typography color="error">{error.doc}</Typography>}
        </FormControl>
        <TextField label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange}
          error={!!error.password} helperText={error.password} fullWidth margin="normal" />
        <Button variant="contained" type="submit" sx={{ mt: 2, width: "100%" }}>Registrarme</Button>
        {submitMsg && <Typography color="primary" mt={2}>{submitMsg}</Typography>}
      </form>
    </Box>
  );
}
