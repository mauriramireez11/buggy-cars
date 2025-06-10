import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page';
import RegisterPage from '../pageobjects/register.page';
import CarPage from '../pageobjects/car.page';
import allure from '@wdio/allure-reporter';

describe('CP3 - Votar con comentario', () => {
    let username: string;
    const password = 'Password123*';
    let comentario: string;

    beforeEach(async () => {
        username = `testuser_${Date.now()}`;
        comentario = `Comentario QA ${Date.now()}`;
        await RegisterPage.open();
        await RegisterPage.register({
            username,
            firstName: 'Auto',
            lastName: 'Test',
            password,
        });
        await expect(RegisterPage.successMessage).toBeDisplayed();
        await expect(RegisterPage.successMessage).toHaveText('Registration is successful');
        await LoginPage.open();
        await LoginPage.login(username, password);
        const hiUser = await $('span.nav-link.disabled');
        await expect(hiUser).toHaveText('Hi, Auto');
    });

    it('debe permitir votar y mostrar el comentario en la tabla', async () => {
        await CarPage.openDiablo();

        const votosAntes = await CarPage.getVotes();
        const imgAntes = await browser.takeScreenshot();
        allure.addAttachment('Cantidad de votos antes de votar', Buffer.from(imgAntes, 'base64'), 'image/png');

        await CarPage.commentBox.setValue(comentario);
        // Capturar screenshot del comentario ingresado
        const imgComentario = await browser.takeScreenshot();
        allure.addAttachment('Comentario ingresado', Buffer.from(imgComentario, 'base64'), 'image/png');

        // Votar con el comentario
        await CarPage.vote();
        await CarPage.voteSuccessMessage.waitForDisplayed({ timeout: 15000 });
        await expect(CarPage.voteSuccessMessage).toHaveText('Thank you for your vote!');

        await browser.waitUntil(
            async () => (await CarPage.getVotes()) === votosAntes + 1,
            {
                timeout: 5000,
                timeoutMsg: 'El contador de votos no se actualizó',
            }
        );
        const votosDespues = await CarPage.getVotes();
        await expect(votosDespues).toBe(votosAntes + 1);

        const imgDespues = await browser.takeScreenshot();
        allure.addAttachment('Cantidad de votos después de votar', Buffer.from(imgDespues, 'base64'), 'image/png');

        // Esperar hasta que el comentario se refleje como el primero en la tabla
        await browser.waitUntil(
            async () => (await CarPage.primerComentario.getText()) === comentario,
            {
                timeout: 5000,
                timeoutMsg: 'El comentario no apareció en la tabla',
            }
        );
        await expect(CarPage.primerComentario).toHaveText(comentario);

        const img = await browser.takeScreenshot();
        allure.addAttachment('Comentario registrado', Buffer.from(img, 'base64'), 'image/png');

        allure.addStep(`Verificando el autor del comentario (debe ser: ${username})`);
        const author = await CarPage.primerComentarioAuthor.getText();
        allure.addAttachment('Valor de Author', author, 'text/plain');
        if (author === "") {
            allure.addStep(`BUG: El campo Author está vacío. Se esperaba "${username}"`);
        }
        await expect(author).toBe(username + ', El autor del comentario no coincide con el usuario registrado');
    });
});
