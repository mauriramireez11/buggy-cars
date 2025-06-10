import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page';
import allure from '@wdio/allure-reporter';

describe('CP0 - Login valido', () => {
    it('debe permitir iniciar sesión con credenciales válidas', async () => {
        await LoginPage.open();
        const username = 'mauriciormirez09@gmail.com';
        const password = 'Maurielmejor1*';

        await LoginPage.login(username, password);

        // Esperar y validar login por texto en nav
        const hiUser = await $('span.nav-link.disabled');
        await expect(hiUser).toHaveText('Hi, Mauricio');

        // Screenshot manual para Allure
        const img = await browser.takeScreenshot();
        allure.addAttachment('Login exitoso', Buffer.from(img, 'base64'), 'image/png');

        // (Opcional) Pausa para verlo en tiempo real
        await browser.pause(3000);
    });
});
