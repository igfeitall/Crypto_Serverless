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
    
    const batchCalls = chunks(queryResults.Items, 25).map( async (chunk) => {
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

      return await dynamoClient.batchWrite(batchWriteParams).promise()
    })

    return Promise.all(batchCalls)
  }
}

const addItems = async (items) => {

  const batchCalls = chunks(items, 25).map( async () => {
    const PutRequests = items.map( (item) => {
      console.log(item);
      return {
        PutRequest: {
          Item: item
        }
      }
    })

    const batchWriteParams = {
      RequestItems: {
        [TableName]: PutRequests
      }
    }

    return await dynamoClient.batchWrite(batchWriteParams).promise()
  })

  return Promise.all(batchCalls)
}

module.exports = {getById, listAll, deleteById, addItems}