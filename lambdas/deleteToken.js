const { response } = require('../controllers/utils')
const { deleteById } = require('../controllers/dynamoController')

async function deleteToken (event, context, callback) {
  console.log('delete');

  const tokenId = String(event.pathParameters.id)
  console.log(tokenId);

  // validation

  // connection
  try {
    
    await deleteById(tokenId)
    callback(null, response(200, { tokenDeleted: tokenId}))
  } catch (err) {
    
    console.error(err)
    callback(null, response(err.statusCode, err))
  }
}

module.exports.handler = deleteToken