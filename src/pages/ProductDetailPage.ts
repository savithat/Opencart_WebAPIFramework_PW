import {Locator, Page} from "@playwright/test"
import { BasePage } from "./BasePage";


export class ProductDetailPage extends BasePage{

    //private locators
    private readonly productHeading :Locator;
    private readonly productImage :Locator;
    private readonly productMetadata :Locator;
    private readonly productPricing :Locator;
    private map : Map<string, string | number>;
    private readonly productQuantity :Locator;
    private readonly productAddToCart :Locator;
    private readonly productCart: Locator;
    private readonly removeProdFromCart: Locator;
    private readonly successMassage: Locator;
    private readonly viewCart : Locator;
    

    

    //const of the class: initialize the locators
    constructor(page: Page){
        super(page);
        this.productHeading = page.getByRole('heading', {level: 1, exact:true});
        this.productImage = page.locator("#content img");
        this.productMetadata = page.locator("#content ul.list-unstyled:nth-of-type(1) li");
        this.productPricing = page.locator("#content ul.list-unstyled:nth-of-type(2) li");
        this.map = new Map<string, string>();
        this.productQuantity = page.getByRole('textbox', { name: 'Qty' });
        this.productAddToCart = page.getByRole('button', {name: 'Add to Cart'});
        this.successMassage = page.locator('.alert.alert-success');
        this.productCart = page.locator('#cart-total');
      //  this.removeProdFromCart = page.locator(".fa.fa-times");
    //   this.removeProdFromCart = page.locator('#cart .table-responsive tr').filter({ hasText: 'MacBook Pro' }).locator('.fa.fa-times');
      this.removeProdFromCart = page.locator('table.table.table-striped td button[title="Remove"]');
      //  this.viewCart = page.locator("#cart ul li:has-text('View Cart')")
      this.viewCart = page.getByRole('link', {name:'View Cart'})


    }

    //actions

    async getProductHeadingName(): Promise<string>{
        return await this.productHeading.innerText();
    }

     async getProductImageCount(): Promise<number>{
     //   await this.productImage.waitFor();
        await this.productImage.first().waitFor({state: 'visible'});
        return await this.productImage.count();
    }

/**
 * 
 * @returns this method returningthe actual product data:header, image , meta data, product price 
 */
    async getProductInfo(): Promise <Map<string, string | number>>{
        this.map.set('ProductHeader', await this.getProductHeadingName());
        await this.getProductMetadata();
         await this.getProductPricingData();
         return this.map;
    }



    private async getProductMetadata(): Promise<void>{
        let mataData = await this.productMetadata.allInnerTexts();
        for(let data of mataData){
          let  meta = data.split(":");
          let metaKey = meta[0].trim();
          let metaValue = meta[1].trim();
           this.map.set(metaKey, metaValue); 
        }


    }



    private async getProductPricingData(): Promise<void>{
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(":")[1].trim();
        this.map.set('ProductPrice',productPrice);
        this.map.set('ExTaxPrice', exTaxPrice);
    }


    async successMessageAfterAddTheProductToCart(quantity: string): Promise<string>{
        await this.productQuantity.fill(quantity);   
        await this.productAddToCart.click();
        await this.successMassage.waitFor({ state: 'visible' });
         return (await this.successMassage.innerText()).trim();
    }



    
    async addtheProductTocartFirstTime(quantity: string): Promise<string>{
        await this.productCart.waitFor({state: "visible"});
        let productsInCart = await this.productCart.innerText();
        let prodQuanitity = productsInCart.split("-")[0].split(" ")[0];
        console.log("prodQuanitity", prodQuanitity);

        let cartBeforeAddProduct = await this.productCart.allInnerTexts();
        console.log("before add to cart: ",cartBeforeAddProduct);

        if(Number(prodQuanitity) > 0){
            await this.productCart.waitFor({state: "visible"});
            await this.productCart.click()
            await this.removeProdFromCart.waitFor({state: "visible"});
            await this.removeProdFromCart.click();
        }
        
        await this.productQuantity.fill(quantity);   
        await this.productAddToCart.waitFor();
        await this.productAddToCart.click();      
        return (await this.productCart.innerText()).trim();
        
    }


    async navigateToProductPage(): Promise<void>{
       await this.productCart.waitFor({state: "visible"});
        await this.productCart.click()
        await this.viewCart.waitFor({state: "visible"});
        await this.viewCart.click();
        
    }



}