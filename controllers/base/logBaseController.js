import * as LogService from "../../services/logService.js";

export const crear = async (req, res) => {
    try {
        const nuevo = await LogService.crear(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear", error });
    }
};

export const obtenerTodos = async (req, res) => {
    try {
        const lista = await LogService.buscarTodos();
        res.json(lista);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener lista", error });
    }
};

export const obtenerUno = async (req, res) => {
    try {
        const item = await LogService.buscarPorId(req.params.id);
        if (!item) return res.status(404).json({ mensaje: "No encontrado" });
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener detalle", error });
    }
};

export const actualizar = async (req, res) => {
    try {
        const item = await LogService.actualizar(req.params.id, req.body);
        if (!item) return res.status(404).json({ mensaje: "No encontrado" });
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar", error });
    }
};

export const eliminar = async (req, res) => {
    try {
        const borrado = await LogService.eliminar(req.params.id);
        if (!borrado) return res.status(404).json({ mensaje: "No encontrado" });
        res.json({ mensaje: "Eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar", error });
    }
};
