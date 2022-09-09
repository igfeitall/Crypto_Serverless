const DynamoController = require('../../controllers/dynamoController')
const CoinLayerController = require('../../controllers/coinLayerController')
const updateToken = require('../updateToken')

jest.mock('../../controllers/coinLayerController')
jest.mock('../../controllers/dynamoController')

function mockCoinLayer() {
  CoinLayerController.mockImplementation(() => {
    return {
      getLive: () => {
        return {
          timestamp: 1529571067,
          rates: {
            "BTC": 57,
          }
        }
      }
    }
  })
}

function mockDynamo(){
  DynamoController.mockImplementation(() => {
    return {
      listAll: async () => {
        return {
          Items: [
            {
              tokenId: 'BTC',
              evolutionRate: 0,
              timestamp: 1529571067,
              exchangeRate: 50
            },
            {
              tokenId: 'BTC',
              evolutionRate: 0,
              timestamp: 1529571500,
              exchangeRate: 50
            }
          ]
        }
      },
      addItems: async () => true
    }
  })
}

test('testing the update response', async () => {

  mockCoinLayer()
  mockDynamo()

  await updateToken.handler(null, null, (err, msg) => { 
    expect(msg.statusCode).toBe(200)
    expect(JSON.parse(msg.body)).toEqual({
      updatedTokens: [
        {
          tokenId: 'BTC',
          timestamp: expect.any(Number),
          exchangeRate: expect.any(Number),
          evolutionRate: expect.any(Number)
        }
      ]
    })
  })
})