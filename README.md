[![CircleCI](https://circleci.com/gh/amongil/cdk-poc-my-consumer-app.svg?style=shield)](https://circleci.com/gh/amongil/cdk-poc-my-consumer-app)

This repo contains a few examples of use of the AWS CDK. A Codelab workshop can be found here to follow along (WIP as of 07/10/2019): https://aws-cdk-workshop.alvaromongil.com/#0

This CDK client app makes use of the exported libraries from the golden construct library that can be found at: https://github.com/amongil/cdk-poc-corporate-constructs

# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm test`        run the test suite with Jest
 * `npm lint`        run the linter
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

Usual cycle: Lint -> Build -> Test -> Deploy
