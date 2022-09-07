const { response, formatData } = require('../controllers/utils')
const { getById } = require('../controllers/dynamoController')

async function getToken (event, context, callback) {
  console.log('get');

  const tokenId = String(event.pathParameters.id)
  console.log(tokenId);

  // connection
  try {
    
    const tokenHistory = await getById(tokenId)
    const formatedTokenHistory = tokenHistory.Items.map( token => formatData(token))
    callback(null, response(200, formatedTokenHistory))
  } catch (err) {
    
    console.error(err)
    callback(null, response(err.statusCode, err))
  }
}

module.exports.handler = getToken