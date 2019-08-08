#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkPocMyConsumerAppStack } from '../lib/cdk-poc-my-consumer-app-stack';
import { Aws } from '@aws-cdk/core';

const app = new cdk.App();
new CdkPocMyConsumerAppStack(app, 'CDKPoCMyConsumerAppStack', {
  env: {
    region: Aws.REGION,
    account: Aws.ACCOUNT_ID
  }}
)
