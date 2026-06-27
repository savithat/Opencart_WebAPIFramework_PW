import {test,expect} from "../src/fixtures/pageFixtures"
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async({loginPage}) =>{
    await loginPage.goTologinPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});



test('Verify product image count',  async({homePage, searchResultPage, productDetailPage}) =>{
    await homePage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    let imageCount = await productDetailPage.getProductImageCount();
    console.log('imageCount: ',imageCount);
        expect(imageCount).toBe(4);
}); 

test('Verify product information/Data',  async({homePage, searchResultPage, productDetailPage}) =>{
    await homePage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    let actualProductInfo = await productDetailPage.getProductInfo();
    console.log('actualProductInfo: ', actualProductInfo);
    //write all expect---
    expect.soft(actualProductInfo.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProductInfo.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfo.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfo.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfo.get('Availability')).toBe('Out Of Stock');
    expect.soft(actualProductInfo.get('ProductPrice')).toBe('$2,000.00');
    expect.soft(actualProductInfo.get('ExTaxPrice')).toBe('$2,000.00');

}); 


test('Verify success message is displayin after product is added to cart ',  async({homePage, searchResultPage, productDetailPage}) =>{
    await homePage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    let sucessMasaage  = await productDetailPage.successMessageAfterAddTheProductToCart('4');
    const cleanMsg = sucessMasaage.replace("×", "").trim();
    console.log("sucessMasaage: ", sucessMasaage);
    expect(cleanMsg).toBe("Success: You have added MacBook Pro to your shopping cart!");

}); 


test.skip('Verify cart is displaying exact number of products after product is added to cart firstTime',  async({homePage, searchResultPage, productDetailPage}) =>{
    await homePage.doSearch('macbook');
    await searchResultPage.selectProduct('MacBook Pro');
    let prodInCart  = await productDetailPage.addtheProductTocartFirstTime('6');
    console.log("after add the prod to cart: ", prodInCart);
     let prodQuanitity = prodInCart.split("-")[0].split(" ")[0];
    console.log("prodQuanitity: ", prodQuanitity);
    expect(Number(prodQuanitity)).toBe(6);

}); 