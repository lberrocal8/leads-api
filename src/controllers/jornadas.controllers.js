import { getConnection } from "../database/connection.js";
import sql from "mssql";

/**
 * Retrieves all jornadas from the database.
 * 
 * @returns {Promise<object[]>} An array of jornada objects
 * @example
 * const jornadas = await getJornadas();
 * console.log(jornadas); // [{ id: 1, codigoJornada: 'J1', ... }, { id: 2, codigoJornada: 'J2', ... }]
 */
export const getJornadas = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.query("SELECT * FROM [dbo].[Jornadas];")
    res.json(result.recordset)
}

/**
 * Retrieves a jornada by its codigoJornada from the database.
 * 
 * @param {string} req.body.codigoJornada The codigoJornada of the jornada to retrieve
 * @returns {Promise<object>} The jornada object
 * @example
 * const jornada = await getJornadasByCodigoJornada({ body: { codigoJornada: 'J1' } });
 * console.log(jornada); // { id: 1, codigoJornada: 'J1', ... }
 */
export const getJornadasByCodigoJornada = async (req, res) => {
    const pool = await getConnection()
    const result = await pool
        .input('codigoJornada', sql.VarChar, req.body.codigoJornada)
        .query("SELECT * FROM [dbo].[Jornadas] WHERE codigoJornada=@codigoJornada;")
    res.json(result.recordset)
}

/**
 * Creates a new jornada in the database.
 * 
 * @param {object} req.body The jornada data to create
 * @param {string} req.body.codigoJornada The codigoJornada of the jornada
 * @param {string} req.body.nombreJornada The nombreJornada of the jornada
 * @param {string} req.body.directorJornada The directorJornada of the jornada
 * @param {Date} req.body.fechaEjecucionJornada The fechaEjecucionJornada of the jornada
 * @returns {Promise<object>} A success message
 * @example
 * const jornadaData = {
 *   codigoJornada: 'J3',
 *   nombreJornada: 'Jornada 3',
 *   directorJornada: 'John Doe',
 *   fechaEjecucionJornada: new Date('2022-01-01')
 * };
 * const result = await postJornadas({ body: jornadaData });
 * console.log(result); // { info: 'Jornada con codigo J3 creada correctamente' }
 */
export const postJornadas = async (req, res) => {
    const pool = await getConnection()
    const result = await pool
        .request()
        .input('codigoJornada', sql.VarChar, req.body.codigoJornada)
        .input('nombreJornada', sql.VarChar, req.body.nombreJornada)
        .input('directorJornada', sql.VarChar, req.body.directorJornada)
        .input('fechaEjecucionJornada', sql.Date, req.body.fechaEjecucionJornada)
        .query("INSERT INTO [dbo].[Jornadas] (codigoJornada, nombreJornada, directorJornada, fechaEjecucionJornada) VALUES (@codigoJornada, @nombreJornada, @directorJornada, @fechaEjecucionJornada);")
    res.json({ 'info': `Jornada con codigo ${req.body.codigoJornada} creada correctamente` })
}