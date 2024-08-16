/**
 * Router for handling download-related requests
 */
import { Router } from "express";
import { getLeadByCodigoLeadJornada } from "../controllers/dowloads.controllers.js";
/**
 * Express router instance
 * @type {Router}
 */
const router = Router();
/**
 * Get a lead by its codigoJornadaLead
 * @route GET /downloads/:codigoJornadaLead
 * @param {string} codigoJornadaLead - The codigoJornadaLead of the lead to retrieve
 * @returns {object} The lead object
 * @example
 * // Get a lead with codigoJornadaLead = "ABC123"
 * GET /downloads/ABC123
 */
router.get('/downloads/:codigoJornadaLead', getLeadByCodigoLeadJornada)

export default router;