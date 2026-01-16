import Log from "../models/log.js";

export const crear = async (datos) => {
    return await Log.create(datos);
};

export const buscarTodos = async () => {
    return await Log.findAll();
};

export const buscarPorId = async (id) => {
    return await Log.findByPk(id);
};

export const actualizar = async (id, datos) => {
    const item = await Log.findByPk(id);
    if (!item) return null;
    await item.update(datos);
    return item;
};

export const eliminar = async (id) => {
    const item = await Log.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
};
