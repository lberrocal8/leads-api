import { Router } from "express";
import { postJornadas, getJornadas, getJornadasByCodigoJornada } from "../controllers/jornadas.controllers.js";

const router = Router();
/**
 * Get all jornadas
 * 
 * @route GET /jornadas
 * @returns {Array<Jornada>} List of jornadas
 * @example
 * curl -X GET \
  http://localhost:3000/jornadas \
  -H 'Content-Type: application/json'
 */
router.get('/jornadas', getJornadas)
/**
 * Get a jornada by codigoJornada
 * 
 * @route GET /jornadas/:codigoJornada
 * @param {string} codigoJornada - Codigo of the jornada to retrieve
 * @returns {Jornada} Jornada with the specified codigoJornada
 * @example
 * curl -X GET \
  http://localhost:3000/jornadas/12345 \
  -H 'Content-Type: application/json'
 */
router.get('/jornadas/:codigoJornada', getJornadasByCodigoJornada)
/**
 * Create a new jornada
 * 
 * @route POST /jornadas
 * @body {Jornada} jornada - Jornada to create
 * @returns {Jornada} Created jornada
 * @example
 * curl -X POST \
  http://localhost:3000/jornadas \
  -H 'Content-Type: application/json' \
  -d '{"nombreJornada": "Jornada 1", "directorJornada": "SampleName", "codigoJornada": "jskX2", "fechaEjecucionJornada": "SampleDate (YYYY-MM-DD)"}'
 */
router.post('/jornadas', postJornadas)

export default router;