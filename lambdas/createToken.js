const { response } = require('../utils/utils')
const { hasBody, hasObject, hasToken } = require('../utils/validation')
const { addItems } = require('../controllers/dynamoController')
const coinLayer = require('../controllers/coinLayerController')

// function to add tokens in the tracker
async function createToken (event, context, callback) {
  console.log('create');

  try {

    hasBody(event)
    const body  = JSON.parse(event.body)

    hasObject(body, 'tokens')
    const { tokens } = body

    // get timestamp and an array of exchangeRate
    const { timestamp, rates } = await coinLayer.getLive()

    // mapping the tokens array to format they to put in Database
    const tokensObj = tokens.map( (token) => {
      
      hasToken(rates, token)
      const exchangeRate = rates[token]

      const evolutionRate = 0
      return {tokenId: token, timestamp, exchangeRate, evolutionRate}
    })

    // connection
    await addItems(tokensObj)
    callback(null, response(201, tokensObj))
  } catch (err) {

    console.error(err)
    callback(null, response(err.statusCode, err))
  }
}

module.exports.handler = createToken