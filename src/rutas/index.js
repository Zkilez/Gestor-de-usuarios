// Importación de módulos necesarios
const { Router } = require("express");  // Router de Express para manejar rutas
const express = require('express');  // Framework Express
// const passport = require('passport');  // Middleware para autenticación (comentado)

const archivo = express.Router();  // Creación de un objeto Router

// Importación de modelos
const User = require('../modelado/registro');  // Modelo de usuario
const orden = require('../modelado/crear_pedidos');  // Modelo de orden de pedidos

const passport = require('passport');  // Middleware de autenticación Passport
const bcrypt = require('bcrypt');  // Bcrypt para encriptar contraseñas

// Ruta para la página de inicio
archivo.get('/', (req, res, next) => {
    // Renderiza la vista 'inicio' cuando se accede a la ruta raíz
    res.render('inicio');
});

// Ruta para la página de inicio de sesión
archivo.get('/inicioSesion', (req, res, next) => {
    // Renderiza la vista 'inicioSesion' cuando se accede a /inicioSesion
    res.render('inicioSesion');
});

// Ruta para la página de registro (anteriormente formulario)
archivo.get('/registro', (req, res, next) => {
    // Renderiza la vista 'registro' cuando se accede a /registro
    res.render('registro');
});

module.exports = archivo;  // Exportación del router para ser utilizado en otras partes de la aplicación
