import HomePage from '../pages/home/home-page.js';
import LoginPage from '../pages/login/loginPage.js';
import RegisterPage from '../pages/Register/RegisterPage.js';
import ChatPageView from '../pages/chatbot/chat-page.js';
import ArticlePage from '../pages/article/article-page.js';

const routes = {
  '/': HomePage,          // Home Page sebagai halaman pertama
  '/login': LoginPage,    // Halaman Login
  '/register': RegisterPage,  // Halaman Register
  '/chat': ChatPageView,  // Halaman Chatbot
  '/article': ArticlePage,  // Halaman Artikel
};

export default routes;