const { response, getUniqueTokens } = require('../controllers/utils')
const { listAll } = require('../controllers/dynamoController')

async function listToken (event, context, callback) {
  console.log('list');

  // connection
  try {

    const dataAll = await listAll()
    const tokenList = getUniqueTokens(dataAll)

    callback(null, response(200, tokenList))
  } catch (err) {

    console.log(err)
    callback(null, response(err.statusCode, err))
  }
}

module.exports.handler = listToken