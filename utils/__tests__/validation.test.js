const Validation = require('../validation')
const DynamoController = require('../../controllers/dynamoController')

const validation = new Validation()

test('event must contain an body not empty', () => {
  const event = {test: 'test'}
  const eventEmptyBody = {body: []}
  const eventWithBody = {body: {token: ['BTC']}}

  expect(() => validation.hasBody(event)).toThrow()
  expect(() => validation.hasBody(eventEmptyBody)).toThrow()
  expect(() => validation.hasBody(eventWithBody)).not.toThrow()
})

test('get a tokens array should not throw', () => {
  const objectName = 'tokens'
  const body = {test: 'test'}
  const bodyEmptyToken = {tokens: []}
  const bodyWithToken = {tokens: ['BTC']}

  expect(() => validation.hasObject(body, objectName)).toThrow()
  expect(() => validation.hasObject(bodyEmptyToken, objectName)).toThrow()
  expect(() => validation.hasObject(bodyWithToken, objectName)).not.toThrow()
})

test('token passed should be in the token list', () => {
  const rates = {BTC: 1000, ETH: 50, DOGE: 1}
  const token1 = 'tokens'
  const token2 = 'btc'
  const token3 = 'BTC'

  expect(() => validation.hasToken(rates, token1)).toThrow()
  expect(() => validation.hasToken(rates, token2)).toThrow()
  expect(() => validation.hasToken(rates, '')).toThrow()
  expect(() => validation.hasToken(rates, token3)).not.toThrow()
})

test('event must have pathParameters not empty', () => {
  const eventWithoutParams = {test: 'test'}
  const eventWithEmptyParams = {pathParameters: ''}
  const eventWithWrongParams = {pathParameters: {test: 'string'}}
  const eventWithCorrectParams = {pathParameters: {id: 1}}

  expect(() => validation.hasParam(eventWithoutParams, 'id')).toThrow()
  expect(() => validation.hasParam(eventWithEmptyParams, 'id')).toThrow()
  expect(() => validation.hasParam(eventWithWrongParams, 'id')).toThrow()
  expect(() => validation.hasParam(eventWithCorrectParams, 'id')).not.toThrow()
})

test('tokenId passed should be in list', () => {
  const data1 = { Items: ['BTC', 'ETH', 'DOGE']}
  const data2 = { Items: []}
  const token = 'BTC'

  expect(() => validation.arrayExist(data2, token)).toThrow()
  expect(() => validation.arrayExist(data1, token)).toThrow()
  expect(() => validation.arrayExist(data1.Items, token)).not.toThrow()
})


jest.mock('../../controllers/dynamoController')

test('tokenId is already in database', async () => {

  expect.assertions(3)

  DynamoController.mockImplementation( () => {
    return {
      listAll: async () => { 
        return { Items: [ {tokenId: 'BTC'}, {tokenId: 'ETH'}]}
      }
    }
  })

  const tokens1 = ['BTC', 'WAVES', 'DOGE']
  const tokens2 = ['ETH', 'BAY', 'ADX']
  const tokens4 = ['DOGE', 'BAY', 'ETC']

  expect(async () => await validation.tokenSaved(tokens1)).rejects.toThrow()
  expect(async () => await validation.tokenSaved(tokens2)).rejects.toThrow()
  expect(async () => await validation.tokenSaved(tokens4)).not.toThrow()
})