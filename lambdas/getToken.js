const { response, formatData } = require('../utils/utils')
const { hasParam, arrayExist } = require('../utils/validation')
const { getById } = require('../controllers/dynamoController')

// get the history of a Token
async function getToken (event, context, callback) {
  console.log('get');
 
  try {

    hasParam(event, 'id')
    const tokenId = String(event.pathParameters.id)
    console.log(tokenId);
    
    // connection
    const tokenHistory = await getById(tokenId)

    arrayExist(tokenHistory.Items, tokenId)
    const formatedTokenHistory = tokenHistory.Items.map( token => formatData(token))
    callback(null, response(200, formatedTokenHistory))
  } catch (err) {
    
    console.error(err)
    callback(null, response(err.statusCode, err.message))
  }
}

module.exports.handler = getToken