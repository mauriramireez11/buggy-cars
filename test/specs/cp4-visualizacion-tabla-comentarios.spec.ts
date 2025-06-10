import { expect } from '@wdio/globals';
import allure from '@wdio/allure-reporter';
import loginPage from '../pageobjects/login.page';
import CarPage from '../pageobjects/car.page';

// Función auxiliar para chequear la cantidad de headers
async function hayMinimoHeaders(n: number): Promise<boolean> {
    const headers = await $$('th');
    return await headers.length >= n;
}

describe('CP4 - Visualización de la tabla de comentarios', () => {
    it('debe mostrar las columnas Date, Author y Comment', async () => {
        await loginPage.open();
        await CarPage.openDiablo();

        // Usa la función auxiliar en waitUntil
        await browser.waitUntil(
            () => hayMinimoHeaders(3),
            { timeout: 5000, timeoutMsg: 'No se encontraron los encabezados de columna' }
        );

        // Ahora extrae los headers para validar el texto
        const headers = await $$('th');
        const headerTexts: string[] = [];
        for (const th of headers) {
            headerTexts.push(await th.getText());
        }
        allure.addAttachment('Headers encontrados', headerTexts.join(', '), 'text/plain');
        const imgDebug = await browser.takeScreenshot();
        allure.addAttachment('Tabla en estado actual', Buffer.from(imgDebug, 'base64'), 'image/png');

        expect(headerTexts).toEqual(['Date', 'Author', 'Comment']);

        // Chequea que haya al menos un comentario
        const rowsAntes = await $$('table.table tbody tr');
        expect(rowsAntes.length).toBeGreaterThan(0);
    });
});