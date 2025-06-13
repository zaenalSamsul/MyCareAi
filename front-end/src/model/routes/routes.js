// src/main.js

import RegisterPage from './pages/register-page.js';
import LoginPage from './pages/login-page.js'; // jika sudah buat login-page.js
import HomePage from './pages/home-page.js';  // nanti implementasikan

// Elemen outlet SPA
const outlet = document.getElementById('app');
const router = async () => {
  const hash = window.location.hash.slice(1).toLowerCase();
  switch (hash) {
    case 'register':
      outlet.innerHTML = await RegisterPage.prototype.render();
      await RegisterPage.prototype.afterRender();
      break;
    case 'login':
      outlet.innerHTML = await LoginPage.prototype.render();
      await LoginPage.prototype.afterRender();
      break;
    case '':
    case '/':
      outlet.innerHTML = await HomePage.prototype.render();
      await HomePage.prototype.afterRender();
      break;
    default:
      // jika rute tidak dikenali, arahkan ke home
      window.location.hash = '#/';
      break;
  }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);