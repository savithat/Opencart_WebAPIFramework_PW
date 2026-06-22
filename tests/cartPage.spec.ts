import {test,expect} from "../src/fixtures/pageFixtures"
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async({loginPage}) =>{
    await loginPage.goTologinPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});



test('Verify user is on Shopping Cart page',  async({basePage, homePage, searchResultPage, productDetailPage}) =>{
    await homePage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    await productDetailPage.addtheProductTocartFirstTime('4');
    await productDetailPage.navigateToProductPage();
    console.log("cart page title is: ", await basePage.getPageTitle());
    expect(await basePage.getPageTitle()).toBe("Shopping Cart");
}); 

