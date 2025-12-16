export const environment = {
  production: true,

  apiUrl: 'https://your-prod-api.com',

  auth: {
    issuer: 'https://auth.qwik2pay.com',
    clientId: 'MOBILE_CLIENT_ID',
    redirectUri: 'com.qwik2pay.app://callback',
    scope: 'openid profile email offline_access api'
  }
};
