const { response } = require('../utils/utils')
const { hasParam } = require('../utils/validation')
const { deleteById } = require('../controllers/dynamoController')

// function to delete a token by id of the tracker
async function deleteToken (event, context, callback) {
  console.log('delete');

  try {
    
    hasParam(event, 'id')
    const tokenId = String(event.pathParameters.id)
    console.log(tokenId, typeof tokenId);
    
    // connection
    const deletedTokens = await deleteById(tokenId)
    callback(null, response(200, { tokenDeleted: tokenId}))
  } catch (err) {
    
    console.error(err)
    callback(null, response(err.statusCode, err.message))
  }
}

module.exports.handler = deleteToken