import { expect } from '@wdio/globals';
import CarPage from '../pageobjects/car.page';
import allure from '@wdio/allure-reporter';
import loginPage from '../pageobjects/login.page';

describe('CP2 - No autenticado no puede votar', () => {
    it('no debe mostrar opción de votar ni comentar y debe mostrar mensaje', async () => {
        // Ir directo a la página sin iniciar sesión
        await loginPage.open();
  
        // Ir a la página del vehioculo Diablo
        await CarPage.openDiablo();

        // 1. El botón de votar NO debe estar visible
        await expect(CarPage.btnVote).not.toBeDisplayed();

        // 2. El textarea de comentario NO debe estar visible
        await expect(CarPage.commentBox).not.toBeDisplayed();

        // 3. Debe aparecer el mensaje correcto
        await expect(CarPage.unauthMessage).toHaveText('You need to be logged in to vote.');

        // Evidencia Allure
        const img = await browser.takeScreenshot();
        allure.addAttachment('Vista no autenticado', Buffer.from(img, 'base64'), 'image/png');
    });
});
