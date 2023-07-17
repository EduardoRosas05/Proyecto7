import bcrypt from 'bcrypt';
import db from 'database/models';


export default async function handler(req, res) {
  try {
    // validar que venga la contraseña
    if (!req.body.password) {
      return res.status(400).json({ message: 'La contraseña es obligatoria.'});
    }

    const datosUsuario = {...req.body};

    const salt = await bcrypt.genSalt(10);

    datosUsuario.password = await bcrypt.hash(datosUsuario.password, salt);

    const user = await db.Users.create(datosUsuario);

    user.password = null; 

    res.json({ message: 'El usuario ha sido registrado.', user});
  } catch (error) {
    console.log(error);
  
    let errors = [];
    if (error.errors) {
      errors = error.errors.map( errorItem => ({ 
        campo: errorItem.path,
        error: errorItem.message,
      }));
    }

    res.json({ error: true, message: 'Error al registrar el usuario', errors });
  }
};