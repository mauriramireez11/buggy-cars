class LoginPage {
    public get inputUsername() {
        return $('input[name="login"]');
    }
    public get inputPassword() {
        return $('input[name="password"]');
    }
    public get btnLogin() {
        return $('button[type="submit"]'); 
    }
    public get btnRegister() {
        return $('a[href="/register"]'); 
    }
   
    // Métodos
    async open() {
        await browser.url('https://buggy.justtestit.org/');
    }

    async login(username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }
}

export default new LoginPage();
