import HomePage from './pages/landing/landingPage.js';

const routes = {
    '/': HomePage,
    '/home': HomePage,
};

const renderPage = async () => {
    const main = document.querySelector('#main-content');
    const hash = window.location.hash.slice(1).toLowerCase() || '/';
    const Page = routes[hash] || HomePage;
    const pageInstance = new Page();

    main.innerHTML = await pageInstance.render();
    await pageInstance.afterRender();
};

window.addEventListener('hashchange', renderPage);
window.addEventListener('load', renderPage);
