export const environment = {
  production: false,
  apiUrl: 'https://api.qwik2pay.com',
  auth: {
    issuer: 'https://auth.qwik2pay.com',
    clientId: 'qwik2pay-mobile',
    redirectUri: 'com.qwik2pay.app://callback',
    scope: 'openid profile email offline_access'
  }
};

