# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API/users.api.schema.spec.ts >> GET - get user
- Location: tests/API/users.api.schema.spec.ts:46:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 201
```

# Test source

```ts
  1  | //schema: type of response data
  2  | //ajv---> node library for schema validation
  3  | //npm install ajv
  4  | 
  5  | import {test, expect} from "../../src/fixtures/apiFixtures";
  6  | import Ajv from "ajv";
  7  | 
  8  | 
  9  | let TOKEN = process.env.API_Token;
  10 | let AUTH_HEADER = { Authorization : `Bearer ${TOKEN}`};
  11 | 
  12 | //set up AJV
  13 | let ajv = new Ajv();
  14 | 
  15 | //define JSON schema
  16 | let userName = {
  17 |   "type": "object",
  18 |   "properties": {
  19 |     "id": {
  20 |       "type": "number"
  21 |     },
  22 |     "name": {
  23 |       "type": "string"
  24 |     },
  25 |     "email": {
  26 |       "type": "string"
  27 |     },
  28 |     "gender": {
  29 |       "type": "string"
  30 |     },
  31 |     "status": {
  32 |       "type": "string"
  33 |     }
  34 |   },
  35 |   "required": [
  36 |     "id",
  37 |     "name",
  38 |     "email",
  39 |     "gender",
  40 |     "status"
  41 |   ]
  42 | };
  43 | 
  44 | 
  45 | 
  46 | test('GET - get user', async({apiHelper}) =>{
  47 |     let userData ={
  48 |         name: "Tenali Ramakrishna",
  49 |         email: `Sam_${Date.now()}@gmail.com`,
  50 |         gender: "male",
  51 |         status: "active"
  52 |     };
  53 | 
  54 | 
  55 |     let userResponse = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
> 56 |    expect(userResponse.status).toBe(200);
     |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  57 | 
  58 |    let validate = ajv.compile(userName);
  59 |    let isSchemaValid = validate(userResponse.body);
  60 | 
  61 |    if(! isSchemaValid){
  62 |         console.log("schema error", validate.errors);
  63 |    }
  64 | 
  65 | });
```