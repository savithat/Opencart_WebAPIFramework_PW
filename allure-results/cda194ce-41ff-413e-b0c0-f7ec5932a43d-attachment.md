# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API/amedus.oauth2.spec.ts >> GET - get location data
- Location: tests/API/amedus.oauth2.spec.ts:32:1

# Error details

```
TypeError: jsonResponse.data.size is not a function
```

# Test source

```ts
  1  | import {test, expect} from "@playwright/test"
  2  | 
  3  | let OAUTH_CONFIG = {
  4  |     tokenURL:"https://test.api.amadeus.com/v1/security/oauth2/token",
  5  |     clientId: process.env.OAUTH_CLIENT_ID!,
  6  |     clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  7  |     grantType: process.env.GRANT_TYPE!,
  8  |     
  9  | };
  10 | 
  11 | let accessToken: string;
  12 | 
  13 | test.beforeEach('POST- generate access token',  async({request})=>{
  14 |     
  15 |     let response = await request.post(OAUTH_CONFIG.tokenURL, {
  16 |         form: {
  17 |            client_id: OAUTH_CONFIG.clientId,
  18 |            client_secret: OAUTH_CONFIG.clientSecret,
  19 |            grant_type: OAUTH_CONFIG.grantType 
  20 |         }
  21 | 
  22 |     });
  23 | 
  24 |      expect(response.status()).toBe(200);
  25 |     let jsonResponse = await response.json();
  26 |     console.log(jsonResponse);
  27 |     accessToken = jsonResponse.access_token;
  28 | 
  29 | });
  30 | 
  31 | 
  32 | test('GET - get location data', async({request})=>{
  33 | 
  34 |     let baseURL = 'https://test.api.amadeus.com';
  35 |     let endPOintURL = '/v1/reference-data/locations';
  36 |     
  37 |     let queryParam = {
  38 |         subType: 'CITY,AIRPORT',
  39 |         keyword: 'SFO'
  40 |     };
  41 | 
  42 |     let locationResponse = await request.get(`${baseURL}${endPOintURL}`, {
  43 |         headers:{
  44 |             Authorization: `Bearer ${accessToken}`
  45 |         },
  46 | 
  47 |         params: queryParam
  48 |     });
  49 | 
  50 |     expect(locationResponse.status()).toBe(200);
  51 |    let jsonResponse =  await locationResponse.json();
  52 |    console.log("------- get location response--------");
  53 |    console.log(JSON.stringify(jsonResponse, null, 2));
  54 | 
  55 |     console.log(jsonResponse.meta);
  56 |     console.log();
  57 |     console.log("self: ", jsonResponse.meta.links.self);
> 58 |     console.log("data array count: ", jsonResponse.data.size());
     |                                                         ^ TypeError: jsonResponse.data.size is not a function
  59 | 
  60 | });
```