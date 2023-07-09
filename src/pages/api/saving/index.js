import db from 'database/models';

export default function handler(req, res) {
    switch(req.method){
        case 'POST':
            return addSavings(req, res);
            
        case 'GET':
            return listSavings(req, res);

        case 'PUT':
            return updateSavings(req,res);

        case 'DELETE':
            return deleteSavings(req, res);

        default:
            res.status(400).json({error: true, message:'Petición errónea'});
    }
  }

  
const addSavings = async (req, res) => {
    try{
        //los datos vienen del req.body
        console.log(req.body);
        //guardar cliente
        const category = await db.Savings.create({...req.body});

        res.json({
            category,
            message: 'El ahorro fue agregado correctamente'
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

const listSavings = async (req, res) => {
    try{
        //los datos vienen del req.body
        console.log(req.body);
        //guardar cliente
    const category = await db.Savings.findAll({  
    });
        return res.json(category)

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

const deleteSavings = async (req,res) => {

    try{
      const {id} = req.query;
      
        await db.Savings.destroy({
            where: {
                id: id
            }
        })

        res.json({
            message: 'El ahorro fue eliminada'
        })

      }
         catch (error){
            res.status(400).json({ error: "error al momento de borrar el ahorro"})
    }
}

const updateSavings = async (req,res) => {

    try{

        let {id} = req.query;
        await db.Savings.update({...req.body},
            {
            where :{
                id : id
            },

        })

        res.json({
            message: 'El ahorro fue actualizada con exito'
        })

      }
         catch (error){
            res.status(400).json({ error: "error al momento de actualizar el ahorro"})
    }
}