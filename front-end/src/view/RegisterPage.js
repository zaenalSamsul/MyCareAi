// src/pages/register-page.js

import AuthAPI from '../../data/api.js';
import { setAuth } from '../../utils/auth-api.js';
import RegisterPresenter from '../presenter/register-presenter.js';
import {
  createLoadingTemplate,
  createErrorTemplate,
  createPageLoadingTemplate,
  handlePageTransition,
} from '../utils/index.js';

export default class RegisterPage {
  /**
   * Kembalikan HTML halaman register (form + status + tombol navigasi).
   * @returns {string}
   */
  async render() {
    return `
      <section class="container">
        <div class="auth-container">
          <h1 class="page-title">Daftar</h1>
          <form id="register-form" class="auth-form" autocomplete="on">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" autocomplete="email" required>
            </div>
            <div class="form-group">
              <label for="password">Kata Sandi</label>
              <input type="password" id="password" name="password" autocomplete="new-password" required>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Konfirmasi Kata Sandi</label>
              <input type="password" id="confirmPassword" name="confirmPassword" autocomplete="new-password" required>
            </div>
            <button type="submit" class="button submit-button">Daftar</button>
          </form>
          <div id="status-container" class="status-container"></div>
          <p class="auth-link">
            Sudah punya akun? <a href="#/login" id="login-link">Masuk</a>
          </p>
          <p class="auth-or">atau daftar dengan:</p>
          <button id="btn-google" class="button google-button">Daftar dengan Google</button>
        </div>
      </section>
    `;
  }

  /**
   * Setelah render(), pasang event listener untuk:
   * - Klik "Masuk" → navigasi ke #/login
   * - Klik "Daftar dengan Google" → AuthAPI.loginWithGoogle()
   * - Submit form register → panggil presenter.register()
   */
  async afterRender() {
    await handlePageTransition(async () => {
      // Hapus elemen .page-loading jika ada
      const loadingEl = document.querySelector('.page-loading');
      if (loadingEl) loadingEl.remove();

      const registerForm = document.querySelector('#register-form');
      const statusContainer = document.querySelector('#status-container');
      const loginLink = document.querySelector('#login-link');
      const googleButton = document.querySelector('#btn-google');

      // Navigasi ke login jika link "Masuk" diklik
      if (loginLink) {
        loginLink.addEventListener('click', async (e) => {
          e.preventDefault();
          document.body.insertAdjacentHTML('beforeend', createPageLoadingTemplate());
          window.location.hash = '#/login';
        });
      }

      // Jika tombol "Daftar dengan Google" diklik → redirect
      if (googleButton) {
        googleButton.addEventListener('click', (e) => {
          e.preventDefault();
          AuthAPI.loginWithGoogle();
        });
      }

      // Inisialisasi presenter
      const presenter = new RegisterPresenter({
        view: {
          showLoading: () => {
            statusContainer.innerHTML = createLoadingTemplate('Memproses...');
            registerForm.querySelector('button[type="submit"]').disabled = true;
          },
          showError: (message) => {
            statusContainer.innerHTML = createErrorTemplate(message);
            registerForm.querySelector('button[type="submit"]').disabled = false;
          },
          showSuccess: () => {
            statusContainer.innerHTML = `
              <div class="status-success">
                <p>Registrasi berhasil! Mengalihkan...</p>
              </div>
            `;
            registerForm.reset();
            registerForm.querySelector('button[type="submit"]').disabled = true;

            // Event global agar aplikasi tahu user sudah ter‐auth
            document.dispatchEvent(new Event('authChanged'));

            // Tampilkan page loading sebelum pindah ke home
            document.body.insertAdjacentHTML('beforeend', createPageLoadingTemplate());
            setTimeout(() => {
              window.history.replaceState({}, '', window.location.pathname);
              window.location.hash = '#/'; // asumsikan rute home adalah "#/"
              window.location.reload();
            }, 1000);
          },
        },
        authAPI: AuthAPI,
        authUtils: { setAuth },
      });

      // Pasang listener form submit
      if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const formData = {
            username: document.querySelector('#username').value.trim(),
            email: document.querySelector('#email').value.trim(),
            password: document.querySelector('#password').value.trim(),
            confirmPassword: document.querySelector('#confirmPassword').value.trim(),
          };
          presenter.register(formData);
        });
      }
    });
  }
}