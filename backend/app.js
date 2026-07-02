// ══════════════════════════════════════════
// app.js — Configuración de Express
// Aquí se define qué rutas existen y qué
// middleware se aplica a cada una.
// ══════════════════════════════════════════

'use strict';

const express    = require('express');
const cors       = require('cors');
const authRouter  = require('./auth');
const vaultRouter = require('./vault');

const app = express();

// ── Middleware global ──────────────────────

// Sirve el frontend (index.html, script.js, styles.css) como estático
const path = require('path');
app.use(express.static(path.join(__dirname, '..')));

// Permite que el frontend (en otro origen) se comunique con esta API
app.use(cors({
  origin: '*', // En producción cambia esto a tu dominio real
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Permite leer el body de las peticiones como JSON
app.use(express.json());

// ── Rutas ─────────────────────────────────

// Ruta de salud de la API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mensaje: 'Vault Seguro API corriendo ✅' });
});

// Rutas de autenticación: /api/auth/register y /api/auth/login
app.use('/api/auth', authRouter);

// Rutas del vault: /api/vault (protegidas con JWT)
app.use('/api/vault', vaultRouter);

// ── Manejo de errores global ───────────────
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;
