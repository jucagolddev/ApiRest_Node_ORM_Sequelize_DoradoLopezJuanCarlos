import Productos from "../models/productos.js";

export const crear = async (datos) => {
    return await Productos.create(datos);
};

export const buscarTodos = async () => {
    return await Productos.findAll();
};

export const buscarPorId = async (id) => {
    return await Productos.findByPk(id);
};

export const actualizar = async (id, datos) => {
    const item = await Productos.findByPk(id);
    if (!item) return null;
    await item.update(datos);
    return item;
};

export const eliminar = async (id) => {
    const item = await Productos.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
};
