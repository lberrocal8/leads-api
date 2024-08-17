import sql from 'mssql'

const dbSettings = {
  user: "{yourUsername}",
  password: "{yourPassword}",
  server: "{yourServer}",
  database: "{yourDatabase}",
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
