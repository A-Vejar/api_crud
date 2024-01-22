import dbConfig from "../config/db.config";

interface Usuario {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  correo?: string;
  telefono?: number;
}

interface PostUsuario extends Omit<Usuario, 'id'> {
  created_by: string;
}

interface PatchUsuario extends Partial<Omit<Usuario, 'id'>> {
  id: number;
  updated_by: string;
}

interface DeleteUsuario extends Pick<Usuario, 'id'> {
  deleted_by: string;
}

export const getUsuario = async ({ id }: Pick<Usuario, 'id'>) => {
  return new Promise((resolve, reject) => {
    dbConfig.query('CALL API_CRUD_GetUsuario(?)', [id] ,(err, result) => {
      if (err) reject(err);
      resolve(result[0][0]);
    });
  });
};

export const getUsuarios = async () => {
  return new Promise((resolve, reject) => {
    dbConfig.query('CALL API_CRUD_GetUsuarios()', (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};

export const postUsuario = async ({ nombre, apellido_paterno, apellido_materno, fecha_nacimiento, correo, telefono, created_by }: PostUsuario) => {
  return new Promise((resolve, reject) => {
    dbConfig.query('CALL API_CRUD_PostUsuario(?, ?, ?, ?, ?, ?, ?)', [nombre, apellido_paterno, apellido_materno, fecha_nacimiento, correo, telefono, created_by], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const patchUsuario = async ({ id, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, correo, telefono, updated_by }: PatchUsuario) => {
  return new Promise((resolve, reject) => {
    dbConfig.query('CALL API_CRUD_PatchUsuario(?, ?, ?, ?, ?, ?, ?, ?)', [id, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, correo, telefono, updated_by] ,(err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const deleteUsuario = async ({ id, deleted_by }: DeleteUsuario) => {
  return new Promise((resolve, reject) => {
    dbConfig.query('CALL API_CRUD_DeleteUsuario(?, ?)', [id, deleted_by] ,(err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
