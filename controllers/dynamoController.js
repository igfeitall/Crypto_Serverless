const AWS = require('aws-sdk')
const validation = require('../utils/validation')
const { chunks } = require('../utils/utils')

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const TableName = process.env.TABLE_NAME
  

class dynamoDB{

  static async getById(tokenId) {
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
  
  static async listAll(){
    const params = {
      TableName
    }
  
    return dynamoClient.scan(params).promise()
  }
  
  static async deleteById(tokenId){
  
    const queryParams = {
      KeyConditionExpression: 'tokenId = :id',
      ExpressionAttributeValues: { ':id': tokenId },
      TableName
    }
  
    const queryResults = await dynamoClient.query(queryParams).promise()
    console.log("querry result", queryResults)
    console.log(queryResults.Item);
  
    try {
      validation.arrayExist(queryResults.Items, tokenId)
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
  
        const returnValue = await dynamoClient.batchWrite(batchWriteParams).promise()
        console.log(returnValue, 'deleted values');
        return returnValue
    })
  
    return Promise.all(batchCalls)
    } catch (err) {
      
      throw err
    }
  }
  
  static async addItems (items){
  
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
}


module.exports = dynamoDB