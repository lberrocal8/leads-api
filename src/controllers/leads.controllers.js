import { getConnection } from "../database/connection.js";
import sql from "mssql"

/**
 * Retrieves all leads from the database.
 * 
 * @returns {Promise<object[]>} An array of lead objects.
 * @example
 * const leads = await getLeads();
 * console.log(leads); // Output: [{ id: 1, nombresLead: 'John Doe', ... }, { id: 2, nombresLead: 'Jane Doe', ... }]
 */
export const getLeads = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM [dbo].[Leads]')
    res.json(result.recordset);
}

/**
 * Retrieves a lead by its numeroDocumentoLead from the database (NOT USED YET).
 * 
 * @param {string} numeroDocumentoLead The numeroDocumentoLead of the lead to retrieve.
 * @returns {Promise<object>} The lead object if found, null otherwise.
 * @example
 * const lead = await getLeadByNumeroDocumento({ body: { numeroDocumentoLead: '123456789' } });
 * console.log(lead); // Output: { id: 1, nombresLead: 'John Doe', ... }
 */
export const getLeadByNumeroDocumento = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('numeroDocumentoLead', sql.VarChar, req.body.numeroDocumentoLead)
        .query('SELECT * FROM [dbo].[Leads] WHERE numeroDocumentoLead=@numeroDocumentoLead;')
    res.json(result.recordset);
}

/**
 * Creates a new lead in the database.
 * 
 * @param {object} req.body The lead data to create.
 * @returns {Promise<string>} A success message indicating the lead was created.
 * @example
 * const leadData = {
 *   nombresLead: 'New Lead',
 *   apellidosLead: 'New Lead',
 *   telefonoLead: '1234567890',
 *   correoLead: 'newlead@example.com',
 *   tipoDocumentoLead: 'CC',
 *   numeroDocumentoLead: '123456789',
 *   generoLead: 'M',
 *   institucionLead: 'University',
 *   programaLead: 'Engineering',
 *   codigoJornadaLead: 'Morning'
 * };
 * await postLead({ body: leadData });
 * console.log('Lead created successfully!');
 */
export const postLead = async (req, res) => {
    const pool = await getConnection()
    const result = await pool
        .request()
        .input('nombresLead', sql.VarChar, req.body.nombresLead)
        .input('apellidosLead', sql.VarChar, req.body.apellidosLead)
        .input('telefonoLead', sql.VarChar, req.body.telefonoLead)
        .input('correoLead', sql.VarChar, req.body.correoLead)
        .input('tipoDocumentoLead', sql.VarChar, req.body.tipoDocumentoLead)
        .input('numeroDocumentoLead', sql.VarChar, req.body.numeroDocumentoLead)
        .input('generoLead', sql.VarChar, req.body.generoLead)
        .input('institucionLead', sql.VarChar, req.body.institucionLead)
        .input('programaLead', sql.VarChar, req.body.programaLead)
        .input('codigoJornadaLead', sql.VarChar, req.body.codigoJornadaLead)
        .query('INSERT INTO [dbo].[Leads] (nombresLead, apellidosLead, telefonoLead, correoLead, tipoDocumentoLead, numeroDocumentoLead, generoLead, institucionLead, programaLead, codigoJornadaLead) VALUES (@nombresLead, @apellidosLead, @telefonoLead, @correoLead, @tipoDocumentoLead, @numeroDocumentoLead, @generoLead, @institucionLead, @programaLead, @codigoJornadaLead); ')
    res.json({ 'info': `Lead con número de documento ${req.body.numeroDocumentoLead} creado correctamente` })
}