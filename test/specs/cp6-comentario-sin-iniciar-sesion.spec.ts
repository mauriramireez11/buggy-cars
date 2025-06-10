import { expect } from '@wdio/globals';
import CarPage from '../pageobjects/car.page';
import allure from '@wdio/allure-reporter';
import loginPage from '../pageobjects/login.page';

describe('CP6 - Intentar dejar comentario sin sesión activa', () => {
    it('no debe permitir comentar ni votar y debe mostrar mensaje alternativo', async () => {
        // NO iniciar sesión
        await loginPage.open(); // Si esto te lleva al login, simplemente ignora el login y navega al auto.

        await CarPage.openDiablo();

        // Esperar a que cargue la sección de comentarios/votos
        await browser.pause(500); // Puedes cambiar por un waitForDisplayed más específico

        // Verificar que NO aparece el campo para comentarios
        const existsCommentBox = await CarPage.commentBox.isExisting();
        allure.addAttachment('Campo de comentario visible (debe ser false)', String(existsCommentBox), 'text/plain');
        expect(existsCommentBox).toBe(false);

        // Verificar que NO aparece el botón de votar
        const existsVoteButton = await CarPage.btnVote.isExisting();
        allure.addAttachment('Botón de votar visible (debe ser false)', String(existsVoteButton), 'text/plain');
        expect(existsVoteButton).toBe(false);

        // Verificar que aparece el mensaje alternativo
        const unauthMessage = await CarPage.unauthMessage;
        await expect(unauthMessage).toBeDisplayed();
        const msg = await unauthMessage.getText();
        allure.addAttachment('Mensaje mostrado', msg, 'text/plain');
        expect(msg).toContain('You need to be logged in to vote');

        // Screenshot de evidencia
        const img = await browser.takeScreenshot();
        allure.addAttachment('Pantalla sin sesión', Buffer.from(img, 'base64'), 'image/png');
    });
});
