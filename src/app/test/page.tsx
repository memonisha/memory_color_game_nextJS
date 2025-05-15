// src/app/test/page.tsx

"use client";
import React from "react";

export default function TestPage() {
  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "100px", justifyContent: "center" }}>
      <div style={{ width: "100px", height: "100px", backgroundColor: "red" }}></div>
      <div style={{ width: "100px", height: "100px", backgroundColor: "blue" }}></div>
      <div style={{ width: "100px", height: "100px", backgroundColor: "green" }}></div>
      <div style={{ width: "100px", height: "100px", backgroundColor: "yellow" }}></div>
    </div>
  );
}
