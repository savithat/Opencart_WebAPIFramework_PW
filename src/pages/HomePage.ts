import {Locator, Page} from "@playwright/test"
import { BasePage } from "./BasePage";



export class HomePage extends BasePage{

    //private locators
    private readonly logoutlink :Locator;
    private readonly headers: Locator;
    // private readonly search: Locator;
    // private readonly searchIcon: Locator;


    //const of the class: initialize the locators
    constructor(page: Page){
        super(page);
        this.logoutlink = page.getByRole('link', {name: 'Logout'});
        this.headers = page.getByRole('heading', {level:2});
        // this.search = page.getByPlaceholder('Search');
        // this.searchIcon = page.locator('#search button');
    }


//public page actions/behaviour
    async getHomepageTitle() : Promise<string>{
      return this.page.title();

    }


    async isLOgoutLinkExist() : Promise<boolean>{
       return this.logoutlink.isVisible();
    }


    async getHomePageHeaders() : Promise<String[]>{
        console.log((await this.headers.allInnerTexts()).toString());
        return this.headers.allInnerTexts();
    }


    async doSearch(searchKey: string) : Promise<void>{
        console.log(`Searck key: ${searchKey}`);
        await this.searchBox.fill(searchKey);
        await this.searchIcon.click();
        await this.page.waitForTimeout(3000);
    }





}