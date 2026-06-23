import { ApiHelper } from "../../src/api/ApiHelper";
import { test, expect } from "../../src/fixtures/apiFixtures";


const TOKEN = process.env.API_TOKEN;
let AUTH_HEADER = {Authorization: `Bearer ${TOKEN}`};

//helper -- generic function -- create a fresh user
async function createUser(apiHelper: any){
        let userData = {
        name: "sam",
        email: `sam_${Date.now()}@opencart.com`,
        gender: "female",
        status: "inactive"
    };

    let response  = await apiHelper.post('/public/v2/users',userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response;

}


//Test1 : Create a user test + verify AAA
//POST ----> userId --->Get / userId --- verify

test('POST - Create user test', async({apiHelper}) =>{
   
    //create user
    let careateUserResponse = await createUser(apiHelper);
    console.log("**** careateUserResponse", careateUserResponse);
    console.log("****careateUserResponse status: ", careateUserResponse.status);
    let userId = careateUserResponse.body.id;

    //get user
    let getCreatedUserRes =  await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getCreatedUserRes.status).toBe(200);
    expect(getCreatedUserRes.body.name).toBe(careateUserResponse.body.name);

})

//update user
//POST(create user)---->PUT(update user)----->GET(get user to validate the updated data)
test('PUT - Update user', async({apiHelper}) =>{
    //create user
    let createUserRes = await createUser(apiHelper);
    console.log("createUserRes ****", createUserRes);
    console.log("createUserRes.status: ", createUserRes.status);
    expect(createUserRes.status).toBe(201);
    let userId = createUserRes.body.id;
    
    //update user
    let userUpdateData = {
        name: "Ram",
        status: "active"
    }

    let updateUesrRes = await apiHelper.put(`/public/v2/users/${userId}`, userUpdateData, AUTH_HEADER);
    console.log("updateUesrRes ****", updateUesrRes);
    expect(updateUesrRes.status).toBe(200);
    
    //get user --- validating 
    let getUserRes = await apiHelper.get(`/public/v2/users/${userId}`);
    console.log("getUserRes after updateUesrRes ****", getUserRes);
    expect(updateUesrRes.status).toBe(200);
    expect(updateUesrRes.body.name).toBe(getUserRes.body.name);
    expect(updateUesrRes.body.status).toBe(getUserRes.body.status);

})


//DELETE user
//POST(Create user) -----> DELETE(Delete user)--------->GET(get user to validate user is deleted)
test('DELETE - delete user', async({apiHelper}) => {
    //create user
    let createUserRes = await createUser(apiHelper);
    console.log("****", createUserRes);
    console.log("createUserRes.status: ", createUserRes.status);
    expect(createUserRes.status).toBe(201);
    let userId = createUserRes.body.id;
    
    //delete user
    let deleteUesrRes = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
    console.log("****", deleteUesrRes);
    expect(deleteUesrRes.status).toBe(204);
    expect(deleteUesrRes.statusText).toBe('No Content');

    //get user --- validating 
    let getUserRes = await apiHelper.get(`/public/v2/users/${userId}`);
    console.log("getUserRes: ", getUserRes);
    expect(getUserRes.status).toBe(404);
    expect(getUserRes.body.message).toBe('Resource not found');
 
})
