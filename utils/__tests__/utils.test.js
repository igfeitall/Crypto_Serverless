const { formatData } = require('../utils')

test('testing data Formating', () => {
  const item = {
    tokenId: 'BTC',
    timestamp: 1529571067,  
    exchangeRate: 15436.4,
    evolutionRate: 0.056
  }


  expect(formatData(item)).toEqual({
    tokenId: 'BTC', 
    timestamp: '6/21/2018, 5:51:07 AM',
    exchangeRate: 15436.4,
    evolutionRate: '5.60%'
  })
})
