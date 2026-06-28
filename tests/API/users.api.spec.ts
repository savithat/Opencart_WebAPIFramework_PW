import {test, expect} from "@playwright/test";

let AUTH_TOKEN = {Authorization : 'Bearer 9575eecc50ef87ef1ce1f1ae7453a4ad14d0f6e316bd23342a705745f0bc42fb'};


test('@smoke get user test', async({request}) =>{
    let response = await request.get('https://gorest.co.in/public/v2/users/8502164', {
        headers: AUTH_TOKEN});
   
    // console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());
    console.log(response.statusText());
});


test('@smoke create user test', async({request}) =>{

    //JS Object
    let userData = {
        name : 'Nidhi',
      //  email : 'Nidhi@test.com',
      email: `automation_${Date.now()}@Open.com`,
        gender: 'Female',
        status : 'Active'
    }

    //JS Object to JSON: Serialization
    let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN, data: userData});
   
    // console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status()); //201
    console.log(response.statusText()); //created
});



test('@smoke Update user test', async({request}) =>{

    //JS Object
    let userData = {
        name : 'savitha1',
      email: `automation1_${Date.now()}@Open.com`,
        gender: 'Male',
        status : 'Active'
    }

    //JS Object to JSON: Serialization
    let response = await request.put('https://gorest.co.in/public/v2/users/8494474', {
        headers: AUTH_TOKEN, data: userData});
   
    // console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status()); //201
    console.log(response.statusText()); //created
});

test('Update user partial test', async({request}) =>{

    //JS Object
    let userData = {
        name : 'savitha1',
      email: `automation1_${Date.now()}@Open.com`,
        gender: 'Male',
        status : 'Active'
    }

    //JS Object to JSON: Serialization
    let response = await request.patch('https://gorest.co.in/public/v2/users/8494474', {
        headers: AUTH_TOKEN, data: userData});
   
    // console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status()); //201
    console.log(response.statusText()); //created
});



test('Delete user test', async({request}) =>{


    //JS Object to JSON: Serialization
    let response = await request.delete('https://gorest.co.in/public/v2/users/8494474', {
        headers: AUTH_TOKEN});
   
    // console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status()); //201
    console.log(response.statusText()); //created
});