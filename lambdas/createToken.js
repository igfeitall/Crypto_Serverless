const { response } = require('../utils/utils')
const Validation = require('../utils/validation')
const DynamoDB = require('../controllers/dynamoController')
const CoinLayer = require('../controllers/coinLayerController')

// add tokens in the tracker
async function createToken (event, context, callback) {
  console.log('create')

  const validation = new Validation()
  const dynamoDB = new DynamoDB()
  const coinLayer = new CoinLayer()

  try {

    validation.hasBody(event)
    const body  = JSON.parse(event.body)

    const tokens = validation.hasObject(body, 'tokens')

    await validation.tokenSaved(tokens)

    // get timestamp and an array of exchangeRate
    const { timestamp, rates } = await coinLayer.getLive()

    // mapping the tokens array to format they to put in Database
    const tokensObj = tokens.map( (token) => {
      
      validation.hasToken(rates, token)
      const exchangeRate = rates[token]

      const evolutionRate = 0
      return {tokenId: token, timestamp, exchangeRate, evolutionRate}
    })

    // connection
    await dynamoDB.addItems(tokensObj)
    callback(null, response(201, tokensObj))
  } catch (err) {

    console.error(err)
    callback(null, response(err.statusCode, err.message))
  }
}

module.exports.handler = createToken