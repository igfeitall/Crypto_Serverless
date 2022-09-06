const axios = require('axios')
const link = "http://api.coinlayer.com/"

class coinLayer{

  // fazer tratamento de erros
  async getLive(){
    const func = "live?access_key="
    const fullUrl = link+func+process.env.COINLAYER_KEY

    try {
      const response = await axios.get(fullUrl)

      const data = response.data
      return {timestamp: data.timestamp, rates: data.rates}

    } catch (error) {
      console.error(error)
    }
  }
  
}

module.exports = new coinLayer()