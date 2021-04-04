import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'

const region = 'us-east-1'
const clientId = '658l7npr63jq5ohbk2gl2jvf6'

;(async () => {
  const form = document.querySelector('.form')
  const email = document.querySelector('.email')
  const password = document.querySelector('.password')
  const provider = new CognitoIdentityProvider({ region })

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    var params = {
      ClientId: clientId,
      Password: password.value,
      Username: email.value,
      UserAttributes: [
        {
          Name: 'email',
          Value: email.value,
        },
      ],
    }

    try {
      const res = await provider.signUp(params)
      console.log('Signup success. Result: ', res)
    } catch (e) {
      console.log('Signup fail. Error: ', e)
    }
  })
})()
