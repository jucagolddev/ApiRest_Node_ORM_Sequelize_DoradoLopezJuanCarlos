import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configuración de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelsPath = path.join(__dirname, "models");
const controllersPath = path.join(__dirname, "controllers");
const baseControllersPath = path.join(controllersPath, "base");
const servicesPath = path.join(__dirname, "services");
const routesPath = path.join(__dirname, "routes");

// Crear directorios si no existen
const dirs = [controllersPath, baseControllersPath, servicesPath, routesPath];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Directorio creado: ${dir}`);
    }
});

// Filtrar modelos
const models = fs.readdirSync(modelsPath).filter(f => f.endsWith(".js") && f !== "init-models.js");

console.log(`🔍 Modelos encontrados: ${models.join(", ")}`);

for (const modelFile of models) {
    const modelName = path.basename(modelFile, ".js"); // ejemplo: productos, log
    // Convención: Nombre de Clase en PascalCase (Producto, Log)
    // Pero modelName suele ser el nombre del archivo.
    // Asumimos que el archivo se llama 'productos.js' -> 'Productos'? O 'Producto'?
    // En el archivo productos.js exportamos 'Producto' (Singular).
    // Vamos a intentar inferir nombres.

    // Para importaciones:
    const modelImportPath = `../../models/${modelFile}`;

    // Nombres variables
    const NamePascal = modelName.charAt(0).toUpperCase() + modelName.slice(1); // Productos
    const nameCamel = modelName.charAt(0).toLowerCase() + modelName.slice(1); // productos
    const ServiceName = `${NamePascal}Service`;
    const BaseControllerName = `${NamePascal}BaseController`;
    const ControllerName = `${NamePascal}Controller`;

    // ---------------------------------------------------------
    // 1. SERVICE (Servicios)
    // ---------------------------------------------------------
    // Lógica de acceso a datos pura.
    const serviceContent = `import ${NamePascal} from "../models/${modelFile}";

export const crear = async (datos) => {
    return await ${NamePascal}.create(datos);
};

export const buscarTodos = async () => {
    return await ${NamePascal}.findAll();
};

export const buscarPorId = async (id) => {
    return await ${NamePascal}.findByPk(id);
};

export const actualizar = async (id, datos) => {
    const item = await ${NamePascal}.findByPk(id);
    if (!item) return null;
    await item.update(datos);
    return item;
};

export const eliminar = async (id) => {
    const item = await ${NamePascal}.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
};
`;
    // Siempre sobrescribimos services (autogenerados)
    fs.writeFileSync(path.join(servicesPath, `${modelName}Service.js`), serviceContent);

    // ---------------------------------------------------------
    // 2. BASE CONTROLLER (Controladores Base)
    // ---------------------------------------------------------
    // Usa el servicio.
    const baseControllerContent = `import * as ${ServiceName} from "../../services/${modelName}Service.js";

export const crear = async (req, res) => {
    try {
        const nuevo = await ${ServiceName}.crear(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear", error });
    }
};

export const obtenerTodos = async (req, res) => {
    try {
        const lista = await ${ServiceName}.buscarTodos();
        res.json(lista);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener lista", error });
    }
};

export const obtenerUno = async (req, res) => {
    try {
        const item = await ${ServiceName}.buscarPorId(req.params.id);
        if (!item) return res.status(404).json({ mensaje: "No encontrado" });
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener detalle", error });
    }
};

export const actualizar = async (req, res) => {
    try {
        const item = await ${ServiceName}.actualizar(req.params.id, req.body);
        if (!item) return res.status(404).json({ mensaje: "No encontrado" });
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar", error });
    }
};

export const eliminar = async (req, res) => {
    try {
        const borrado = await ${ServiceName}.eliminar(req.params.id);
        if (!borrado) return res.status(404).json({ mensaje: "No encontrado" });
        res.json({ mensaje: "Eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar", error });
    }
};
`;
    // Siempre sobrescribimos base controllers
    fs.writeFileSync(path.join(baseControllersPath, `${modelName}BaseController.js`), baseControllerContent);

    // ---------------------------------------------------------
    // 3. CONTROLLER (Controlador Final)
    // ---------------------------------------------------------
    // Extiende/Usa el Base. SOLO se crea si no existe.
    const controllerFilePath = path.join(controllersPath, `${modelName}Controller.js`);
    if (!fs.existsSync(controllerFilePath)) {
        const controllerContent = `import * as Base from "./base/${modelName}BaseController.js";

// Si quisiéramos sobrescribir un método, lo haríamos aquí:
// export const obtenerTodos = async (req, res) => { ... }

// Exportar todo lo del base por defecto
export const crear = Base.crear;
export const obtenerTodos = Base.obtenerTodos;
export const obtenerUno = Base.obtenerUno;
export const actualizar = Base.actualizar;
export const eliminar = Base.eliminar;
`;
        fs.writeFileSync(controllerFilePath, controllerContent);
        console.log(`✨ Controlador creado: ${modelName}Controller.js`);
    } else {
        console.log(`⏩ Controlador existente (omitido): ${modelName}Controller.js`);
    }

    // ---------------------------------------------------------
    // 4. ROUTE (Rutas)
    // ---------------------------------------------------------
    // Mapea al Controlador Final.
    const routeContent = `import express from "express";
import {
    crear,
    obtenerTodos,
    obtenerUno,
    actualizar,
    eliminar
} from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", obtenerTodos);
router.get("/:id", obtenerUno);
router.post("/", crear);
router.put("/:id", actualizar);
router.delete("/:id", eliminar);

export default router;
`;
    // Sobrescribimos rutas para asegurar que apunten a métodos válidos
    fs.writeFileSync(path.join(routesPath, `${modelName}Routes.js`), routeContent);

    console.log(`✅ CRUD completado para: ${modelName}`);
}

console.log("🏁 Proceso AutoCRUD finalizado con éxito.");
