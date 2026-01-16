# ApiRest Node.js + AutoCRUD (MVC Reducido)

Proyecto refactorizado para la asignatura de Desarrollo Backend. Incluye un generador automático de CRUD basado en modelos Sequelize con arquitectura MVC.

## Requisitos

- Node.js (v14 o superior)
- MySQL / MariaDB (XAMPP recomendado)

## Instalación

1.  Clonar repositorio o descargar archivos.
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Configurar base de datos en `config/db.js` (si es necesario cambiar usuario/contraseña).

## Estructura del Proyecto

```
/
├── autocrud.js         # Script generador de código
├── server.js           # Punto de entrada del servidor
├── models/             # Definición de modelos Sequelize
├── routes/             # Rutas Express (Generadas)
├── controllers/        # Controladores Personalizados (Generados/Editables)
│   └── base/           # Controladores Base Genéricos (Generados/No editar)
└── services/           # Lógica de acceso a datos (Generados)
```

## Uso de AutoCRUD

El script `autocrud.js` escanea la carpeta `models/` y crea automáticamente los archivos necesarios para exponer una API REST completa.

### Pasos para añadir una nueva tabla (Simulacro de Examen):

1.  Crear el archivo del modelo en `models/` (ej. `models/cliente.js`).

    ```javascript
    import { DataTypes } from "sequelize";
    import { sequelize } from "../config/db.js";

    const Cliente = sequelize.define("Cliente", {
      // Definición de campos...
    });

    export default Cliente;
    ```

2.  Ejecutar el AutoCRUD:
    ```bash
    node autocrud.js
    ```
3.  Iniciar el servidor:

    ```bash
    node server.js
    ```

    _El servidor sincronizará la BD y cargará las rutas automáticamente._

4.  Probar endpoints (ej. con Postman o Thunder Client):
    - `GET /cliente`
    - `POST /cliente`
    - `GET /cliente/:id`
    - `PUT /cliente/:id`
    - `DELETE /cliente/:id`

## Logs

El sistema incluye una tabla `logs` lista para usar.
