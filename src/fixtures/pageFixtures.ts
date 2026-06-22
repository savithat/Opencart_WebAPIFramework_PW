import {test as baseTest} from "@playwright/test"
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { SearchResultPage } from "../pages/SearchResultPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { BasePage } from "../pages/BasePage";
import { CsvHelper } from "../utils/CsvHelper";


//define type fpr page gixtures:
type pageFixtures = {
    loginPage: LoginPage,
    homePage: HomePage,
    registerPage: RegisterPage, 
    searchResultPage: SearchResultPage,
    productDetailPage: ProductDetailPage,
    testData: Record<string, string>[];
    basePage: BasePage;
};



//extend playwright base test

export let test = baseTest.extend<pageFixtures>({
    loginPage : async ({page}, use) =>{
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({page}, use) =>{
        let homePage = new HomePage(page);
        await use(homePage);
    },

    registerPage: async ({page}, use) =>{
        let registerPage = new RegisterPage(page);
        await use(registerPage);
    },

     searchResultPage: async ({page}, use) => {
        let searchResultPage = new SearchResultPage(page);
        await use(searchResultPage);
    } ,

    productDetailPage: async({page}, use) =>{
        let productDetailPage = new ProductDetailPage(page);
        await use(productDetailPage);
    },

    testData: async ({}, use) =>{
        let testData = CsvHelper.readCsv('src/data/loginData.csv');
        await use(testData);
    },

    basePage : async ({page}, use) =>{
        let basePage = new BasePage(page);
        await use(basePage);
    },


});

export {expect} from "@playwright/test";