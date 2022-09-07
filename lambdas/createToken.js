const { response } = require('../controllers/utils')
const { addItems } = require('../controllers/dynamoController')
const { hasBody } = require('../controllers/validation')
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

    const tokensObj = tokens.map( (token) => {
      
      hasToken(rates, token)
      const exchangeRate = rates[token]

      const evolutionRate = 0
      return {tokenId: token, timestamp, exchangeRate, evolutionRate}
    })

    await addItems(tokensObj)
    callback(null, response(201, tokensObj))
  } catch (err) {

    console.error(err)
    callback(null, response(err.statusCode, err))
  }
}

module.exports.handler = createToken