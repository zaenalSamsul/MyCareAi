import AuthAPI from '../../data/api.js';
import { setAuth } from "../../utils/auth.js";
import LoginPresenter from '../presenter/login-presenter.js';
import { createPageLoadingTemplate, handlePageTransition } from '../../utils/index.js';

export default class LoginPage {
  /**
   * Mengembalikan HTML untuk halaman login (form & status).
   * @returns {string}
   */
  async render() {
    return `
      <section class="container">
        <div class="auth-container">
          <h1 class="page-title">Login</h1>
          <form id="login-form" class="auth-form" autocomplete="on">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" autocomplete="email" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" autocomplete="current-password" required>
            </div>
            <button type="submit" class="button submit-button">Login</button>
          </form>
          <div id="status-container" class="status-container"></div>
          <p class="auth-link">
            Belum punya akun? <a href="#/register" id="register-link">Register</a>
          </p>
          <p class="auth-or">atau login dengan:</p>
          <button id="btn-google" class="button google-button">Login dengan Google</button>
        </div>
      </section>
    `;
  }

  /**
   * Setelah render, kita pasang event listener untuk form submit, register link, dan Google button.
   */
  async afterRender() {
    await handlePageTransition(async () => {
      // Hapus page‐loading jika ada
      const loadingEl = document.querySelector('.page-loading');
      if (loadingEl) loadingEl.remove();

      const loginForm = document.querySelector('#login-form');
      const statusContainer = document.querySelector('#status-container');
      const registerLink = document.querySelector('#register-link');
      const googleButton = document.querySelector('#btn-google');

      // Jika klik "Register" → tampilkan page loading dan ganti rute
      if (registerLink) {
        registerLink.addEventListener('click', async (e) => {
          e.preventDefault();
          document.body.insertAdjacentHTML('beforeend', createPageLoadingTemplate());
          window.location.hash = '#/register';
        });
      }

      // Jika klik tombol Google → langsung redirect ke endpoint Google
      if (googleButton) {
        googleButton.addEventListener('click', (e) => {
          e.preventDefault();
          AuthAPI.loginWithGoogle();
        });
      }

      // Inisialisasi presenter
      const presenter = new LoginPresenter({
        view: {
          showError: (message) => {
            statusContainer.innerHTML = `<div class="status-error"><p>${message}</p></div>`;
            loginForm.querySelector('button[type="submit"]').disabled = false;
          },
          showSuccess: () => {
            statusContainer.innerHTML = `
              <div class="status-success">
                <p>Login berhasil! Mengalihkan...</p>
              </div>
            `;
            loginForm.reset();
            loginForm.querySelector('button[type="submit"]').disabled = true;

            // Beri tahu aplikasi bahwa status auth berubah
            document.dispatchEvent(new Event('authChanged'));

            // Tampilkan page loading sebelum pindah ke home
            document.body.insertAdjacentHTML('beforeend', createPageLoadingTemplate());
            setTimeout(() => {
              window.history.replaceState({}, '', window.location.pathname);
              window.location.hash = '#/'; // asumsikan rute utama (home) adalah "#/"
              window.location.reload();
            }, 1000);
          },
        },
        authAPI: AuthAPI,
        authUtils: { setAuth },
      });

      // Pasang event listener form submit
      if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          const formData = {
            email: document.querySelector('#email').value.trim(),
            password: document.querySelector('#password').value.trim(),
          };
          presenter.login(formData);
        });
      }
    });
  }
}