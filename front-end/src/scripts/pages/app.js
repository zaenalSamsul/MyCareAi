import routes from '../routes/routes.js'; // Mengimpor rute aplikasi
import { getActiveRoute } from '../routes/url-parser.js'; // Mengimpor fungsi untuk mendapatkan rute aktif

export default class App {
  #content = null; // Menyimpan elemen tempat konten akan dimuat

  constructor({ content }) {
    this.#content = content;
  }

  // Fungsi untuk merender halaman berdasarkan rute aktif
  async renderPage() {
    const url = getActiveRoute(); // Mendapatkan rute aktif
    const page = routes[url]; // Mengambil halaman yang sesuai dengan rute

    console.log('Page:', page);

    if (page) {
      this.#content.innerHTML = await page.render(); // Merender halaman yang dipilih
      await page.afterRender(); // Menjalankan logika setelah render
    } else {
      console.error('Halaman tidak ditemukan');
    }
  }
}