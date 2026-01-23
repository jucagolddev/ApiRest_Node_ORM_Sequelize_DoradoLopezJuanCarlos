import Cliente from "../models/cliente.js";

export const crear = async (datos) => {
    return await Cliente.create(datos);
};

export const buscarTodos = async () => {
    return await Cliente.findAll();
};

export const buscarPorId = async (id) => {
    return await Cliente.findByPk(id);
};

export const actualizar = async (id, datos) => {
    const item = await Cliente.findByPk(id);
    if (!item) return null;
    await item.update(datos);
    return item;
};

export const eliminar = async (id) => {
    const item = await Cliente.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
};
