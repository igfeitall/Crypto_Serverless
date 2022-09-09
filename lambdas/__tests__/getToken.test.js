const DynamoController = require('../../controllers/dynamoController')
const getToken = require('../getToken')

jest.mock('../../controllers/dynamoController')

function mockDynamo(){
  DynamoController.mockImplementation(() => {
    return {
      getById: async () => {
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

test('geting a history of a token', async () => {
  const event = {pathParameters: {id: "BTC"}}

  mockDynamo()

  await getToken.handler(event, null, (error, msg) => {
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

test('getting an erro by passing a non existent tokenId', async () => {
  const event = {pathParameters: {id: "BTC"}}

  DynamoController.mockImplementation(() => {
    return {
      getById: () => {
        return {
          Items:[
            {
              tokenId: 'ETH'
            }
          ]
        }
      }
    }
  })

  expect(async () => await getToken.handler(event, null, (error, msg) => null)).rejects.toThrow()

})

test('getting an exeption by not passing an id', async () => {
  const event = {pathParameters: {}}

  mockDynamo()

  expect(async () => await getToken.handler(event, null, (error, msg) => null)).rejects.toThrow()

})