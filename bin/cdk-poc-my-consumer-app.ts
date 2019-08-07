#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkPocMyConsumerAppStack } from '../lib/cdk-poc-my-consumer-app-stack';

const app = new cdk.App();
new CdkPocMyConsumerAppStack(app, 'CdkPocMyConsumerAppStack');
