import cdk = require('@aws-cdk/core');
import s3 = require('cdk-poc-corporate-constructs/lib/s3');
import dynamoDb = require('cdk-poc-corporate-constructs/lib/dynamodb');
import { Aws } from '@aws-cdk/core';

export class CdkPocMyConsumerAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const bucket = new s3.Bucket(this, 'CDKPoCBucket', {
      bucketName: 'cdkpocbucket',
      versioningConfiguration: {
        status: 'Enabled'
      },
      bucketEncryption: {
        serverSideEncryptionConfiguration: [
          {
            serverSideEncryptionByDefault: {
              sseAlgorithm: 'AES256'
            }
          }
        ]
        },
      tags: [
        {
          key: 'Department',
          value: 'AI Factory'
        }
      ]
    });

    // Create DynamoDB table
    const dynamoTable = new dynamoDb.DynamoTable(this, 'CDKPoCDynamo', {
      tableName: 'CDKPoCDynamo',
      attributeDefinitions: [
        {
          attributeName: 'CustomerId',
          attributeType: 'S'
        },
        {
          attributeName: 'Balance',
          attributeType: 'S'
        }
      ],
      keySchema: [
        {
          attributeName: 'CustomerId',
          keyType: 'HASH'
        },
        {
          attributeName: 'Balance',
          keyType: 'RANGE'
        }
      ],
      provisionedThroughput: {
        readCapacityUnits: 1,
        writeCapacityUnits: 1
      },
      sseSpecification: {
        sseEnabled: true
      },
      tags: [
        {
          key: 'Department',
          value: 'AI Factory'
        }
      ]
    })
  }
}
