const { response, formatData } = require('../utils/utils')
const Validation = require('../utils/validation')
const DynamoDB = require('../controllers/dynamoController')

// get the history of a Token
async function getToken (event, context, callback) {
  console.log('get')
 
  const validation = new Validation()
  const dynamoDB = new DynamoDB()

  try {

    validation.hasParam(event, 'id')
    const tokenId = String(event.pathParameters.id)
    
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