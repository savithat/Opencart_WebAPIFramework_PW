import {test, expect} from "@playwright/test"

let OAUTH_CONFIG = {
    tokenURL:"https://test.api.amadeus.com/v1/security/oauth2/token",
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.GRANT_TYPE!,
    
};

let accessToken: string;

test.beforeEach('POST- generate access token',  async({request})=>{
    
    let response = await request.post(OAUTH_CONFIG.tokenURL, {
        form: {
           client_id: OAUTH_CONFIG.clientId,
           client_secret: OAUTH_CONFIG.clientSecret,
           grant_type: OAUTH_CONFIG.grantType 
        }

    });

     expect(response.status()).toBe(200);
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    accessToken = jsonResponse.access_token;

});


//try data driven: use csv helper
test('@regression GET - get location data', async({request})=>{

    let baseURL = 'https://test.api.amadeus.com';
    let endPOintURL = '/v1/reference-data/locations';
    
    let queryParam = {
        subType: 'CITY,AIRPORT',
        keyword: 'SFO'
    };

    let locationResponse = await request.get(`${baseURL}${endPOintURL}`, {
        headers:{
            Authorization: `Bearer ${accessToken}`
        },

        params: queryParam
    });

    expect(locationResponse.status()).toBe(200);
   let jsonResponse =  await locationResponse.json();
   console.log("------- get location response--------");
   console.log(JSON.stringify(jsonResponse, null, 2));

    console.log(jsonResponse.meta);
    console.log();
    console.log("self: ", jsonResponse.meta.links.self);
    console.log("data array count: ", jsonResponse.data.length);

});