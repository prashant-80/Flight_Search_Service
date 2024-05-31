const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const cityRepository = new CityRepository;

async function createCity(data){
    try{
        const city = await cityRepository.create(data);
        return city;
    } catch(error){
        if(error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TypeError' ) {
            throw new AppError('Cannot create a new Airplane object',StatusCodes.BAD_REQUEST);
        }            
        throw new AppError("cannot fulfil the request",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function DeleteCity(id){
    try{
       const response =  await cityRepository.destroy(id)
        return response

    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The City you requested to delete is not present', error.statusCode);
        }
        throw new AppError("Problem in deleting the City",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateCity(data,id){
    try{
        const response  = await cityRepository.update(data,id)
        return response
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('city is not found',error.statusCode)
        }
        throw new AppError('Not able to update a City',StatusCodes.INTERNAL_SERVER_ERROR)
    }

}






module.exports = {
 createCity,
 DeleteCity,
 updateCity
}
