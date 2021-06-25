const { io } = require('../index');
const Band = require('../models/band');

const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('ska-p') )
bands.addBand( new Band('metallica') )
bands.addBand( new Band('nana pancha') )
bands.addBand( new Band('rude boys') )

console.log(bands)

// Mensajes de sockets
io.on('connection', client => {
    console.log("Cliente conectado");

    client.emit('active-bands', bands)

    client.on('disconnect', () => {
        console.log("Cliente desconectado")
    });


    client.on('mensaje', (payload) => {
        console.log("Mensaje!!", payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje' });
    });

    client.on('emitir-mensaje', (payload) => {
	console.log("Flutter socket", payload)
	client.broadcast.emit('nuevo-mensaje', payload);
    });

});
