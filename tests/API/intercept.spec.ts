
import {test, expect} from  "@playwright/test";
import { stringify } from "node:querystring";
import { json } from "node:stream/consumers";

//web app ---> intercept the network calls and log them....
//** = wildcard --- matches all the URLs...



//intercept the network calls....
test('intercept and log the request', async({page}) =>{
    await page.route('**/*', async(route) =>{
        console.log(route.request().method(), route.request().url());
        await route.continue(); //url1 -- capture and continue.. / url2 -- capture and continue...
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
});



//intercept with mocking:
//mocking:mfake data / response

test('mock search data api', async({page}) =>{

    let fakeProducts = [
        { name: 'Fake macBook Pro' , price: '$599'},
        { name: 'Fake iphone 20' , price: '$699'}
        ]

    //     await page.route('**/*', (route) =>{
     await page.route('**/index.php?route=product/search&search=macbook', (route) =>{
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProducts),
        });
     });   

     await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');
    // await page.pause();

     
     let fakeJson = await page.evaluate(async() =>{
       let fakeRes = await fetch('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');
        return await fakeRes.json();

     });

     console.log('fake json response: ******', fakeJson);

});