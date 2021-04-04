import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js'

import { promisify } from 'util'
;(async () => {
  const form = document.querySelector('.form')
  const email = document.querySelector('.email')
  const password = document.querySelector('.password')

  const userPool = new CognitoUserPool({
    UserPoolId: 'us-east-1_ZPwVcZizN',
    ClientId: '658l7npr63jq5ohbk2gl2jvf6',
  })

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    try {
      const res = await signUp(userPool, email.value, password.value)
      console.log('Signup success. Result: ', res)
    } catch (e) {
      console.log('Signup fail. Error: ', e)
    }
  })
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
