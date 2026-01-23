import * as ClienteService from "./services/clienteService.js";
import { sequelize } from "./config/db.js";

const seed = async () => {
    try {
        console.log("Iniciando inserción de clientes...");

        const cliente1 = await ClienteService.crear({
            nombre: "Juan",
            apellido: "Pérez",
            email: "juan.perez@example.com",
            telefono: "123456789"
        });
        console.log("Cliente 1 creado:", cliente1.nombre);

        const cliente2 = await ClienteService.crear({
            nombre: "Maria",
            apellido: "García",
            email: "maria.garcia@example.com",
            telefono: "987654321"
        });
        console.log("Cliente 2 creado:", cliente2.nombre);

        console.log("Inserción finalizada con éxito.");
        process.exit(0);
    } catch (error) {
        console.error("Error al insertar clientes:", error);
        process.exit(1);
    }
};

seed();
