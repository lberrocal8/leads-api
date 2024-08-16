import sql from 'mssql'

const dbSettings = {
  user: "mkdir-software",
  password: "-HLew31681",
  server: "server-mkdirsoftware.database.windows.net",
  database: "dbleads_app",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};