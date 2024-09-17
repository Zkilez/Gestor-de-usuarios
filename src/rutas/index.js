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
const res = require("express/lib/response");

// ----------------------- Rutas -----------------------

// Ruta para la página de inicio
// GET '/' - Renderiza la página principal
archivo.get('/', (req, res, next) => {
    res.render('inicio');  // Renderiza la vista 'inicio.ejs'
});

// Ruta para la página de inicio de sesión
// GET '/inicioSesion' - Renderiza la página de inicio de sesión
archivo.get('/inicioSesion', (req, res, next) => {
    res.render('inicioSesion');  // Renderiza la vista 'inicioSesion.ejs'
});

// Ruta para la página de registro
// GET '/formulario' - Renderiza la página de registro
archivo.get('/formulario', (req, res, next) => {
    res.render('formulario');  // Renderiza la vista 'formulario.ejs'
});

// Ruta para el registro de usuarios (POST)
// POST '/formulario' - Permite el registro de un nuevo usuario
archivo.post('/formulario', async (req, res) => {
    const { email, password, date } = req.body;  // Captura los datos del formulario

    // Verifica si el email ya existe en la base de datos
    const E = await User.findOne({ email });
    if (E) {
        res.send('El email ya existe');  // Si el email existe, devuelve un mensaje de error
    } else {
        // Si no existe, encripta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Crea un nuevo usuario con los datos del formulario
        const nuevoU = new User({ email, password: hashedPassword, date });
        
        // Guarda el usuario en la base de datos
        await nuevoU.save();
        res.send('El documento se guardó satisfactoriamente');  // Devuelve un mensaje de éxito
    }
});

// Ruta para el inicio de sesión (POST)
// POST '/inicioSesion' - Autentica al usuario
archivo.post('/inicioSesion', async (req, res) => {
    const { email, password } = req.body;  // Captura los datos del formulario

    try {
        // Busca al usuario en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('inicioSesion');  // Si el usuario no existe, vuelve a la página de inicio de sesión
        }

        // Compara la contraseña ingresada con la almacenada en la base de datos
        bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
                throw error;
            }
            if (!isMatch) {
                return res.send("La contraseña no es correcta");  // Si la contraseña no coincide, envía un mensaje de error
            }

            // Si la contraseña es correcta, redirige a la página de inicio (puedes cambiar esto por un dashboard)
            return res.render('inicio');
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');  // Si ocurre un error en el servidor, devuelve un mensaje de error
    }
});

// Ruta para la creación de pedidos (GET)
// GET '/crear_pedido' - Renderiza la página para crear pedidos
archivo.get('/crear_pedido', (req, res, next) => {
    res.render('crear_pedido');  // Renderiza la vista 'crear_pedido.ejs'
});

// Ruta para la creación de pedidos (POST)
// POST '/crear_pedido' - Permite la creación de un nuevo pedido
archivo.post('/crear_pedido', async (req, res) => {
    const { id_pedido, comprador, valor, articulo, descripcion, date } = req.body;  // Captura los datos del formulario

    // Verifica si el pedido ya existe
    const p = await orden.findOne({ id_pedido });
    if (p) {
        res.send('El pedido ya existe');  // Si el pedido ya existe, devuelve un mensaje de error
    } else {
        // Si no existe, crea un nuevo pedido con los datos proporcionados
        const nuevoP = new orden({ id_pedido, comprador, valor, articulo, descripcion, date });
        
        // Guarda el pedido en la base de datos
        await nuevoP.save();
        res.send('El pedido se guardó correctamente');  // Devuelve un mensaje de éxito
    }
});

// Ruta para la consulta de pedidos (GET)
// GET '/consultar_p' - Renderiza la página para consultar pedidos
archivo.get('/consultar_p', (req, res, next) => {
    res.render('consultar_p');  // Renderiza la vista 'consultar_p.ejs'
});

// Ruta para la consulta de pedidos (POST)
// POST '/Consultar_p' - Busca un pedido específico en la base de datos
archivo.post('/Consultar_p', async (req, res) => {
    const { id_pedido } = req.body;  // Captura el ID del pedido

    // Busca el pedido en la base de datos
    const Cp = await orden.findOne({ id_pedido });
    if (Cp) {
        res.send(Cp);  // Si el pedido existe, lo devuelve
    } else {
        res.send('El pedido no existe');  // Si no existe, envía un mensaje de error
    }
});


//get=>CRUD=>U=>Update
archivo.get('/update_p',(req,res,next)=>{
 res.render('update_p');

});


archivo.post('/update_p',async(req,res)=>{

const {id_pedido,descripcion}=req.body;
const update_p = await orden.findOne({id_pedido});
if(update_p){
//let instanciar la variable
let body = req.body;
orden.updateOne({id_pedido},{
  $set:{
       descripcion:body.descripcion

  }
 

},

function(error, info){
    if(error){
    res.json({
        resultado: false,
        msg: "No se pudo realizar la actualizacion",
        err

    });
    } else{
        res.json({
            resultado:true,
            info: info
    
        })    
    }

})

}else{
    res.send("El pedido no existe");
}

});


// Exporta el router para que pueda ser utilizado en otros módulos
module.exports = archivo;
