import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage";


export class RegisterPage extends BasePage {

    //private locators
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly passwordConfirm: Locator;
    private readonly subscribeYes: Locator;
    private readonly subscribeNo: Locator;
    private readonly privacyPolicy: Locator;
    private readonly continue: Locator;
    private readonly accountCreatedMessage:Locator;


    //const of the class: initialize the locators
    constructor(page: Page) {
        super(page);
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephone = page.getByRole('textbox', { name: 'Telephone' });
        this.password = page.getByRole('textbox', { name: '* Password', exact: true });
        this.passwordConfirm = page.getByRole('textbox', { name: '* Password Confirm', exact: true });
        this.subscribeYes = page.getByRole('radio', { name: 'Yes', exact: true });
        this.subscribeNo = page.getByRole('radio', { name: 'No', exact: true });;
        this.privacyPolicy = page.locator("input[type='checkbox'][name='agree']");
        this.continue = page.getByRole('button', { name: 'Continue' });

        //after account created
        this.accountCreatedMessage = page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 })
        ;
    }


    //public page actions/behaviour


   async goToRegisterPage(): Promise<void> {
    await this.page.goto("opencart/index.php?route=account/register");
   }

   
    async doRegisterUser(data: { [key: string]: string }): Promise<string> {

        const uniqueEmail = `user_${Date.now()}@test.com`;
    //    data.Email = uniqueEmail;
        console.log(uniqueEmail);

        console.log(`user creadentials: ${data.FirstName}, ${data.LastName}`);
        await this.firstName.fill(data.FirstName);
        await this.lastName.fill(data.LastName);
        await this.email.fill(uniqueEmail);
        console.log(data.Email);
        await this.telephone.fill(data.Telephone);

        //password is same as confirm password
        await this.password.fill(data.Password);
        console.log('password: ', data.Password);
        await this.passwordConfirm.fill(data.Password);

        if(data.Subscribe === 'Yes')
            await this.subscribeYes.click();
        else if(data.Subscribe === 'No')
           await this.subscribeNo.click();

        await this.privacyPolicy.click();
        await this.continue.click();

        let message = await this.accountCreatedMessage.textContent();
        return message?.trim() ?? "";

    }


    async doRegisterUserTest(){
        await this.firstName.fill("savi");
        await this.lastName.fill("sam");
    }

}