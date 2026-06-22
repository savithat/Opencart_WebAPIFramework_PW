import {Locator, Page} from "@playwright/test"
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage{

    //private locators
    private readonly emailAddress :Locator;
    private readonly password : Locator;
    private readonly loginButton : Locator;
    private readonly forgotPassword : Locator;
  //  private readonly logo : Locator;
    private readonly loginErrorMessage: Locator;


    //const of the class: initialize the locators
    constructor(page: Page){
        super(page);
        this.emailAddress = page.getByRole('textbox', {name: 'E-Mail Address'});
        this.password = page.getByRole('textbox', {name: 'Password'});
        this. loginButton = page.getByRole('button', {name: 'Login'});
        this. forgotPassword = page.locator("form").getByRole('link',{name: 'Forgotten Password'});
     //   this.logo = page.getByAltText('naveenopencart');   //some common locators are in BasePage class
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
    }


//public page actions/behaviour
    async goTologinPage() : Promise<void>{
        await this.page.goto("opencart/index.php?route=account/login");
    }


    async getloginPageTitle() : Promise<string>{
        return await this.page.title();
    }


    async isForgottenPasswordExist() : Promise<boolean>{
        return await this.forgotPassword.isVisible();
    }


    
    async doLogin(username: string, password: string) : Promise<void>{
        console.log(`user creadentials: ${username}, ${password}`);
        await this.emailAddress.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();

    }


    async isInvalidLoginErrorDisplayedOrNot() : Promise<boolean>{
        return await this.loginErrorMessage.isVisible();
    }


    
}