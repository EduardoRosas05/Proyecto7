import bcrypt from 'bcrypt';
import db from 'database/models';


export default async function handler(req, res) {
  try {
    // validar que venga la contraseña
    if (!req.body.password) {
      return res.status(400).json({ message: 'La contraseña es obligatoria.'});
    }

    const datosUsuario = {...req.body};

    // asegurar la contraseña
    // usar bcrypt
    // salt: generacion de una cadena aleatoria de N longitud
    const salt = await bcrypt.genSalt(10);

    // cifrar la contraseña y meterla en los datos del usuario
    datosUsuario.password = await bcrypt.hash(datosUsuario.password, salt);

    // registrar el usuario
    const user = await db.Users.create(datosUsuario);

    user.password = null; // evitar enviarlo en la respuesta

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