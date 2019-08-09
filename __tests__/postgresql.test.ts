import cdk = require('@aws-cdk/core');
import rds = require('cdk-poc-corporate-constructs/lib/rds');
import { countResources, expect, haveResource, ResourcePart } from '@aws-cdk/assert';

test('test instance class is set up correctly for a production postgresql instance', () => {  
  const stack = new cdk.Stack();

  const postgres = new rds.ProductionPostgresql(stack, 'MyProdPostgres', {
    dbInstanceClass: 'db.t2.micro'
  });

  expect(stack).to(haveResource('AWS::RDS::DBInstance', {
    DBInstanceClass: 'db.t2.micro'
  }))
});

test('test name is correctly set for a production postgresql instance', () => {
  const stack = new cdk.Stack();

  const postgres = new rds.ProductionPostgresql(stack, 'MyProdPostgres', {
    dbInstanceClass: 'db.t2.micro',
    dbName: 'myname'
  });

  expect(stack).to(haveResource('AWS::RDS::DBInstance', {
    DBName: 'myname'
  }))
});

test('test engine version is 11.4 for a production postgresql instance', () => {
  const stack = new cdk.Stack();

  const postgres = new rds.ProductionPostgresql(stack, 'MyProdPostgres', {
    dbInstanceClass: 'db.t2.micro'
  });
  
  expect(stack).to(haveResource('AWS::RDS::DBInstance', {
    EngineVersion: '11.4'
  }))
});

test('test multiaz is enabled for a production postgresql instance', () => {
  const stack = new cdk.Stack();
  const postgres = new rds.ProductionPostgresql(stack, 'MyProdPostgres', {
    dbInstanceClass: 'db.t2.micro'
  });
  
  expect(stack).to(haveResource('AWS::RDS::DBInstance', {
    MultiAZ: true
  }))
});
