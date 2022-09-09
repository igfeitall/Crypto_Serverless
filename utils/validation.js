const dynamoDB = require('../controllers/dynamoController')

function myError(message, statusCode){
  const error = new Error(message)
  error.statusCode = statusCode

  return error
}

function notExist(item){
  if(!item || item == {} || item == [] || item.length <= 0) return true
  else return false
}

class Validation{
  
  hasBody(event){
  
    if(notExist(event.body)){
      throw myError('Body not found. You must pass an body for this function', 400)
    }
  }
  
  hasObject(object){
  
    const tokens = object.tokens
  
    if(notExist(tokens)){
      throw myError(`Object not found. You must pass an token array. like tokens: ["BTC, "ETH"]`, 400)
    }
  
    return tokens
  }
  
  hasToken(rates, token){
  
    const link = 'https://coinlayer.com/symbols'
  
    if(notExist(rates[token])){
      throw myError(`Token: ${token} invalid. All tokens must be valid, visit: ${link} to see all valid tokens`, 400)
    }
  }
  
  hasParam(event, id){
  
    if(notExist(event.pathParameters[id])){
      throw myError(`ID invalid. You must pass and valid token for the id as a Parameter.`, 400)
    }
  }
  
  arrayExist(array, tokenId){

    if(!Array.isArray(array)){
      throw myError(`Something got Wrong in Database. Try again later.`, 500)
    }
  
    if(notExist(array)){
      throw myError(`TokenId: ${tokenId} not founded. try to pass an existent token.`, 400)
    }
  }

  async tokenSaved(tokens){

    const data = await dynamoDB.listAll()
    const contains = data.Items.filter( item => tokens.includes(item.tokenId)).length > 0

    if(contains){
      throw myError(`Token: ${tokens} already is tracked. You need to insert a new token to track.`, 400)
    }
  }
  
}


module.exports = Validation