import {test,expect} from "../src/fixtures/pageFixtures"
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async({loginPage}) =>{
    await loginPage.goTologinPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});


const productData = CsvHelper.readCsv("src/data/product.csv");
for(const row of productData){
    test(`Search result count test ${row.searckey} - ${row.productname}`,  async({homePage, searchResultPage}) =>{
    await homePage.doSearch(row.searckey);
    expect(await searchResultPage.getProductResultCount()).toEqual(Number(row.resultcount));
    }); 
}


test('Search result product list  test', async({homePage, searchResultPage}) =>{
    await homePage.doSearch('macbook');
    console.log(await searchResultPage.getProductResultList());
    expect(await searchResultPage.getProductResultList()).toEqual(['MacBook','MacBook Air','MacBook Pro']);
}); 






for(const row of productData){
test(`@smoke Verify user is able to land on the product page test ${row.searckey}-${row.productname}`, async({homePage, searchResultPage, page}) =>{
    await homePage.doSearch(row.searckey);
    await searchResultPage.selectProduct(row.productname);
    expect(await page.title()).toBe(row.productname);
});
}




test('@regression Select product from search result product list test', async({homePage, searchResultPage, productDetailPage}) =>{
    await homePage.doSearch('macbook');
    console.log(await searchResultPage.getProductResultList());
    let productResultList: string[]  = await searchResultPage.getProductResultList();
    expect(productResultList).toEqual(['MacBook','MacBook Air','MacBook Pro']);
    console.log("product: ",productResultList[2]);
    await searchResultPage.selectProduct(productResultList[2]);
    console.log("****", await productDetailPage.getProductHeadingName());
    expect (await productDetailPage.getProductHeadingName()).toEqual(productResultList[2]);

});