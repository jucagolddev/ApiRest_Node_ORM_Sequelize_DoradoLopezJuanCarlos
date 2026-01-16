import * as Base from "./base/logBaseController.js";

// Si quisiéramos sobrescribir un método, lo haríamos aquí:
// export const obtenerTodos = async (req, res) => { ... }

// Exportar todo lo del base por defecto
export const crear = Base.crear;
export const obtenerTodos = Base.obtenerTodos;
export const obtenerUno = Base.obtenerUno;
export const actualizar = Base.actualizar;
export const eliminar = Base.eliminar;
