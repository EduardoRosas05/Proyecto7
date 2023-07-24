import bcrypt from 'bcrypt';
import db from 'database/models';

export default function handler(req, res) {
  switch(req.method){
      case 'POST':
          return addClient(req, res);
      case 'GET':
          return listClient(req, res);

      default:
          res.status(400).json({error: true, message:'Petición errónea'});
  }
}

const addClient = async (req, res) =>  {
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

const listClient = async (req, res) => {
  try{
      //los datos vienen del req.body
      console.log(req.body);
      //guardar cliente
  const Clientss1 = await db.Users.findAll({
      include:['savinegs'],
  });
      
      return res.json(Clientss1)
  
  }catch(error){
      console.log(error);
      let errors = []

      if(error.errors){
          //extrae la info
          errors = error.errors.map((item) => ({
              error: item.message, 
              field: item.path,
          }));
      }

      return res.status(400).json({
          message: `Ocurrió un error al procesar la petición: ${error.message}`,
          errors,
      })
  }
}