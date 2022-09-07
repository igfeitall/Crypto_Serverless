const { response } = require('../controllers/utils')

async function createToken (event, context, callback) {
  console.log('create');

  const { tokens } = JSON.parse(event.body)
  const {timestamp, rates} = await coinLayer.getLive()
  
  // validation

  const tokensObj = tokens.map( (token) => {
    
    const exchangeRate = rates[token]
    const evolutionRate = 0
    return {tokenId: token, timestamp, exchangeRate, evolutionRate}
  })
  
  // connection
  return addItems(tokensObj)
  .then((data) => {
    callback(null, response(201, data))
  }).catch((err) => {
    console.error(err)
    callback(null, response(err.statusCode, err))
  })  
}

module.exports.handler = createToken