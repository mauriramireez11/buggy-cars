class RegisterPage {
    public get inputUsername() { return $('#username'); }
    public get inputFirstName() { return $('#firstName'); }
    public get inputLastName() { return $('#lastName'); }
    public get inputPassword() { return $('#password'); }
    public get inputConfirmPassword() { return $('#confirmPassword'); }
    // Selector más específico para Register del formulario
    public get btnRegister() { return $('form[action="/register"] button[type="submit"]'); }
    public get successMessage() { return $('.result.alert-success'); }

    async open() {
        await browser.url('https://buggy.justtestit.org/register');
    }

async register(user: { username: string; firstName: string; lastName: string; password: string; }) {
    await this.inputUsername.setValue(user.username);
    await this.inputFirstName.setValue(user.firstName);
    await this.inputLastName.setValue(user.lastName);
    await this.inputPassword.setValue(user.password);
    await this.inputConfirmPassword.setValue(user.password);
    await this.inputConfirmPassword.click();

    // (Opcional) Tab fuera del último campo para activar validaciones
    // Esto simula el comportamiento de un usuario real que tabula para salir del campo
    await browser.keys('Tab');
    // Simula el Enter (envía el formulario como un usuario normal)
    await browser.keys('Enter');

    // Submit real del formulario usando JS
    await browser.pause(200);
 

    await this.successMessage.waitForDisplayed({ timeout: 10000 });
}
    // Método para registrar un nuevo usuario
    // Recibe un objeto con los datos del usuario
    // Completa el formulario y envía el registro
}

export default new RegisterPage();
// Exporta una instancia de RegisterPage para usar en los tests
// Esto permite usar métodos como RegisterPage.open() o RegisterPage.register() directamente