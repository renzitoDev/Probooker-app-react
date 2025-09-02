import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    try {
      const resp = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await resp.json();
      console.log("Respuesta del backend:", data);

      if (data.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("tipo_usuario", data.tipo_usuario);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("id_usuario", data.id_usuario);
        console.log(data);
        // Guarda el identificador correspondiente
        console.log(data.id_profesional);
        if (data.id_profesional)
          localStorage.setItem("id_profesional", data.id_profesional);
        else localStorage.removeItem("id_profesional");

        if (data.id_cliente)
          localStorage.setItem("id_cliente", data.id_cliente);
        else localStorage.removeItem("id_cliente");

        setMensaje(`¡Bienvenido, ${data.nombre}!`);
        console.log(
        "tipo_usuario:", localStorage.getItem("tipo_usuario"),
        "id_profesional:", localStorage.getItem("id_profesional"),
        "token:", localStorage.getItem("token")
      );

        // Redirección según tipo de usuario (ajusta a tu estructura)
        setTimeout(() => {
          if (data.tipo_usuario === "profesional" && data.id_profesional)
            window.location.href = `/perfil-profesional/${data.id_profesional}`;
          else window.location.href = "/";
        }, 1200);
      } else {
        setError(data.error || "Usuario o contraseña incorrecta.");
      }
    } catch {
      setError("Error de servidor.");
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
        <button className="btn-primary" style={{ width: "100%", padding: 12, borderRadius: 4, border: 0 }}>
          Iniciar Sesión
        </button>
        {error && <div style={{ color: "#f44336", marginTop: 16 }}>{error}</div>}
        {mensaje && <div style={{ color: "#388e3c", marginTop: 16 }}>{mensaje}</div>}
      </form>
    </div>
  );
}
