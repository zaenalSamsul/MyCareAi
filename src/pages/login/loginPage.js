// scripts/pages/login/loginPage.js

import '../../component/loginForm.js';
import '../../component/googleLogin.js';
import '../../component/navbar.js';
// Kita bisa pakai navbar yang sama jika ingin tampil
import LoginPresenter from '../../presenter/LoginPresenter.js';

class LoginPage extends HTMLElement {
    constructor() {
        super();
        this.presenter = new LoginPresenter(this);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
      <nav-bar></nav-bar>
      <div class="login-container login-page login-content-animate content-hidden" id="login-content">
        <div class="login-left">
          <img src="./image/logo.png" alt="Logo" class="logo" />
          <h2>Halo, Selamat Datang !</h2>
          <p class="account-text">Belum Punya Akun?</p>
          <button class="btn-create" id="btn-register">Buat Akun</button>
        </div>
        <div class="login-right">
          <h2 class="login-title">Login</h2>
          <login-form></login-form>
          <div class="divider">
            <span>Atau</span>
          </div>
          <google-login></google-login>
        </div>
      </div>
    `;

        // Simpan referensi
        this.navComp = this.querySelector('nav-bar');
        this.loginContent = this.querySelector('#login-content');

        // Animasi tampilkan konten
        setTimeout(() => {
            this.loginContent.classList.remove('content-hidden');
            this.loginContent.classList.add('content-fadein');
        }, 100);

        // Pasang listener navigasi “Buat Akun”
        this.querySelector('#btn-register').addEventListener('click', () => {
            // Animasi kotak biru dan slide sebelum pindah
            const blueBg = document.createElement('div');
            blueBg.className = 'blue-bg-animate';
            this.appendChild(blueBg);

            setTimeout(() => {
                blueBg.classList.add('expand');
            }, 10);

            setTimeout(() => {
                this.loginContent.classList.add('slide-left');
            }, 400);

            setTimeout(() => {
                window.location.hash = '#register';
            }, 1000);
        });

        // Pasang callback form & button Google melalui presenter
        const loginFormComp = this.querySelector('login-form');
        loginFormComp.onSubmitForm = (username, password) => {
            loginFormComp.clearMessage();
            this.presenter.handleLogin(username, password);
        };

        const googleBtn = this.querySelector('google-login');
        googleBtn.onGoogleClick = () => {
            alert('Fitur Google Login belum di-implement.');
        };
    }

    showError(msg) {
        const loginFormComp = this.querySelector('login-form');
        loginFormComp.showMessage(msg, 'error');
    }

    showSuccess(msg) {
        const loginFormComp = this.querySelector('login-form');
        loginFormComp.showMessage(msg, 'success');
    }

    showLoading(flag) {
        const btn = this.querySelector('.btn-login');
        if (btn) {
            btn.disabled = flag;
            btn.textContent = flag ? 'Loading...' : 'Masuk';
        }
    }
}

customElements.define('login-page', LoginPage);
