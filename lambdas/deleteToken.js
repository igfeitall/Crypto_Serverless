const { response } = require('../utils/utils')
const DynamoDB = require('../controllers/dynamoController')
const Validation = require('../utils/validation')

// function to delete a token by id of the tracker
async function deleteToken (event, context, callback) {
  console.log('delete')

  const validation = new Validation()
  const dynamoDB = new DynamoDB()
  
  try {

    validation.hasParam(event, 'id')
    const tokenId = String(event.pathParameters.id)

    
    // connection
    await dynamoDB.deleteById(tokenId)
    callback(null, response(200, { tokenDeleted: tokenId}))
  } catch (err) {
    
    callback(null, response(err.statusCode, err.message))
  }
}

module.exports.handler = deleteToken