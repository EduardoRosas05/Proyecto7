import db from 'database/models';

export default function handler(req, res) {
    switch(req.method){
        case 'POST':
            return addIncomes(req, res);
        case 'GET':
            return listIncomes(req, res);

        case 'DELETE':
            return deleteIncomes(req, res);

        case 'PUT':
            return updateIncomes(req,res);

        default:
            res.status(400).json({error: true, message:'Petición errónea'});
    }
  }

  
const addIncomes = async (req, res) => {
    try{
        //los datos vienen del req.body
        console.log(req.body);
        //guardar cliente
        const customer = await db.Income.create({...req.body});

        res.json({
            customer,
            message: 'El ingreso fue agregado correctamente'
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
