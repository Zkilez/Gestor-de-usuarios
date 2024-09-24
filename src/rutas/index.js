// Importación de módulos de Express
const { Router } = require("express");
const express = require('express');
const archivo = express.Router();  // Crear una instancia del router

// Importación de modelos de la base de datos
const User = require('../modelado/registro');  // Modelo para usuarios
const orden = require('../modelado/crear_pedidos');  // Modelo para pedidos

// Importación de Passport para autenticación y bcrypt para el hashing de contraseñas
const passport = require('passport');
const bcrypt = require('bcrypt');

// ----------------------- Rutas -----------------------

// Ruta para la página de inicio
archivo.get('/', (req, res) => {
    res.render('inicio');
});

// Ruta para la página de inicio de sesión
archivo.get('/inicioSesion', (req, res) => {
    res.render('inicioSesion');
});

// Ruta para la página de registro
archivo.get('/formulario', (req, res) => {
    res.render('formulario');
});

// Ruta para el registro de usuarios (POST)
archivo.post('/formulario', async (req, res) => {
    const { email, password, date } = req.body;

    // Verifica si el email ya existe en la base de datos
    const E = await User.findOne({ email });
    if (E) {
        res.send('El email ya existe');
    } else {
        // Si no existe, encripta la contraseña y guarda el nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
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
            return res.render('inicioSesion'); // Podrías enviar un mensaje de error aquí
        }

        bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (!isMatch) return res.send("La contraseña no es correcta");
            return res.render('inicio'); // Redirige a la página de inicio si el login es correcto
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
});

// Ruta para la creación de pedidos (GET)
archivo.get('/crear_pedido', (req, res) => {
    res.render('crear_pedido');
});

// Ruta para la creación de pedidos (POST)
archivo.post('/crear_pedido', async (req, res) => {
    const { id_pedido, comprador, valor, articulo, descripcion, date } = req.body;

    try {
        const p = await orden.findOne({ id_pedido });
        if (p) {
            return res.send('El pedido ya existe');
        }
        const nuevoP = new orden({ id_pedido, comprador, valor, articulo, descripcion, date });
        await nuevoP.save();
        res.send('El pedido se guardó correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el pedido');
    }
});

// Ruta para la consulta de pedidos (GET)
archivo.get('/consultar_p', (req, res) => {
    res.render('consultar_p');
});

// Ruta para la consulta de pedidos (POST)
archivo.post('/Consultar_p', async (req, res) => {
    const { id_pedido } = req.body;

    try {
        console.log(`Consultando pedido con ID: ${id_pedido}`); // Para depuración
        const Cp = await orden.findOne({ id_pedido });
        if (Cp) {
            res.render('detalle_pedido', { pedido: Cp });
        } else {
            res.send('El pedido no existe');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar el pedido');
    }
});


// Ruta para mostrar el formulario de actualización de pedidos (GET)
archivo.get('/update_p', (req, res) => {
    res.render('update_p'); // Asegúrate de que este archivo exista
});

// Ruta para actualizar pedidos (POST)
archivo.post('/update_p', async (req, res) => {
    const { id_pedido, comprador, valor, articulo, descripcion } = req.body;  // Captura los datos del formulario

    try {
        // Busca el pedido en la base de datos
        const pedido = await orden.findOne({ id_pedido });

        if (pedido) {
            // Actualiza los campos del pedido
            pedido.comprador = comprador;  // Actualiza el comprador
            pedido.valor = Number(valor);  // Asegúrate de convertir el valor a número
            pedido.articulo = articulo;  // Actualiza el artículo
            pedido.descripcion = descripcion;  // Actualiza la descripción (si existe)

            // Guarda los cambios en la base de datos
            await pedido.save();  

            res.send('Pedido actualizado correctamente');  // Respuesta de éxito
        } else {
            res.status(404).send("El pedido no existe");  // Mensaje si el pedido no se encuentra
        }
    } catch (err) {
        console.error('Error al actualizar el pedido:', err);
        res.status(500).send("Error al actualizar el pedido");  // Manejo de errores del servidor
    }
});

// Ruta para eliminar un pedido (GET)
archivo.get('/delete_doc_p', (req, res) => {
    res.render('delete_doc_p'); // Asegúrate de que este archivo exista
});

// Ruta para eliminar un pedido (POST)
archivo.post('/delete_doc_p', async (req, res) => {
    const { id_pedido } = req.body;  // Captura el ID del pedido desde el formulario

    try {
        // Busca y elimina el pedido en la base de datos
        const resultado = await orden.findOneAndDelete({ id_pedido });

        if (resultado) {
            res.send('Pedido eliminado correctamente');  // Mensaje de éxito
        } else {
            res.status(404).send('El pedido no existe');  // Mensaje si el pedido no se encuentra
        }
    } catch (err) {
        console.error('Error al eliminar el pedido:', err);
        res.status(500).send('Error al eliminar el pedido');  // Manejo de errores del servidor
    }
});


// Exportar el router para usarlo en otros módulos
module.exports = archivo;
