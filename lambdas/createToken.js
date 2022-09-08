const { response } = require('../utils/utils')
const validation = require('../utils/validation')
const dynamoDB = require('../controllers/dynamoController')
const coinLayer = require('../controllers/coinLayerController')

// add tokens in the tracker
async function createToken (event, context, callback) {
  console.log('create');

  try {

    validation.hasBody(event)
    const body  = JSON.parse(event.body)

    const tokens = validation.hasObject(body, 'tokens')
    console.log(tokens);

    await validation.tokenSaved(tokens)

    // get timestamp and an array of exchangeRate
    const { timestamp, rates } = await coinLayer.getLive()

    // mapping the tokens array to format they to put in Database
    const tokensObj = tokens.map( (token) => {
      

      console.log(token, 'post test');
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