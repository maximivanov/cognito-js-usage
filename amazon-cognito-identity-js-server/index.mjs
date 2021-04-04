import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js'

import { promisify } from 'util'

const userPoolId = 'us-east-1_ZPwVcZizN'
const clientId = '658l7npr63jq5ohbk2gl2jvf6'
const email = 'max@maxivanov.io'
const password = '12345678'

;(async () => {
  const userPool = new CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: clientId,
  })

  try {
    const res = await signUp(userPool, email, password)
    console.log('Signup success. Result: ', res)
  } catch (e) {
    console.log('Signup fail. Error: ', e)
  }
})()

async function signUp(userPool, email, password) {
  const emailAttribute = new CognitoUserAttribute({
    Name: 'email',
    Value: email,
  })

  let attributes = [emailAttribute]

  const promisifiedSignUp = promisify(userPool.signUp).bind(userPool)

  return promisifiedSignUp(email, password, attributes, null)
}
