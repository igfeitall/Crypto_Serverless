const DynamoController = require('../../controllers/dynamoController')
const listToken = require('../listToken')

jest.mock('../../controllers/dynamoController')

function mockDynamo(){
  DynamoController.mockImplementation(() => {
    return {
      listAll: async () => {
        return {
          Items: [
            {
              tokenId: 'BTC',
              evolutionRate: 0.05,
              timestamp: 1529571067,
              exchangeRate: 50
            }
          ]
        }
      }
    }
  })
}

test('testing the list response', async () => {

  mockDynamo()

  await listToken.handler(null, null, (err, msg) => { 
    expect(msg.statusCode).toBe(200)
    expect(JSON.parse(msg.body)).toEqual([
      {
        tokenId: 'BTC',
        evolutionRate: expect.any(String),
        timestamp: expect.any(String),
        exchangeRate: expect.any(Number)
      }
    ])
  })
})