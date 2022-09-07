function myError(message, statusCode){
  const error = new Error(message)
  error.message = message
  error.statusCode = statusCode

  return error
}

function hasBody(event){

  if(!event.body || event.body == {} || event.body == []){
    throw myError('Body not found.\nYou must pass an body for this function', 400)
  }
}

function hasObject(object, name){

  const tokens = object[name]

  if(!tokens || tokens == {} || tokens.length <= 0){
    throw myError(`Object not found. You must pass an ${name} object for this function`, 400)
  }
}

function hasToken(rates, token){

  const link = 'https://coinlayer.com/symbols'
  const rate = rates[token]

  if(!rate || rate == [] || rate == {} ){
    throw myError(`Token: ${token} invalid. All tokens must be valid, visit: ${link} to see all valid tokens`, 400)
  }
}

function hasParam(event, id){

  const param = event.pathParameters[id]

  if(!param || param == {} || param == []){
    throw myError(`ID invalid. You must pass and valid token for the id as a Parameter.`, 400)
  }
}

function arrayExist(array, tokenId){

  if(!array || array.length <= 0){
    throw myError(`TokenId: ${tokenId} not founded. try to pass an existent token.`, 400)
  }
}

module.exports = { hasBody, hasObject, hasToken, hasParam, arrayExist }