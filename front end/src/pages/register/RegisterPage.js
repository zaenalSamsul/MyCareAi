// scripts/pages/register/RegisterPage.js

import '../../component/registerForm.js';
import '../../component/googleLogin.js';
import '../../component/navbar.js';
import RegisterPresenter from '../../presenter/RegisterPresenter.js';

class RegisterPage extends HTMLElement {
    constructor() {
        super();
        this.presenter = new RegisterPresenter(this);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
      <nav-bar></nav-bar>
      <div class="login-container register login-content-animate content-hidden" id="register-content">
        <div class="login-right">
          <h2 class="login-title">Daftar</h2>
          <register-form></register-form>
          <div class="divider">
            <span>Atau Daftar Menggunakan</span>
          </div>
          <google-login></google-login>
        </div>
        <div class="login-left">
          <img src="./image/logo.png" alt="Logo" class="logo" />
          <h2>Halo, Selamat Datang !</h2>
          <p class="account-text">Sudah Punya Akun?</p>
          <button class="btn-create" id="btn-login">Masuk</button>
        </div>
      </div>
    `;

        // Simpan referensi
        this.navComp = this.querySelector('nav-bar');
        this.regContent = this.querySelector('#register-content');

        // Animasi tampilkan konten
        setTimeout(() => {
            this.regContent.classList.remove('content-hidden');
            this.regContent.classList.add('content-fadein');
        }, 100);

        // Pasang listener “Masuk” (kembali ke login)
        this.querySelector('#btn-login').addEventListener('click', () => {
            const blueBg = document.createElement('div');
            blueBg.className = 'blue-bg-animate left';
            this.appendChild(blueBg);

            setTimeout(() => {
                blueBg.classList.add('expand-left');
            }, 10);

            setTimeout(() => {
                this.regContent.classList.add('slide-right');
            }, 400);

            setTimeout(() => {
                window.location.hash = '#login';
            }, 1000);
        });

        // Pasang callback form & Google melalui presenter
        const registerFormComp = this.querySelector('register-form');
        registerFormComp.onSubmitForm = (data) => {
            registerFormComp.clearMessage();
            this.presenter.handleRegister(data);
        };

        const googleBtn = this.querySelector('google-login');
        googleBtn.onGoogleClick = () => {
            alert('Fitur Google Signup via Google belum di-implement.');
        };
    }

    showError(msg) {
        const registerFormComp = this.querySelector('register-form');
        registerFormComp.showMessage(msg, 'error');
    }

    showSuccess(msg) {
        const registerFormComp = this.querySelector('register-form');
        registerFormComp.showMessage(msg, 'success');
    }

    showLoading(flag) {
        const btn = this.querySelector('.btn-login');
        if (btn) {
            btn.disabled = flag;
            btn.textContent = flag ? 'Loading...' : 'Daftar';
        }
    }
}

customElements.define('register-page', RegisterPage);
