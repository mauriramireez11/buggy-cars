import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page';
import RegisterPage from '../pageobjects/register.page';
import CarPage from '../pageobjects/car.page';
import allure from '@wdio/allure-reporter';

describe('CP1 - Votar auto autenticado', () => {
    let username: string;
    const password = 'Password123*';

    beforeEach(async () => {
        // Genera usuario único para no repetir
        username = `testuser_${Date.now()}`;
        // Abre la página de registro
        await RegisterPage.open();
        // Completa el registro
        await RegisterPage.register({
            username,
            firstName: 'Auto',
            lastName: 'Test',
            password,
        });
        // Espera a que se registre correctamente
        // --- Validar que el registro fue exitoso ---
        await expect(RegisterPage.successMessage).toBeDisplayed();
        await expect(RegisterPage.successMessage).toHaveText('Registration is successful');
        // Si el registro no inicia sesión automáticamente, loguéate
        await LoginPage.login(username, password);
        // Espera a que se muestre el mensaje de bienvenida 
        // Esperar y validar login por texto en nav
        const hiUser = await $('span.nav-link.disabled');
        await expect(hiUser).toHaveText('Hi, Auto'); 
        // Evidencia de inicio de sesión exitoso  
        const imgLogin = await browser.takeScreenshot();
        allure.addAttachment('Login exitoso', Buffer.from(imgLogin, 'base64'), 'image/png');
        // Llamar a open para asegurarse de que la página de inicio esté lista
        await LoginPage.open();
    });

    it('debe incrementar el contador de votos para el Lamborghini Diablo', async () => {
        // 1. Ir a Popular Model y click en la imagen del Diablo
        await CarPage.openDiablo();

        // 2. Obtener votos antes de votar
        const votosAntes = await CarPage.getVotes();
        console.log(`Votos antes de votar: ${votosAntes}`);

        // Evidencia de votos antes de votar// Evidencia
        const imgantes = await browser.takeScreenshot();
        allure.addAttachment('Cantidad de votos antes de votar', Buffer.from(imgantes, 'base64'), 'image/png');

        // 3. Votar (sin comentario)
        await CarPage.vote();
        await CarPage.voteSuccessMessage.waitForDisplayed({ timeout: 15000 });
        await expect(CarPage.voteSuccessMessage).toHaveText('Thank you for your vote!');

        // 4. Esperar a que cambie el contador de votos (espera hasta 3s)
        await browser.waitUntil(
            async () => (await CarPage.getVotes()) === votosAntes + 1,
            {
                timeout: 15000,
                timeoutMsg: 'El contador de votos no se incrementó como se esperaba, votos antes: ' + votosAntes 
                + 'votos después: ' + (votosAntes + 1)
            }
        );

        // 5. Obtener votos después
        const votosDespues = await CarPage.getVotes();
        console.log(`Votos después de votar: ${votosDespues}`);

        // 6. Validar incremento de votos
        await expect(votosDespues).toBe(votosAntes + 1);

        // Evidencia
        const img = await browser.takeScreenshot();
        allure.addAttachment('Votación exitosa', Buffer.from(img, 'base64'), 'image/png');
    });
});
