//schema: type of response data
//ajv---> node library for schema validation
//npm install ajv

import {test, expect} from "../../src/fixtures/apiFixtures";
import Ajv from "ajv";


let TOKEN = process.env.API_TOKEN;
let AUTH_HEADER = { Authorization : `Bearer ${TOKEN}`};

//set up AJV
let ajv = new Ajv();

//define JSON schema
let userSchema = {
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
  ]
};

let userSchemaArray = {
  "type": "array",
  "items": userSchema
};



test('GET - schema validation - get user', async({apiHelper}) =>{
    let userData ={
        name: "Tenali Ramakrishna",
        email: `Sam_${Date.now()}@gmail.com`,
        gender: "male",
        status: "active"
    };


    let userResponse = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
   expect(userResponse.status).toBe(201);

   let validate = ajv.compile(userSchema);
   let isSchemaValid = validate(userResponse.body);

   if(! isSchemaValid){
        console.log("schema error", validate.errors);
   }

   expect(isSchemaValid).toBeTruthy();

});


test('GET -schema validation- get all user', async({apiHelper}) =>{

    let userResponse = await apiHelper.get('/public/v2/users', AUTH_HEADER);
    expect(userResponse.status).toBe(200);

   let validate = ajv.compile(userSchemaArray);
   let isSchemaValid = validate(userResponse.body);

   if(! isSchemaValid){
        console.log("schema error", validate.errors);
   }

});