
import {test, expect} from "../src/fixtures/pageFixtures";
import { CsvHelper } from "../src/utils/CsvHelper";



let testData = CsvHelper.readCsv('src/data/registerData.csv');
for(let row of testData){
    test(`Register user ${row.FirstName}`, async({registerPage}) =>{
        await registerPage.goToRegisterPage();
        let messageAfterRegistrationing = await registerPage.doRegisterUser(row);
        expect(messageAfterRegistrationing).toEqual('Your Account Has Been Created!');
    });
}

