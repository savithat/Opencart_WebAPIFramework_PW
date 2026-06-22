import { ApiHelper } from "../../src/api/ApiHelper";
import { test, expect } from "../../src/fixtures/apiFixtures";


const TOKEN = process.env.API_Token;
let AUTH_HEADER = {Authorization: `Bearer ${TOKEN}`};
let id: number;

test.describe.serial('running e2e go rest api test', () =>{

//get test
test('GET API - get all users', async({apiHelper}) =>{
    let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
    expect(response.status).toBe(200);
    console.log(response.body);
    expect(response.body.length).toBeGreaterThan(0);
})




//post test
test('POST API - create user', async({apiHelper}) =>{
    let userData = {
        name: "sam",
        email: `sam_${Date.now()}@opencart.com`,
        gender: "female",
        status: "inactive"
    };

    console.log("TOKEN:", AUTH_HEADER);


    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);

    console.log(response.body);

    console.log(response.body.id);
    id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userData.name);
    expect(response.body.gender).toBe(userData.gender);
    expect(response.body.status).toBe(userData.status);

})


//put test
test('PUT API- update name', async({apiHelper}) =>{

    let userUpdatedData = {
        name: "Ram",
        status: "active"
    }

   let Response = await apiHelper.put(`/public/v2/users/${id}`, userUpdatedData, AUTH_HEADER)
   console.log(Response.body.name);
   expect(Response.body.name).toBe(userUpdatedData.name);
   expect(Response.body.status).toBe(userUpdatedData.status);

})




//delete test
test('DELETE API - delete user', async({apiHelper}) =>{
    let response = await apiHelper.delete(`/public/v2/users/${id}`, AUTH_HEADER);
    
     console.log("response.status: ", response.status);
     console.log("response.statusText", response.statusText);
  //  expect(response.status).toBe(204);
   
})

})

