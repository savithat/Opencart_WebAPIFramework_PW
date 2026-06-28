import {test,expect} from "../src/fixtures/pageFixtures"
import { CsvHelper } from "../src/utils/CsvHelper";
import { ExcelHelper } from "../src/utils/ExcelHelper";
import { JsonHelper } from "../src/utils/JsonHelper";

test.beforeEach(async({loginPage}) =>{
    await loginPage.goTologinPage();
})

test('login page title test', async({loginPage}) =>{

    // let logingPage = new LoginPage(page);
    // await logingPage.goTologinPage();
    const pageTitle: string = await loginPage.getloginPageTitle();
    console.log(pageTitle);
    expect(pageTitle).toBe('Account Login');
})


test('forgot password link exist', async({loginPage}) =>{
   const isForgotPasswordExist = await loginPage.isForgottenPasswordExist();
   expect(isForgotPasswordExist).toBeTruthy;
})


test('user is able to login test', async({loginPage, homePage}) =>{
  //  await loginPage.doLogin('savi@opencart.com', 'savi@12345');
  await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
    expect.soft(homePage.isLOgoutLinkExist).toBeTruthy();
    expect.soft(await homePage.getHomepageTitle()).toEqual('My Account'); 
    
})



//DD_1, sequence mode
test('@regression login to app using wrong credentials with data driven test', async({loginPage, testData}) =>{
  for(let row of testData){
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayedOrNot()).toBeTruthy();
  }
 
});



//DD_2, without fixtures, arallel mode, read csv data directly and loop the test method ow wise...
let testData = CsvHelper.readCsv('src/data/loginData.csv');
for(let row of testData){
    test(`@regression invalid login test with - ${row.username} - ${row.password}`, async({loginPage}) =>{
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayedOrNot()).toBeTruthy();
    
})
};

/** 
 
//MS Excel - office latest
//xlsx format
//maintainance
let loginTestData = ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx');
for(let row of testData){
    test(`invalid login test with Excel data - ${row.uername} - ${row.password}`, async({loginPage}) =>{
         await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayedOrNot()).toBeTruthy();
    });
};


**/



//readJson('src/data/logindata.json');
let jsonTestData = JsonHelper.readJson('src/data/logindata.json');
for(let row of jsonTestData){
    test(`@smoke invalid login test with JSON data - ${row.username} - ${row.password}`, async({loginPage}) =>{
         await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayedOrNot()).toBeTruthy();
    
});
}

