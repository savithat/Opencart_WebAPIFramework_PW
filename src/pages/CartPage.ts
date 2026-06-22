import {Locator, Page} from "@playwright/test"
import { BasePage } from "./BasePage";


export class CartPage extends BasePage{

    //private locators
    private readonly productImage :Locator;
    private readonly shoppingCartDetails :Locator;
    private readonly couponCode :Locator;
    private readonly couponCodeTextBox : Locator;
    private readonly estimatedShippingAndTax : Locator;
    private readonly country: Locator;
    private readonly region: Locator; 
    private readonly postCode: Locator; 
    private readonly quoteButton: Locator;
     private readonly geftCertificate: Locator;

    

    //const of the class: initialize the locators
    constructor(page: Page){
        super(page);
      
    this.productImage = page.locator(".table-responsive img");    
    this.shoppingCartDetails = page.locator(".table-responsive tbody td");
    this.couponCode = page.getByRole('link', { name: 'Use Coupon Code' })  
    this.couponCodeTextBox = page.getByRole('textbox', {name: 'Enter your coupon here'});
    this.estimatedShippingAndTax = page.getByRole('link', { name: 'Estimate Shipping & Taxes' });
    this.country = page.getByLabel('Country');
    this.region = page.getByLabel('Region / State');
    this.postCode = page.getByLabel('Post Code');
    this.quoteButton = page.getByRole('button', {name: 'Get Quotes'});
    this.geftCertificate = page.getByRole('link', {name: 'Use Gift Certificate'});

    }

    //actions

    async isProdImageVisible(): Promise<boolean>{
        return await this.productImage.isVisible();
    }

     async getProductDetails(): Promise<string[]>{
        return await this.shoppingCartDetails.allInnerTexts()
        
    }



}