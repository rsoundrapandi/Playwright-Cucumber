import {Given,When,Then} from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage.js';

Given('I open the login page', async function () {
this.loginPage =new LoginPage(this.page);
await this.loginPage.open();

});


When('I login with username {string} and password {string}',async function (username, password) {
        await this.loginPage.login(username,password);

    }
);


Then('I should see the login error message',async function () {
        const error =await this.loginPage.getErrorMessage();

        console.log('Error message:',error);

    }
);