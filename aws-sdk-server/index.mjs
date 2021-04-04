import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'

import crypto from 'crypto'

const clientId = '5cdgugg1eko9cm7u1u3spnaf37'
const clientSecret = '7j3v7ag5avt2pegj45lad3f7f0lpdikhm2o6oiae9arii1pbqn0'
const email = 'max@maxivanov.io'
const password = '12345678'

;(async () => {
  var params = {
    ClientId: clientId,
    Password: password,
    Username: email,
    SecretHash: hashSecret(clientSecret, email, clientId),
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  }

  const provider = new CognitoIdentityProvider({ region: 'us-east-1' })

  try {
    const res = await provider.signUp(params)
    console.log('Signup success. Result: ', JSON.stringify(res))
  } catch (e) {
    console.log('Signup fail. Error: ', e)
  }
})()

function hashSecret(clientSecret, username, clientId) {
  return crypto
    .createHmac('SHA256', clientSecret)
    .update(username + clientId)
    .digest('base64')
}
