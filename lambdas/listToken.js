const { response, getUniqueTokens } = require('../utils/utils')
const DynamoDB = require('../controllers/dynamoController')

// list all tokens information, using only the most recent information
async function listToken (event, context, callback) {
  console.log('list')

  const dynamoDB = new DynamoDB()

  try {
    
    // connection
    const dataAll = await dynamoDB.listAll()

    // get an array of tokens by the recency of timestamp, that is a sort key
    const tokenList = getUniqueTokens(dataAll)

    callback(null, response(200, tokenList))
  } catch (err) {

    console.log(err)
    callback(null, response(err.statusCode, err.message))
  }
}

module.exports.handler = listToken