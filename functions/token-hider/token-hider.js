const process = require('process')
const axios = require('axios')
const qs = require('qs')

const handler = async function (event) {
  // apply our function to the queryStringParameters and assign it to a variable
  //const API_PARAMS = qs.stringify(event.queryStringParameters)
  // Get env var values defined in our Netlify site UI
  const { API_TOKEN, API_URL } = process.env
  // set variables
  const URL = `${API_URL}`;
  const TOKEN = `${API_TOKEN}`
  // log to console
  console.log(URL)
  console.log(TOKEN)

  const { data } = await axios.get(URL)
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }

  // try {
  //   const { data } = await axios.get(URL)
  //   // refer to axios docs for other methods if you need them
  //   // for example if you want to POST data:
  //   //    axios.post('/user', { firstName: 'Fred' })
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify(data),
  //   }
  // } catch (error) {
  //   const { data, headers, status, statusText } = error.response
  //   return {
  //     statusCode: error.response.status,
  //     body: JSON.stringify({ status, statusText, headers, data }),
  //   }
  // }
}

module.exports = { handler }