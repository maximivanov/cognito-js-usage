import Amplify, { Auth } from 'aws-amplify'

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_ZPwVcZizN',
    userPoolWebClientId: '658l7npr63jq5ohbk2gl2jvf6',
  },
})
;(async () => {
  const form = document.querySelector('.form')
  const email = document.querySelector('.email')
  const password = document.querySelector('.password')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    try {
      const res = await signUp(email.value, password.value)
      console.log('Signup success. Result: ', res)
    } catch (e) {
      console.log('Signup fail. Error: ', e)
    }
  })
})()

async function signUp(email, password) {
  return Auth.signUp({
    username: email,
    password,
    attributes: {
      email,
    },
  })
}
