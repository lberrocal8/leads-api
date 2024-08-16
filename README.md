
# API: Leads.app

Es un proyecto personal que busca implementar una API usando el framework Express de Node.Js.

## Caracteristicas

- Crear Leads
- Recuperar Leads
- Crear Jornadas
- Recuperar Jornadas
- Exportar Leads asociados a Jornada en archivo .xlsx


## Documentación

Algunos puntos a tener el cuenta al momento de realizar las peticiones a los endpoints de esta API:
- Antes de crear un Lead, se debe crear primero una Jornada, puesto que estos deben estar asociados a una Jornada específica.
- Todos los parametros de consulta distinguen entre mayusculas y minusculas.
- Antes de exportar los Leads asociados a una Jornada, asegurate de que esa Jornada tenga al menos una persona relacionada.
## Referencia de API

### Leads
#### Obtener todos los Leads
```http
  GET /leads
```

**Returns** - Objeto JSON con todos los Leads

#### Obtener Leads por número de documento
```http
  GET /leads/documento/${numeroDocumentoLead}
```

| Parametro            | Tipo     | Descripción        |
| :------------------- | :------- | :----------------- |
| `numeroDocumentoLead`| `string` | **Obligatorio**    |

**Returns** - Objeto JSON con Lead = numeroDocumentoLead

#### Crear nuevo Lead
```http
  POST /leads
```
| Parametro             | Tipo     | Descripción       |
| :-------------------- | :------- | :---------------- |
| `nombresLead`         | `string` | **Obligatorio**   |
| `apellidosLead`       | `string` | **Obligatorio**   |
| `telefonoLead`        | `string` | **Obligatorio**   |
| `correoLead`          | `string` | **Obligatorio**   |
| `tipoDocumentoLead`   | `string` | **Obligatorio**   |
| `numeroDocumentoLead` | `string` | **Obligatorio**   |
| `generoLead`          | `string` | **Obligatorio**   |
| `institucionLead`     | `string` | **Obligatorio**   |
| `programaLead`        | `string` | **Obligatorio**   |
| `codigoJornadaLead`   | `string` | **Obligatorio**   |

**Returns** - response.status(200).send('Ok')

### Jornadas
#### Obtener todas las Jornadas
```http
  GET /jornadas
```
**Returns** - Objeto JSON con todas las Jornadas

#### Obtener Jornadas por código
```http
  GET /jornadas/${codigoJornada}
```

| Parametro      | Tipo     | Descripción        |
| :------------- | :------- | :----------------- |
| `codigoJornada`| `string` | **Obligatorio**    |

**Returns** - Objeto JSON con Jornada = codigoJornada

#### Crear nueva Jornada
```http
  POST /jornadas
```
| Parametro                | Tipo     | Descripción        |
| :----------------------- | :------- | :----------------- |
| `codigoJornada`          | `string` | **Obligatorio**    |
| `nombreJornada`          | `string` | **Obligatorio**    |
| `directorJornada`        | `string` | **Obligatorio**    |
| `fechaEjecucionJornada`  | `string` | **Obligatorio**    |

**Returns** - response.status(200).send('Ok')

### Exportación de Leads por Jornada

```http
  GET /downloads/${codigoJornadaLead}
```
| Parametro                | Tipo     | Descripción        |
| :----------------------- | :------- | :----------------- |
| `codigoJornadaLead`      | `string` | **Obligatorio**    |

**Returns** - Archivo .xlsx con los Leads asociados a la Jornada = codigoJornadaLead


## Autores

- [@lberrocal8](https://github.com/lberrocal8)

