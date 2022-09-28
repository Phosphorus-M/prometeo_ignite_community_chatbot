const axios = require('axios').default;
const { URLSearchParams } = require('url');

const login = (user, password) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('provider', 'test');
    encodedParams.set('username', user);
    encodedParams.set('password', password);

    const options = {
     method: 'POST',
     url: 'https://banking.sandbox.prometeoapi.com/login/',
     headers: {
       accept: 'application/json',
       'content-type': 'application/x-www-form-urlencoded',
       'X-API-Key': 'K3A0As0YKCVs3Y5KMbVeLN07SDSHPTevIETFQqfRdrRY9SOiqBeLuUtPcunxEOsU'
     },
     data: encodedParams,
    };

    return axios.request(options)
}



const fetchProviders = () => {
  const options = {
   method: 'GET',
   url: 'https://banking.sandbox.prometeoapi.com/provider/',
   headers: {
     accept: 'application/json',
     'X-API-Key': 'K3A0As0YKCVs3Y5KMbVeLN07SDSHPTevIETFQqfRdrRY9SOiqBeLuUtPcunxEOsU'
   }
  };

  return axios.request(options)
}

const fetchDetailProvider = (provider_code) => {
  const options = {
   method: 'GET',
   url: `https://banking.sandbox.prometeoapi.com/provider/${provider_code}/`,
   headers: {
     accept: 'application/json',
     'X-API-Key': 'K3A0As0YKCVs3Y5KMbVeLN07SDSHPTevIETFQqfRdrRY9SOiqBeLuUtPcunxEOsU'
   }
  };

  return axios.request(options)
}

module.exports = {
  login,
  fetchProviders,
  fetchDetailProvider
}