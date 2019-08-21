import cdk = require('@aws-cdk/core');
import s3 = require('cdk-poc-corporate-constructs/lib/s3');
import dynamoDb = require('cdk-poc-corporate-constructs/lib/dynamodb');
import rds = require('cdk-poc-corporate-constructs/lib/rds');

export class CdkPocMyConsumerAppStack extends cdk.Stack {
    public constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create S3 bucket
        new s3.Bucket(this, 'CDKPoCBucket', {
            bucketName: 'cdkpocbucket',
            versioningConfiguration: {
                status: 'Enabled',
            },
            // bucketEncryption: {
            //     serverSideEncryptionConfiguration: [
            //         {
            //             serverSideEncryptionByDefault: {
            //                 sseAlgorithm: 'AES256',
            //             },
            //         },
            //     ],
            // },
            tags: [
                {
                    key: 'Department',
                    value: 'AI Factory',
                },
            ],
        });

        // Create DynamoDB table
        new dynamoDb.DynamoTable(this, 'CDKPoCDynamo', {
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

        // Create Production PostgreSQL instance
        new rds.ProductionPostgresql(this, 'MyProductionPostgresql', {
            dbInstanceClass: 'db.t2.medium',
            allocatedStorage: '10',
            masterUsername: 'myUser',
            masterUserPassword: 'myPassword',
            dbName: 'cdkpocpostgres',
            storageEncrypted: true,
            tags: [
                {
                    key: 'Department',
                    value: 'AI Factory',
                },
            ],
        });
    }
}
