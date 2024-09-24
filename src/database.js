const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/Diagonal';

mongoose.connect(mongoURI)
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
    console.error('Detalles del error:', err.reason);
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', function() {
  console.log('Conexión a la base de datos establecida con éxito');
});