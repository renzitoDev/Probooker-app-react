import React, { useEffect, useState } from "react";
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const modalidades = ["presencial", "virtual"];

export default function ServiciosProfesional() {
  // Puedes obtener el id_profesional de localStorage o prop/context tras login
  const id_profesional = localStorage.getItem("id_profesional"); // asegúrate de setear tras login
  const [servicios, setServicios] = useState([]);
  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    nombre_servicio: "", descripcion: "", precio: "", modalidad: "", duracion_minutos: ""
  });

  // Fetch servicios al montar
  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    const res = await fetch(`http://localhost:4000/api/servicios/profesional/${id_profesional}`);
    const data = await res.json();
    if (data.ok) setServicios(data.servicios);
  };

  const handleOpen = (serv = null) => {
    setOpen(true);
    if (serv) {
      setEditando(serv.id_servicio);
      setForm({...serv});
    } else {
      setEditando(null);
      setForm({nombre_servicio: "", descripcion: "", precio: "", modalidad: "", duracion_minutos: ""});
    }
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSave = async () => {
    if (!form.nombre_servicio || !form.precio || !form.modalidad)
      return alert("Completa los campos obligatorios");

    if (editando) {
      // Editar
      await fetch(`http://localhost:4000/api/servicios/editar/${editando}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
      });
    } else {
      // Crear
      await fetch('http://localhost:4000/api/servicios/crear', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ ...form, id_profesional })
      });
    }
    cargarServicios();
    handleClose();
  };

  const handleDelete = async (id_servicio) => {
    if (!window.confirm("¿Seguro de eliminar este servicio?")) return;
    await fetch(`http://localhost:4000/api/servicios/eliminar/${id_servicio}`, { method: "DELETE" });
    cargarServicios();
  };

  return (
    <Box sx={{ maxWidth: 940, m: "auto", p: 3 }}>
      <Typography variant="h4" mb={3}>Gestión de Servicios</Typography>
      <Button variant="contained" onClick={() => handleOpen()} sx={{ mb: 2 }}>Nuevo Servicio</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Modalidad</TableCell>
            <TableCell>Duración (min)</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servicios.map((serv) => (
            <TableRow key={serv.id_servicio}>
              <TableCell>{serv.nombre_servicio}</TableCell>
              <TableCell>{serv.descripcion}</TableCell>
              <TableCell>${serv.precio}</TableCell>
              <TableCell>{serv.modalidad}</TableCell>
              <TableCell>{serv.duracion_minutos}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpen(serv)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(serv.id_servicio)}><DeleteIcon color="error"/></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Dialogo Crear/Editar */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editando ? "Editar" : "Nuevo"} Servicio</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" name="nombre_servicio" value={form.nombre_servicio} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Precio" name="precio" type="number" value={form.precio} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Duración (min)" name="duracion_minutos" type="number" value={form.duracion_minutos} onChange={handleChange} fullWidth margin="normal" />
          <TextField
            select
            label="Modalidad"
            name="modalidad"
            value={form.modalidad}
            onChange={handleChange}
            fullWidth margin="normal"
          >
            {modalidades.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>{editando ? "Actualizar" : "Crear"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
