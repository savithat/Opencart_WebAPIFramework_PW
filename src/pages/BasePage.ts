import { Locator, Page } from "@playwright/test";

export class BasePage{
    protected readonly page : Page;

    //common locators acroll all pages
    protected readonly logo : Locator;
    protected readonly searchBox : Locator;
    protected readonly searchIcon : Locator;
    protected readonly currency : Locator;
    protected readonly footorLinks : Locator;
    protected readonly cartButton : Locator;

    constructor(page: Page){
        this.page = page;
        this.logo = page.getByRole('img', { name: 'naveenopencart' });
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('.fa.fa-search');
        this.currency = page.getByText('Currency', {exact: true});
        this.footorLinks = page.locator('footer').getByRole('link')
        this.cartButton = page.locator("header #cart-total");

    }

    //common locators/functionalities/actions

    async isLogoVisible(): Promise<boolean>{
        return this.logo.isVisible();
    }

    async isSearchVisible(): Promise<boolean>{
        return this.searchBox.isVisible();
    }

    async isCurrencyVisible(): Promise<boolean>{
        return this.searchBox.isVisible();
    }

    async isCartButtonVisible(): Promise<boolean>{
        return this.searchBox.isVisible();
    }

     async getFooterCount(): Promise<boolean>{
        return this.searchBox.isVisible();
    }

     async getFooters(): Promise<string[]>{
        return this.footorLinks.allInnerTexts();
    }

     async getPageTitle(): Promise<string>{
        return this.page.title();
    }

    getUrl(): string{
        return this.page.url();
    }

    async waitForpageLoad(){
        return this.page.waitForLoadState('load');
    }



}