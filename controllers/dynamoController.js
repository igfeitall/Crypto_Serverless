const AWS = require('aws-sdk')
const { chunks } = require('./utils')

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const TableName = process.env.TABLE_NAME
  

const getById = async (tokenId) => {
  const Limit = process.env.HISTORIC_LIMIT
  const params = {
      KeyConditionExpression: 'tokenId = :id',
      ExpressionAttributeValues: {
        ':id': tokenId
      },
      TableName,
      Limit,
      ScanIndexForward: false
    }

  return dynamoClient.query(params).promise()
}

const listAll = async () => {
  const params = {
    TableName
  }

  return dynamoClient.scan(params).promise()
}

const deleteById = async (tokenId) => {

  const queryParams = {
    KeyConditionExpression: 'tokenId = :id',
    ExpressionAttributeValues: { ':id': tokenId },
    TableName
  }

  const queryResults = await dynamoClient.query(queryParams).promise()
  if (queryResults.Items && queryResults.Items.length > 0) {
    
    const batchCalls = chunks(queryResults.Items, 5).map( async (chunk) => {
      const deleteRequests = chunk.map( item => {
        return {
          DeleteRequest : {
            Key : {
              'tokenId' : item.tokenId,
              'timestamp' : item.timestamp,

            }
          }
        }
      })

      const batchWriteParams = {
        RequestItems : {
          [TableName] : deleteRequests
        }
      }

      await dynamoClient.batchWrite(batchWriteParams).promise()
    })

    return Promise.all(batchCalls)
  }
}

const addItem = async (item) => {
  const params = {
    TableName,
    Item: item
  }
  
  return dynamoClient.put(params).promise()
}

module.exports = {getById, listAll, deleteById, addItem}