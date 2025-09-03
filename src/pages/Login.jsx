import React, { useState } from "react";
import SnackbarGlobal from "../components/SnackbarGlobal";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await resp.json();
      if (data.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("tipo_usuario", data.tipo_usuario);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("id_usuario", data.id_usuario);
        if (data.id_profesional)
          localStorage.setItem("id_profesional", data.id_profesional);
        else localStorage.removeItem("id_profesional");

        if (data.id_cliente)
          localStorage.setItem("id_cliente", data.id_cliente);
        else localStorage.removeItem("id_cliente");

        showSnackbar(`¡Bienvenido, ${data.nombre}!`, "success");
        setTimeout(() => {
          if (data.tipo_usuario === "profesional")
            window.location.href = `/perfil-profesional/${data.id_profesional}`;
          else window.location.href = "/";
        }, 1200);
      } else {
        showSnackbar(data.error || "Usuario o contraseña incorrectos.", "error");
      }
    } catch {
      showSnackbar("Error de servidor.", "error");
    }
  };

  return (
    <div style={{ maxWidth: 380, margin: "auto", boxShadow: "0 2px 8px #eee", padding: 24, borderRadius: 8 }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 16 }}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ddd" }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ddd" }}
          />
        </div>
        <button style={{ width: "100%", padding: 12, borderRadius: 4, border: 0, background: "#1976d2", color: "#fff" }}>
          Iniciar Sesión
        </button>
      </form>
      <SnackbarGlobal
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
}
