const { response, getUniqueTokens } = require('../utils/utils')
const DynamoDB = require('../controllers/dynamoController')
const CoinLayer = require('../controllers/coinLayerController')

// function used by event bridge
// update the database, adding a recent version of the tokens and updating the evolution rate
async function updateToken (event, context, callback) {
  console.log('update');

  const dynamoDB = new DynamoDB()
  const coinLayer = new CoinLayer()
  
  try {
    // get timestamp and an array of exchangeRate
    const { timestamp, rates } = await coinLayer.getLive()
    
    // connection
    const dataAll = await dynamoDB.listAll()

    // get an array of tokens by the recency of timestamp, that is a sort key
    const tokens = getUniqueTokens(dataAll)
    
    // mapping the token array to create an updated version
    const tokensObj = tokens.map( (token) => {

      const exchangeRate = rates[token.tokenId]
      const oldExchangeRate = token.exchangeRate

      // treating values 0
      let evolutionRate = exchangeRate >= oldExchangeRate? 1. : -1.

      if(!oldExchangeRate && !exchangeRate){
        evolutionRate = 0.
      }
      if(oldExchangeRate){
        evolutionRate = (exchangeRate-oldExchangeRate)/oldExchangeRate
      }

      return {tokenId: token.tokenId, timestamp, exchangeRate, evolutionRate}
    })
    
    await dynamoDB.addItems(tokensObj)
    callback(null, response(200, { updatedTokens: tokensObj }))
  } catch (err) {
    
    console.error(err)
    callback(null, response(err.statusCode, err))
  }
}

module.exports.handler = updateToken