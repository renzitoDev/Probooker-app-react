import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Select, MenuItem } from "@mui/material";
import SnackbarGlobal from "../components/SnackbarGlobal";

const estados = ["pendiente", "confirmada", "rechazada", "completada", "cancelada"];

export default function PanelCitasProfesional() {
  const id_profesional = localStorage.getItem("id_profesional");
  const [citas, setCitas] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showSnackbar = (message, severity="success") => setSnackbar({ open: true, message, severity });

  useEffect(() => {
    cargarCitas();
    // eslint-disable-next-line
  }, []);

  const cargarCitas = async () => {
    const res = await fetch(`http://localhost:4000/api/citas/profesional/${id_profesional}`);
    const data = await res.json();
    if (data.ok) setCitas(data.citas);
  };

  const cambiarEstado = async (id_cita, nuevo_estado) => {
    const res = await fetch(`http://localhost:4000/api/citas/estado/${id_cita}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ nuevo_estado })
    });
    const data = await res.json();
    if (data.ok) {
      showSnackbar("Estado actualizado");
      cargarCitas();
    } else {
      showSnackbar("Error al actualizar estado", "error");
    }
  };

  return (
    <Box sx={{ maxWidth: 950, m: "auto", p: 3 }}>
      <Typography variant="h4" mb={3}>Panel de Reservas</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Servicio</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Modalidad</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Notas</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {citas.map(cita => (
            <TableRow key={cita.id_cita}>
              <TableCell>{cita.nombre_servicio}</TableCell>
              <TableCell>{cita.fecha_cita}</TableCell>
              <TableCell>{cita.hora_cita}</TableCell>
              <TableCell>{cita.modalidad}</TableCell>
              <TableCell>
                {cita.cliente_nombre} {cita.cliente_apellidos}
                <br />
                <small>{cita.cliente_email} / {cita.cliente_telefono}</small>
              </TableCell>
              <TableCell>{cita.notas}</TableCell>
              <TableCell>
                <Select
                  value={cita.estado}
                  onChange={e => cambiarEstado(cita.id_cita, e.target.value)}
                  size="small"
                >
                  {estados.map(e => (
                    <MenuItem key={e} value={e}>{e}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                {cita.estado !== "completada" && (
                  <Button size="small" color="success" variant="contained"
                    onClick={() => cambiarEstado(cita.id_cita, "completada")}>
                    Marcar como completada
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SnackbarGlobal
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
}
