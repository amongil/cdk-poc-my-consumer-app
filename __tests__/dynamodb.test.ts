import cdk = require('@aws-cdk/core');
import dynamoDb = require('cdk-poc-corporate-constructs/lib/dynamodb');
import { countResources, expect, haveResource, ResourcePart } from '@aws-cdk/assert';


test('test name is correctly set for a dynamodb table', () => {
  const stack = new cdk.Stack();

  const table = new dynamoDb.DynamoTable(stack, 'CDKPoCDynamo', {
    tableName: 'CDKPoCDynamo',
    attributeDefinitions: [
        {
            attributeName: 'CustomerId',
            attributeType: 'S',
        },
        {
            attributeName: 'Balance',
            attributeType: 'S',
        },
    ],
    keySchema: [
        {
            attributeName: 'CustomerId',
            keyType: 'HASH',
        },
        {
            attributeName: 'Balance',
            keyType: 'RANGE',
        },
    ],
    provisionedThroughput: {
        readCapacityUnits: 1,
        writeCapacityUnits: 1,
    },
    sseSpecification: {
        sseEnabled: true,
    },
    tags: [
        {
            key: 'Department',
            value: 'AI Factory',
        },
    ],
});

  expect(stack).to(haveResource('AWS::DynamoDB::Table', {
    TableName: 'CDKPoCDynamo'
  }))
});

test('test throughput is correct for a dynamodb table', () => {
    const stack = new cdk.Stack();
  
    const table = new dynamoDb.DynamoTable(stack, 'CDKPoCDynamo', {
      tableName: 'CDKPoCDynamo',
      attributeDefinitions: [
          {
              attributeName: 'CustomerId',
              attributeType: 'S',
          },
          {
              attributeName: 'Balance',
              attributeType: 'S',
          },
      ],
      keySchema: [
          {
              attributeName: 'CustomerId',
              keyType: 'HASH',
          },
          {
              attributeName: 'Balance',
              keyType: 'RANGE',
          },
      ],
      provisionedThroughput: {
          readCapacityUnits: 1,
          writeCapacityUnits: 1,
      },
      sseSpecification: {
          sseEnabled: true,
      },
      tags: [
          {
              key: 'Department',
              value: 'AI Factory',
          },
      ],
  });
  
    expect(stack).to(haveResource('AWS::DynamoDB::Table', {
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      }
    }))
  });