import { expect } from '@wdio/globals';
import CarPage from '../pageobjects/car.page';
import allure from '@wdio/allure-reporter';
import loginPage from '../pageobjects/login.page';

describe('CP5 - Visualización de descripción, especificación y votos', () => {
    it('debe mostrar descripción, especificaciones y cantidad de votos', async () => {
        await loginPage.open();
        await CarPage.openDiablo();

        // Descripción: al menos un <p> dentro de la descripción
        const descripcion = await $('div.row > div > p');
        await expect(descripcion).toBeDisplayed();
        const descText = await descripcion.getText();
        allure.addAttachment('Descripción', descText, 'text/plain');
        expect(descText.length).toBeGreaterThan(10);

        // Especificación: buscar h4 por texto
        const specHeader = await $('h4=Specification'); // O usa XPath si prefieres
        await expect(specHeader).toBeDisplayed();
        const specsList = await specHeader.parentElement().$('ul');
        const specsText = await specsList.getText();
        allure.addAttachment('Especificaciones', specsText, 'text/plain');
        expect(specsText.length).toBeGreaterThan(5);

        // Votos: número de votos dentro del h4 con "Votes:"
        const votosH4 = await $('//div[contains(@class, "card-block")]//h4[contains(text(),"Votes")]');
        await expect(votosH4).toBeDisplayed();
        const votosStrong = await votosH4.$('strong');
        const votosNum = await votosStrong.getText();
        allure.addAttachment('Votos', votosNum, 'text/plain');
        expect(Number(votosNum)).not.toBeNaN();
        expect(Number(votosNum)).toBeGreaterThan(0);

        // Screenshot para evidencia
        const img = await browser.takeScreenshot();
        allure.addAttachment('Pantalla de auto', Buffer.from(img, 'base64'), 'image/png');
    });
});