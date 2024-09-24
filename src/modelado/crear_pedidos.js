const mongoose = require('mongoose');

const { Schema } = mongoose;

const PedidoSchema = new Schema({
    id_pedido: { type: String, required: true, unique: true },  // Asegura que el ID del pedido sea único
    comprador: { type: String, required: true },
    valor: { type: Number, required: true },
    articulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    date: { type: Date, default: Date.now }  // Se establece la fecha por defecto
});

// Exporta el modelo de pedidos
module.exports = mongoose.model('Pedido', PedidoSchema);  // Cambié el nombre del modelo a 'Pedido'
