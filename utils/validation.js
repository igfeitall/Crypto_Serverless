function myError(message, statusCode){
  const error = new Error(message)
  error.statusCode = statusCode

  return error
}

function hasBody(event){

  if(!event.body || event.body === {} || event.body === []){
    throw myError('Body not found.\nYou must pass an body for this function', 400)
  }
}

function hasObject(object, name){

  if(!object[name] || object[name] === {} || object[name] === []){
    throw myError(`Object not found.\nYou must pass an ${name} object for this function`, 400)
  }
}

function hasToken(rates, token){

  const link = 'https://coinlayer.com/symbols'

  if(!rates[token]){
    throw myError(`Token: ${token} invalid.\nAll tokens must be valid, visit: ${link} to see all valid tokens`, 400)
  }
}

function hasParam(event, id){
  const param = event.pathParameters[id]

  if(!param || param === {} || param === []){
    throw myError(`ID: ${param} invalid.\nYou must pass and valid token for the id as a Parameter.`, 400)
  }
}

module.exports = { hasBody, hasObject, hasToken, hasParam }