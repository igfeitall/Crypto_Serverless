const DynamoController = require('../../controllers/dynamoController')
const Validation = require('../../utils/validation')
const CoinLayerController = require('../../controllers/coinLayerController')
const createToken = require('../createToken')

jest.mock('../../controllers/dynamoController')
jest.mock('../../controllers/coinLayerController')
jest.mock('../../utils/validation')


function mockCoinLayer() {
  CoinLayerController.mockImplementation(() => {
    return {
      getLive: () => {
        return {
          timestamp: 1529571067,
          rates: {
            "611": 0.389165,
            "ABC": 59.99,
            "ACP": 0.014931,
            "ACT": 0.15927,
            "ACT*": 0.14371,
            "ADA": 0.160502,
            "ADCN": 0.001406,
            "ADL": 121.5,
            "BTC": 15000,
            "ETH": 1530
          }
        }
      }
    }
  })
}

function mockValidation()  {
  Validation.mockImplementation(() => {
    return {
      hasBody: () => true,
      hasObject: () => ["BTC", "ETH", "ADL"],
      hasToken: () => true,
      tokenSaved: async () => true
    }
  })
}

function mockDynamo() {
  DynamoController.mockImplementation(() => {
    return {
      addItems: async (Items) => true
    }
  })
}

test('adding an array of tokens', async () => {
  const event = {body: JSON.stringify({tokens: ["BTC", "ETH", "ADL"]})}

  mockCoinLayer()
  mockValidation()
  mockDynamo()

  await createToken.handler(event, null, (err, msg) => {
    expect(msg.statusCode).toBe(201)
    expect(JSON.parse(msg.body)).toEqual([
      {
        tokenId: 'BTC',
        timestamp: expect.any(Number),
        exchangeRate: expect.any(Number),
        evolutionRate: 0
      },
      {
        tokenId: 'ETH',
        timestamp: expect.any(Number),
        exchangeRate: expect.any(Number),
        evolutionRate: 0
      },
      {
        tokenId: 'ADL',
        timestamp: expect.any(Number),
        exchangeRate: expect.any(Number),
        evolutionRate: 0
      }
    ])

  })
})