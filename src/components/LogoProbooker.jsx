import React from "react";
import logo from "../assets/logo-probooker.png"; // ajusta la ruta si tu logo es SVG o se llama diferente

export default function LogoProbooker({ width = 130, ...props }) {
  return (
    <img
      src={logo}
      alt="ProBooker logo"
      width={width}
      style={{ display: "block" }}
      {...props}
    />
  );
}
