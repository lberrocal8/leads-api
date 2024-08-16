/**
 * Retrieves a lead by its codigoJornadaLead and generates an Excel file with the lead's data.
 * 
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * 
 * @example
 * GET /lead/:codigoJornadaLead
 * 
 * @returns {Promise<void>} A promise that resolves when the Excel file is sent to the client
 */

import sql from "mssql"
import { getConnection } from "../database/connection.js";
import XlsxPopulate from "xlsx-populate"

export const getLeadByCodigoLeadJornada = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('codigoJornadaLead', sql.VarChar, req.params.codigoJornadaLead)
        .query('SELECT * FROM [dbo].[Leads] WHERE codigoJornadaLead=@codigoJornadaLead;')
    
    const codigoJornada = req.params.codigoJornadaLead;
    const workBook = await XlsxPopulate.fromBlankAsync();
    const fileName = `Jornada_${codigoJornada}.xlsx`;
    const datos = result.recordset;

    try {
        workBook.sheet(0).name(`Jornada ${codigoJornada}`)
        const headers = workBook.sheet(0).range("A1:J1").style({ bold: true, fontSize: 12 });

        /**
         * Set the header row values
         * 
         * @example
         * | JORNADA | NOMBRES | APELLIDOS | ... |
         */
        headers.value([
            ['JORNADA','NOMBRES','APELLIDOS','TELÉFONO','CORREO ELECTRÓNICO','TIPO DE DOCUMENTO','NUMERO DE DOCUMENTO','GENERO','INSTITUCION','PROGRAMA']
        ])

        datos.forEach((item, index) => {
            const dataForRow = workBook.sheet(0).cell(`A${index+2}`);
            /**
             * Set the rows values corresponding of header row
             * 
             * @example
             * | jornada.value | nombres.value | apellidos.value | ... |
             */
            dataForRow.value([
                [item.codigoJornadaLead, item.nombresLead, item.apellidosLead, item.telefonoLead, item.correoLead, item.tipoDocumentoLead, item.numeroDocumentoLead, item.generoLead, item.institucionLead, item.programaLead]
            ])
        });

        /**
         * Set the header response with Content-Disp and Content-type to download file on client
         */
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        await workBook.outputAsync({ type: 'buffer' })
            .then((buffer) => {
                res.send(buffer);
            });
    } catch (error) {
        console.error(error)
        res.status(500).send('API: Error al generar el archivo')
    }
}