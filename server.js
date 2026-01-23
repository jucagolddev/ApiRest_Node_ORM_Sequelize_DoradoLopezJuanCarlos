import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// --- Carga Dinámica de Modelos ---
const modelsPath = path.join(__dirname, "models");
const cargarModelos = async () => {
  if (fs.existsSync(modelsPath)) {
    const files = fs.readdirSync(modelsPath).filter(file => file.endsWith(".js") && file !== "init-models.js");
    for (const file of files) {
      try {
        await import(`file://${path.join(modelsPath, file)}`);
        console.log(`Modelo cargado: ${file}`);
      } catch (error) {
        console.error(`Error al cargar modelo ${file}:`, error);
      }
    }
  }
};

// --- Carga Dinámica de Rutas ---
const routesPath = path.join(__dirname, "routes");

const cargarRutas = async () => {
  if (fs.existsSync(routesPath)) {
    const files = fs.readdirSync(routesPath).filter(file => file.endsWith("Routes.js"));
    for (const file of files) {
      try {
        const routeModule = await import(`file://${path.join(routesPath, file)}`);
        // Extraer nombre base: "productosRoutes.js" -> "productos"
        const routeName = file.replace("Routes.js", "").toLowerCase();
        app.use(`/${routeName}`, routeModule.default);
        console.log(`Ruta cargada: /${routeName}`);
      } catch (error) {
        console.error(`Error al cargar ruta ${file}:`, error);
      }
    }
  }
};

// Sincronizar base de datos y levantar servidor
(async () => {
  try {
    // Cargar modelos antes de sincronizar
    await cargarModelos();

    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas.");

    // Cargar rutas antes de escuchar
    await cargarRutas();

    const PORT = 3000;
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
})();
