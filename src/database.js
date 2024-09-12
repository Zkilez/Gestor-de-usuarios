const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Diagonal')
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));
