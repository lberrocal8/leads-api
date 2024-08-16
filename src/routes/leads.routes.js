import { Router } from "express";
import { getLeads, getLeadByNumeroDocumento, postLead } from "../controllers/leads.controllers.js";

const router = Router();

/**
 * Get all leads
 * 
 * @route GET /leads
 * @returns {array} Array of leads
 * @example
 * curl -X GET \
  http://localhost:3000/leads \
  -H 'Content-Type: application/json'
 */
router.get('/leads', getLeads)

/**
 * Get a lead by numero documento (NOT USED YET)
 * 
 * @route GET /leads/documento/:numeroDocumentoLead
 * @param {string} numeroDocumentoLead - Numero documento of the lead
 * @returns {object} Lead object
 * @example
 * curl -X GET \
  http://localhost:3000/leads/documento/1234567890 \
  -H 'Content-Type: application/json'
 */
router.get('/leads/documento/:numeroDocumentoLead', getLeadByNumeroDocumento)

/**
 * Create a new lead
 * 
 * @route POST /leads
 * @body {object} Lead object
 * @returns {object} Created lead object
 * @example
 * curl -X POST \
  http://localhost:3000/leads \
  -H 'Content-Type: application/json' \
  -d '{"name":"John Doe","email":"johndoe@example.com","phone":"1234567890",...}'
 */
router.post('/leads', postLead)

export default router;