/**
 * Starts the server and connects to the database.
 * 
 * This script initializes the server and call to getConnection() function for establishes a connection to the database.
 *
 */

import app from './app.js'
import { getConnection } from './database/connection.js';
const port = 5000;

getConnection()

// STARTS THE SERVER ON PORT 5000
app.listen(5000, () => {
  console.log(`Servidor: http://localhost:${port}`);
});
