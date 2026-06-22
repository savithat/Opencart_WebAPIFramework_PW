import {Locator, Page} from "@playwright/test"
import { BasePage } from "./BasePage";


export class SearchResultPage extends BasePage{

    //private locators
    private readonly searchResult :Locator;
    private readonly serachresultLinks: Locator;



    //const of the class: initialize the locators
    constructor(page: Page){
        super(page);
        this.searchResult = page.locator(".product-layout");
        this.serachresultLinks = page.locator(".product-layout div .caption a");
    }

    //actions

    async getProductResultCount(): Promise<Number>{
        return await this.searchResult.count();
    }


    async getProductResultList():Promise<string[]>{
        return await this.serachresultLinks.allInnerTexts();
    }

    async selectProduct(productName: string) : Promise<void>{
       // await this.page.getByText(productName, { exact: true }).click();
       await this.page.locator('#content').getByText(productName, { exact: true }).click();

    }

}