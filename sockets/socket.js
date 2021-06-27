const { io } = require('../index');
const Band = require('../models/band');

const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('ska-p') )
bands.addBand( new Band('metallica') )
bands.addBand( new Band('nana pancha') )
bands.addBand( new Band('rude boys') )

// console.log(bands)

// Mensajes de sockets
io.on('connection', client => {
    console.log("Cliente conectado");

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });


    client.on('mensaje', (payload) => {
        console.log("Mensaje!!", payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje' });
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

});
