const { listAll } = require('../controllers/dynamoController')

function myError(message, statusCode){
  const error = new Error(message)
  error.statusCode = statusCode

  return error
}

function notExist(item){
  if(!item || item == {} || item == [] || item.length <= 0) return true
  else return false
}

class validation{
  
  hasBody(event){
  
    if(notExist(event.body)){
      throw myError('Body not found.\nYou must pass an body for this function', 400)
    }
  }
  
  hasObject(object, name){
  
    const tokens = object[name]
  
    if(notExist(tokens)){
      throw myError(`Object not found. You must pass an ${name} object for this function`, 400)
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
  
  tokenSaved(token){
  
    listAll().then( data => {
  
      const contains = data.Items.filter( item => item.tokenId === token).length > 0
      if(contains){
        throw myError(`Token: ${token} already is tracked. You need to inserd a new token to track.`, 400)
      }
    }).catch( err => {
      throw err
    })
  }
  
  arrayExist(array, tokenId){
  
    if(notExist(array)){
      throw myError(`TokenId: ${tokenId} not founded. try to pass an existent token.`, 400)
    }
  }
}


module.exports = new validation()