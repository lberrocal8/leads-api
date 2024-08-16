CREATE TABLE Leads (
	leadId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	nombresLead VARCHAR(255) NOT NULL,
	apellidosLead VARCHAR(255) NOT NULL,
	telefonoLead VARCHAR(50) NOT NULL,
	correoLead VARCHAR(255) NOT NULL,
	tipoDocumentoLead VARCHAR(100) NOT NULL,
	numeroDocumentoLead VARCHAR(15) NOT NULL,
	generoLead VARCHAR(50) NOT NULL,
	institucionLead VARCHAR(255) NOT NULL,
	programaLead VARCHAR(255) NOT NULL,
	codigoJornadaLead VARCHAR(100) NOT NULL
);

ALTER TABLE [dbo].[Leads] ADD FOREIGN KEY (codigoJornadaLead) REFERENCES [dbo].[Jornadas](codigoJornada);