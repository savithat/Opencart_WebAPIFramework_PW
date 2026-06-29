import {test,expect} from "@playwright/test"
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";


let logingPage: LoginPage;
let homePage : HomePage;

test.beforeEach(async({page}) =>{
    logingPage = new LoginPage(page);
    await logingPage.goTologinPage();
    await logingPage.doLogin('savi@opencart.com', 'savi@12345');
    homePage = new HomePage(page);
})


test('homepage title test', async({}) =>{
    expect(await homePage.getHomepageTitle()).toEqual('My Account');
})


test('@sanity logout link exist test', async({}) =>{
    expect(homePage.isLOgoutLinkExist).toBeTruthy();
})


test('homepage headers exist test', async({}) =>{
   expect(await homePage.getHomePageHeaders()).toEqual(['My Account', 
    'My Orders',
    'My Affiliate Account',
    'Newsletter']);

})