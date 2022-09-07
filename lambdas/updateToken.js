const { response, getUniqueTokens } = require('../utils/utils')
const { listAll, addItems } = require('../controllers/dynamoController')
const coinLayer = require('../controllers/coinLayerController')

async function updateToken (event, context, callback) {
  console.log('update');

  const { timestamp, rates } = await coinLayer.getLive()

  // validation
    
  // connection
  try {
    const dataAll = await listAll()
    const tokens = getUniqueTokens(dataAll)
    
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
    
    const tokensUpdated = addItems(tokensObj)
    callback(null, response({ updatedTokens: tokensUpdated }))
  } catch (err) {
    
    console.error(err)
    callback(null, response(err.statusCode, err))
  }
}

module.exports.handler = updateToken