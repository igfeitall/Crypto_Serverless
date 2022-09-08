module.exports = {
  tables: [
    {
      Table_Name: 'Tokens',
      AttributeDefinitions: [
        {
          AttributeName: 'tokenId',
          AttributeType: 'S'
        },
        {
          AttributeName: 'timestamp',
          AttributeType: 'N'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'tokenId',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'timestamp',
          KeyType: 'RANGE'
        }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    }
  ]
}