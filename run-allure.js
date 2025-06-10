const { execSync } = require('child_process');

try {
    execSync('npm run clean:allure', { stdio: 'inherit' });
    execSync('wdio run wdio.conf.ts', { stdio: 'inherit' });
} catch (e) {
    // No hacer nada, igual generamos el reporte aunque falle
}
try {
    execSync('allure generate allure-results --clean', { stdio: 'inherit' });
    execSync('allure open', { stdio: 'inherit' });
} catch (e) {
    // Allure falló, muestra el error
    console.error(e);
}
