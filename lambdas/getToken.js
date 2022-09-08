const { response, formatData } = require('../utils/utils')
const validation = require('../utils/validation')
const dynamoDB = require('../controllers/dynamoController')

// get the history of a Token
async function getToken (event, context, callback) {
  console.log('get');
 
  try {

    validation.hasParam(event, 'id')
    const tokenId = String(event.pathParameters.id)
    console.log(tokenId);
    
    // connection
    const tokenHistory = await dynamoDB.getById(tokenId)

    validation.arrayExist(tokenHistory.Items, tokenId)
    const formatedTokenHistory = tokenHistory.Items.map( token => formatData(token))
    callback(null, response(200, formatedTokenHistory))
  } catch (err) {
    
    console.error(err)
    callback(null, response(err.statusCode, err.message))
  }
}

module.exports.handler = getToken