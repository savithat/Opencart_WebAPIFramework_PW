import {test,expect} from "@playwright/test"
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";


let logingPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async({page}) =>{
    logingPage = new LoginPage(page);
    await logingPage.goTologinPage();
    homePage = new HomePage(page);
})

test('login page title test', async({}) =>{

    // let logingPage = new LoginPage(page);
    // await logingPage.goTologinPage();
    const pageTitle: string = await logingPage.getloginPageTitle();
    console.log(pageTitle);
    expect(pageTitle).toBe('Account Login');
})


test('forgot password link exist', async({}) =>{
    // let logingPage = new LoginPage(page);
    // await logingPage.goTologinPage();
   const isForgotPasswordExist = await logingPage.isForgottenPasswordExist();
   expect(isForgotPasswordExist).toBeTruthy;
})


test('user is able to login test', async({}) =>{
    await logingPage.doLogin('savi@opencart.com', 'savi@12345');
    expect(await homePage.isLOgoutLinkExist).toBeTruthy();
   expect(await homePage.getHomepageTitle()).toEqual('My Account'); 
    
})