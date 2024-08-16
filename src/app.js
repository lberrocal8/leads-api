/**
 * Creates an Express.js application instance.
 *
 * This module sets up an Express.js application with CORS enabled and JSON parsing.
 * It also mounts three route handlers for leads, jornadas, and downloads.
 *
 */
import express from 'express'
/**
 * Import route handlers for leads, jornadas, and downloads.
 */
import leadsRoutes from './routes/leads.routes.js'
import jornadasRoutes from './routes/jornadas.routes.js'
import downloadsRoutes from './routes/downloads.routes.js'
/**
 * Import CORS middleware to enable cross-origin resource sharing.
 */
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json())
/**
 * Mount route handlers for leads, jornadas, and downloads.
 */
app.use(leadsRoutes)
app.use(jornadasRoutes)
app.use(downloadsRoutes)

export default app;