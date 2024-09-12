const { Router } = require("express");
const express = require('express');
const archivo = express.Router();

// Importación de modelos
const User = require('../modelado/registro');
const orden = require('../modelado/crear_pedidos');

const passport = require('passport');
const bcrypt = require('bcrypt');

// Ruta para la página de inicio
archivo.get('/', (req, res, next) => {
    res.render('inicio');
});

// Ruta para la página de inicio de sesión
archivo.get('/inicioSesion', (req, res, next) => {
    res.render('inicioSesion');
});

// Ruta para la página de registro
archivo.get('/formulario', (req, res, next) => {
    res.render('formulario');
});

// Ruta para el formulario de registro (POST)
archivo.post('/formulario', async (req, res) => {
    const { email, password, date } = req.body;

    const E = await User.findOne({ email });
    if (E) {
        res.send('El email ya existe');
    } else {
        const hashedPassword = await bcrypt.hash(password, 10); // Asegúrate de encriptar la contraseña
        const nuevoU = new User({ email, password: hashedPassword, date });
        await nuevoU.save();
        res.send('El documento se guardó satisfactoriamente');
    }
});

// Ruta para el inicio de sesión (POST)
archivo.post('/inicioSesion', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('formulario');
        }

        bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
                throw error;
            }
            if (!isMatch) {
                return res.send("La contraseña no es correcta");
            }
            return res.render('inicio');
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
});

// Ruta para crear un pedido (GET)
archivo.get('/crear_pedido', (req, res, next) => {
    res.render('crear_pedido');
});

// Ruta para crear un pedido (POST)
archivo.post('/crear_pedido', async (req, res) => {
    const { id_pedido, comprador, valor, articulo, descripcion, date } = req.body;

    const p = await orden.findOne({ id_pedido });
    if (p) {
        res.send('El pedido ya existe');
    } else {
        const nuevoP = new orden({ id_pedido, comprador, valor, articulo, descripcion, date });
        await nuevoP.save();
        res.send('El pedido se guardó correctamente');
    }
});

// Ruta para consultar pedidos (GET)
archivo.get('/consultar_p', (req, res, next) => {
    res.render('consultar_p');
});

// Ruta para consultar pedidos (POST)
archivo.post('/Consultar_p', async (req, res) => {
    const { id_pedido } = req.body;

    const Cp = await orden.findOne({ id_pedido });
    if (Cp) {
        res.send(Cp);
    } else {
        res.send('El pedido no existe');
    }
});

module.exports = archivo;
