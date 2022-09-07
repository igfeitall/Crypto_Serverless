function chunks(inputArray, perChunk) {
  return inputArray.reduce((all,one,i) => {
    const ch = Math.floor(i/perChunk); 
    all[ch] = [].concat((all[ch]||[]),one); 
    return all
 }, [])
}

// return the data given by the dynamoDB to a formated Object
function formatData(item){
  
  const miliseconds = item.timestamp * 1000
  const date = new Date(miliseconds).toLocaleString("en-US")

  const objFormated = { tokenId: item.tokenId, 
                        timestamp: date,
                        exchangeRate: item.exchangeRate,
                        evolutionRate: item.evolutionRate}
  
  return objFormated
}

// Create a response
function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

// return an array of the updated version of each token
function getUniqueTokens(data){

  const uniqueTokens = []
  for (let i = data.Items.length-1; i>=0; i--){
    const objToken = formatData(data.Items[i])
    addUnique(uniqueTokens, objToken)
  }

  return uniqueTokens
}

function addUnique(array, newItem){
  let contains = array.filter( item => item.tokenId === newItem.tokenId).length > 0

  if(!contains){
    array.push(newItem)
  }
}

module.exports = {chunks, getUniqueTokens, formatData, response}