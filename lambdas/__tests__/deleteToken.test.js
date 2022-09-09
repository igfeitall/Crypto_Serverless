const DynamoController = require('../../controllers/dynamoController')
const deleteToken = require('../deleteToken')

jest.mock('../../controllers/dynamoController')

function mockDynamo(){
  DynamoController.mockImplementation(() => {
    return {
      deleteById: () => true
    }
  })
}

test('getting an erro by passing a non existent tokenId', async () => {
  const event = {pathParameters: {id: "BTC"}}

  mockDynamo()

  await deleteToken.handler(event, null, (error, msg) => {
    expect(msg.statusCode).toBe(200)
    expect(JSON.parse(msg.body)).toEqual({
      tokenDeleted: event.pathParameters.id
    })

  })
})

test('getting an erro by passing an existent tokenId', async () => {
  const event = {pathParameters: {id: "BTC"}}

  DynamoController.mockImplementation(() => {
    return {
      deleteById: () => {
        throw new Error('token is not in database')
      }
    }
  })

  await deleteToken.handler(event, null, (error, msg) => {
    expect(msg.statusCode).toBeUndefined()
  })
})

test('getting an exeption by not passing an id', async () => {
  const event = {pathParameters: {}}

  mockDynamo()

  await deleteToken.handler(event, null, (error, msg) => {
    expect(msg.statusCode).toBe(400)
  })
})