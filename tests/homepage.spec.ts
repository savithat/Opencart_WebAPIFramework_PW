
import {test, expect} from "../src/fixtures/pageFixtures";


test.beforeEach(async({loginPage}) =>{  
    await loginPage.goTologinPage();
    await loginPage.doLogin('savi@opencart.com', 'savi@12345');
})


test('@sanity homepage title test', async({homePage}) =>{
    expect(await homePage.getHomepageTitle()).toEqual('My Account');
});


test('@sanity homepage logo visible test', async({basePage, homePage}) =>{
    expect(await basePage.isLogoVisible()).toBeTruthy();
});


test('logout link exist test', async({homePage}) =>{
    expect(homePage.isLOgoutLinkExist).toBeTruthy();
});

test('footer link list test', async({basePage, homePage}) =>{
    let footers = await basePage.getFooters();
    console.log("footers", footers);
    expect(Number(footers.length)).toBe(16);
});


test('homepage headers exist test', async({homePage}) =>{
    let allHeaders = await homePage.getHomePageHeaders();
    expect(allHeaders).toHaveLength(4);
    expect(allHeaders).toEqual(['My Account', 
    'My Orders',
    'My Affiliate Account',
    'Newsletter']);

});