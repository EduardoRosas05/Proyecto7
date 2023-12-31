import db from 'database/models';

export default function handler(req, res) {
    switch(req.method){
        case 'POST':
            return addCategorys(req, res);
            
        case 'GET':
            return listCategorys(req, res);

        case 'DELETE':
            return deleteCategorys(req, res);

        case 'PUT':
            return updateCategorys(req,res);

        default:
            res.status(400).json({error: true, message:'Petición errónea'});
    }
  }

  
const addCategorys = async (req, res) => {
    try{
        //los datos vienen del req.body
        console.log(req.body);
        //guardar cliente
        const category = await db.Category.create({...req.body});

        res.json({
            category,
            message: 'La categoria fue agregado correctamente'
        })
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

const listCategorys = async (req, res) => {
    try{

      const {id} = req.query;

      if(id){
        const categor = await db.Category.findByPk(id);
        if(!categor){
          return res.status(404).json({error: true, message: 'No se encontro el id'});
        }
        return res.json(categor);
      } else {
        const categor = await db.Category.findAll();
        return res.json(categor);
      }

 /*      console.log("Listar");
        //los datos vienen del req.body
        /* console.log(req.body); 
        //guardar cliente
    const category = await db.Savings.findAll({  
       include:['client'], 

    });
        return res.json(category)
 */
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

const deleteCategorys = async (req,res) => {

    try{
      const {id} = req.query;
      
        const deletedRows = await db.Category.destroy({
            where: {
                id: id
            }
        })

        if (deletedRows === 0) {
            // Si no se eliminó ningún registro, significa que el ID no existe
            return res.status(404).json({ error: "No se encontró el ahorro" });
          }

        res.json({
            message: 'La categoria fue eliminada'
        })

      }
         catch (error){
            res.status(400).json({ error: "No puedes borrar esta categoria, tienes registos guardados"})
    }
}

const updateCategorys = async (req,res) => {

    try{

        let {id} = req.query;
        await db.Category.update({...req.body},
            {
            where :{
                id : id
            },

        })


        res.json({
            message: 'La categoria fue actualizada con exito'
        })

      }
         catch (error){
            res.status(400).json({ error: "error al momento de actualizar la categoria"})
    }
}
