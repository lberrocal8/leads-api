const { request, response } = require('express');
const connection = require('./connection');

// ENDPOINT TO GET LEADS
exports.getLeads = (request, response) => {
    try {
        const request = connection.request('SELECT * FROM [dbo].[Leads];', (err, rowCount, rows) => {
            if (err) {
                console.error('API: Error al obtener los leads')
            } else {
                response.status(201).json(rows);
            }
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send('API: Error al obtener los leads');
    }
};

// ENDPOINT TO GET JORNADAS
exports.getJornadas = async (request, response) => {
    try {
        const [ rows ] = await (await connection).execute('SELECT * FROM Jornadas;');
        response.status(201).json(rows);
    } catch (error) {
        console.log(error.message);
        response.status(500).send('API: Error al obtener las jornadas');
    }
};

// ENDPOINT TO CREATE LEAD
exports.postLeads = async (request, response) => {
    const { nombres, apellidos, telefono, correo, tipo_documento, numero_documento, genero, institucion, programa, id_jornada } = request.body;
    try {
        const results = await (await connection).execute('INSERT INTO Leads (nombres, apellidos, telefono, correo, tipo_documento, numero_documento, genero, institucion, programa, id_jornada) VALUES (?,?,?,?,?,?,?,?,?,?);', [ nombres, apellidos, telefono, correo, tipo_documento, numero_documento, genero, institucion, programa, id_jornada ]);
        response.status(201).json(`API: Lead creado con exito`);
    } catch (error) {
        console.log(error.message);
        response.status(500).send('API: Error al crear el lead');
    }
};

// ENDPOINT TO CREATE CAMPAIGN
exports.postJornadas = async (request, response) => {
    const { codigo_jornada, nombre_jornada, director_jornada, fecha_ejecucion } = request.body;
    try {
        const results = await (await connection).execute('INSERT INTO Jornadas (codigo_jornada, nombre_jornada, director_jornada, fecha_ejecucion) VALUES (?,?,?,?)', [ codigo_jornada, nombre_jornada, director_jornada, fecha_ejecucion ]);
        response.status(201).send(`API: Campaña con código ${codigo_jornada} creada correctamente`)
    } catch (error) {
        console.log(error.message);
        response.status(500).send('API: Error al crear la jornada');
    }
};

// ENDPOINT TO GET LEADS FROM A JORNADA
exports.getLeadsFromJornada = async (request, response) => {
    const { id_jornada } = request.params;
    try {
        const [ rows ] = await (await connection).execute("SELECT * FROM Leads WHERE id_jornada = ?;", [ id_jornada ]);
        response.status(201).json(rows);
    } catch (error) {
        console.log(error.message);
        response.status(500).send('API: Error al obtener los leads de la jornada');
    }
};