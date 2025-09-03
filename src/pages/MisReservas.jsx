import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Chip } from "@mui/material";
import SnackbarGlobal from "../components/SnackbarGlobal";

export default function MisReservas() {
  const id_cliente = localStorage.getItem("id_cliente");
  const [citas, setCitas] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showSnackbar = (msg, severity = "success") => setSnackbar({ open: true, message: msg, severity });

  useEffect(() => {
    cargarCitas();
    // eslint-disable-next-line
  }, []);

  const cargarCitas = async () => {
    const res = await fetch(`http://localhost:4000/api/citas/cliente/${id_cliente}`);
    const data = await res.json();
    if (data.ok) setCitas(data.citas);
  };

  const cancelarCita = async (id_cita) => {
    if (!window.confirm("¿Seguro de cancelar esta reserva?")) return;
    const res = await fetch(`http://localhost:4000/api/citas/cancelar/${id_cita}`, { method: "PUT" });
    const data = await res.json();
    if (data.ok) {
      showSnackbar("Reserva cancelada exitosamente");
      cargarCitas();
    } else {
      showSnackbar("No se pudo cancelar la reserva", "error");
    }
  };

  // Muestra primero próximas, luego pasadas
  const ahora = new Date().toISOString().slice(0, 16).replace("T", " ");
  const futuras = citas.filter(c => (c.fecha_cita + " " + c.hora_cita) > ahora);
  const pasadas = citas.filter(c => (c.fecha_cita + " " + c.hora_cita) <= ahora);

  return (
    <Box sx={{ maxWidth: 940, m: "auto", p: 3 }}>
      <Typography variant="h4" mb={3}>Mis Reservas</Typography>

      <Typography variant="h6" mt={2}>Próximas</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Servicio</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Profesional</TableCell>
            <TableCell>Notas</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {futuras.length === 0 && (
            <TableRow><TableCell colSpan={7}>No tienes reservas próximas.</TableCell></TableRow>
          )}
          {futuras.map(cita => (
            <TableRow key={cita.id_cita}>
              <TableCell>{cita.nombre_servicio}</TableCell>
              <TableCell>{cita.fecha_cita}</TableCell>
              <TableCell>{cita.hora_cita}</TableCell>
              <TableCell>
                {cita.profesional_nombre} {cita.profesional_apellidos}
                <br /><small>{cita.profesional_email}</small>
              </TableCell>
              <TableCell>{cita.notas}</TableCell>
              <TableCell>
                <Chip label={cita.estado} color={cita.estado === "confirmada" ? "success" : (cita.estado === "pendiente" ? "warning" : "default")} />
              </TableCell>
              <TableCell>
                {["pendiente", "confirmada"].includes(cita.estado) && (
                  <Button size="small" color="error" onClick={() => cancelarCita(cita.id_cita)}>
                    Cancelar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h6" mt={4}>Histórico</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Servicio</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Profesional</TableCell>
            <TableCell>Notas</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pasadas.length === 0 && (
            <TableRow><TableCell colSpan={6}>Sin reservas anteriores.</TableCell></TableRow>
          )}
          {pasadas.map(cita => (
            <TableRow key={cita.id_cita}>
              <TableCell>{cita.nombre_servicio}</TableCell>
              <TableCell>{cita.fecha_cita}</TableCell>
              <TableCell>{cita.hora_cita}</TableCell>
              <TableCell>
                {cita.profesional_nombre} {cita.profesional_apellidos}
              </TableCell>
              <TableCell>{cita.notas}</TableCell>
              <TableCell>
                <Chip label={cita.estado} color={cita.estado === "completada" ? "info" : (cita.estado === "cancelada" ? "error" : "default")} />
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
