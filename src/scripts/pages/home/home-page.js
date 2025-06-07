import { getAuth } from "../../utils/auth-api";

export default class HomePage {
  async render() {
    const user = getAuth();
    return `
            <section class="landing-section">
        <div class="landing-container">
          <div class="landing-text">
            <h1>
              Saat Inovasi Bertemu Empati <br/>
              Bentuk Baru Kesehatan Mental <br/>
              <span class="highlight">Powered By AI</span>
            </h1>
            <p>
              Website kesehatan mental berbasis AI yang mendampingi generasi muda mengenali,
              memahami, dan menangani kondisi emosional secara aman dan personal, dari chat ringan
              hingga konsultasi lanjutan dengan tenaga profesional.
            </p>
          </div>

          <div class="landing-image">
            <img src="./../../../data/img/landing.png" alt="Landing Image">
          </div>
        </div>
      </section>

      <!-- Bagian tombol: jika user ada, tampilkan foto + nama, -->
      <!-- kalau tidak ada (guest), tampilkan tombol Daftar Sekarang -->
      <section class="cta-section">
        <div class="cta-container">
          ${user ? `
            <div class="profile-info">
              <img
                src="${user.photoUrl}"
                alt="Foto ${user.name}"
                class="profile-photo"
              />
              <span class="profile-name">${user.name}</span>
            </div>
          `
        : `
            <button id="btn-daftar" class="btn-daftar">
              Daftar Sekarang
            </button>
          `
      }
        </div>
      </section>

      <!-- grid partner -->
      <section class="partner-section">
        <div class="partner-logo">
          <img src="../../../data/img/4.png" alt="partner 1">
          <img src="../../../data/img/5.png" alt="partner 2">
          <img src="../../../data/img/6.png" alt="partner 3"><br/>
          <img src="../../../data/img/4.png" alt="partner 1">
          <img src="../../../data/img/5.png" alt="partner 2">
          <img src="../../../data/img/6.png" alt="partner 3">
        </div>
      </section>

      <!-- Fitur -->
      <section class="features-section">
        <h2 class="section-title">Dirancang Sepenuhnya untuk Kecerdasan Emosional</h2>
        <p class="features-description">
          MyCare AI menghadirkan intervensi AI paling canggih dan terintegrasi untuk meningkatkan kecerdasan emosional,
          membantu menemukan insight, empati, dan kontrol dalam setiap perjalanan kesehatan mental.
        </p>
        <div class="features-grid">
          <div class="feature-card">
            <h3>Health plans/Insurers</h3>
            <p>Cakupan operasional untuk asuransi kesehatan dan dukungan perusahaan</p>
          </div>
          <div class="feature-card">
            <h3>Health plans/Insurers</h3>
            <p>Kemitraan dengan institutsi untuk membantu memonitor kondisi pengguna</p>
          </div>
          <div class="feature-card">
            <h3>Health plans/Insurers</h3>
            <p>Solusi strategis untuk meningkatkan kesejahteran mental tercapai</p>
          </div>
          <div class="feature-card">
            <h3>Health plans/Insurers</h3>
            <p>Platform integrasi yang mudah dengan sistem asuransi dan klinik</p>
          </div>
        </div>
      </section>

      <!-- Capabilities -->
      <section class="capabilities-section">
        <h2 class="section-title">Kemampuan Kami</h2>
        <div class="capabilities-container">
          <div class="capabilities-text">
            <h3>MyCare Berbasis AI</h3>
            <p>
              Terobosan baru di dunia kesehatan mental yang menggabungkan kecerdasan buatan dengan tenaga ahli.
              Dengan pendekatan AI deep-learning, platform MyCare akan meningkatkan ketepatan diagnosis,
              personalisasi rencana terapi, dan dukungan real-time yang dapat diakses kapan saja.
            </p>
          </div>
          <div class="capabilities-image">
            <img src="../../../../data/img/capabilities.png" alt="Kemampuan AI">
          </div>
        </div>
      </section>

      <!-- Footer Section -->
      <footer class="footer-section">
        <div class="footer-container">
          <div class="footer-brand">
            <img src="../../../data/img/logo.png" alt="MyCare Logo">
            <p>
              One Stop Solution untuk Layanan Kesehatan Emosional dan
              Digital. myCare berkomitmen menyediakan akses mudah dan
              nyaman bagi masyarakat Indonesia untuk menjaga kesehatan
              mental dan emosional. Dengan dukungan AI, myCare
              menghadirkan fitur deteksi emosi otomatis, catatan perasaan
              harian, serta rekomendasi self-care yang personal. Semua
              terintegrasi dalam satu platform.
            </p>
          </div>
          <div class="footer-links">
            <ul>
              <li><a href="#/home">Home</a></li>
              <li><a href="#/pustaka">Pustaka Edukasi</a></li>
              <li><a href="#/catatan">Catatan Emosi</a></li>
              <li><a href="#/curhat">Curhat Sekarang</a></li>
            </ul>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">MyCare 2025</a></li>
              <li><a href="#">Cookies and Policy</a></li>
            </ul>
          </div>
          <div class="footer-social">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; MyCareAI</p>
        </div>
      </footer>
    `;
  }
  async afterRender() {
    const user = getAuth();

    if (!user) {
      const btnDaftar = document.getElementById("btn-daftar");
      if (btnRegister) {
        btnRegister.addEventListener('click', () => {
          window.location.href = '#/login';
        });
      }
    }
  }

  if(user) {
    const profilePhoto = document.getElementById('.profile-photo');
    if (profilePhoto) {
      profilePhoto.addEventListener('click', () => {
        window.location.hash = '/profile';
      });
    }
    document.querySelectorAll('.faq-question').forEach((btn) => {
      btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isOpen = answer.computedStyleMap().get('max-height').value > 0;

        document
          .querySelectorAll('.faq-answer')
          .forEach((el) => (el.style.maxHeight = null));
        document
          .querySelectorAll('.faq-question')
          .forEach((el) => el.classList.remove('open'));

        if (!isOpen) {
          btn.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }
}