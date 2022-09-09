const DynamoDB = require('../dynamoController')
const dynamoDB = new DynamoDB()

test('Dynamo exist', () => {
  expect(typeof dynamoDB).toBe('object')
})

test('Dynamo functions exist', () => {

  expect(typeof dynamoDB.addItems).toBe('function')
  expect(typeof dynamoDB.deleteById).toBe('function')
  expect(typeof dynamoDB.getById).toBe('function')
  expect(typeof dynamoDB.listAll).toBe('function')
})

const writeData = [{
  "tokenId": "TOKEN",
  "timestamp": 1662667146,
  "exchangeRate": 100,
  "evolutionRate": 0
}]