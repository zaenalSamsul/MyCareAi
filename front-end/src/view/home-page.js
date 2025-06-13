import { getAuth } from "../../utils/auth-api";

export default class HomePage {
  async render() {
    const landingContent = this.renderLandingSection();
    const ctaContent = this.renderCtaSection();
    const partnerContent = this.renderPartnerSection();
    const faqContent = this.renderFaqSection();
    const featuresContent = this.renderFeaturesSection();
    const footerContent = this.renderFooterSection();

    // Menggabungkan semua konten yang telah di-render
    return `
      <section class="flex flex-col h-screen">
        <!-- Sticky Header -->
        <div class="sticky top-0 z-50 bg-white border border-b border-gray-200">
          <div class="px-16 py-4 flex justify-between items-center">
            <div>
              <img src="./public/images/Wrapper.png" alt="Logo" class="h-10" />
            </div>
            <nav class="flex-1">
              <ul class="flex flex-row justify-center space-x-8 font-medium">
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Pustaka Edukasi</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Catatan Emosi</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Curhat Sekarang</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-700 transition">Tentang</a></li>
              </ul>
            </nav>
            <div>
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>
        
        <!-- Landing Section -->
        ${landingContent}

        <!-- CTA Section -->
        ${ctaContent}

        <!-- Partner Logos Section -->
        ${partnerContent}

        <!-- FAQ Section -->
        ${faqContent}

        <!-- Features Section -->
        ${featuresContent}

        <!-- Footer Section -->
        ${footerContent}
      </section>
    `;
  }

  // Section: Landing
  renderLandingSection() {
    return `
      <div class="flex flex-col lg:flex-row items-center justify-between pl-8 lg:pl-20 py-20 gap-10">
        <div class="flex flex-col lg:w-1/2 w-full space-y-6">
          <h1 class="font-bold text-3xl lg:text-4xl leading-snug">
            Saat Inovasi Bertemu Empati: Bentuk Baru Dukungan Kesehatan Mental
            <span class="text-blue-600 font-bold block mt-2">Powered by AI</span>
          </h1>
          <p class="text-lg lg:text-xl text-gray-700">
            Website kesehatan mental berbasis AI yang mendampingi generasi muda mengenali, memahami, dan menangani kondisi emosional secara aman dan personal, dari chat ringan hingga konsultasi lanjutan dengan tenaga profesional.
          </p>
        </div>
        <div class="lg:w-1/2 w-full h-[300px] lg:h-[410px] flex justify-center">
          <img src="./public/images/background-hero.png" alt="Background Hero" class="h-full w-full object-cover rounded-xl" />
        </div>
      </div>
    `;
  }

  // Section: CTA (Call To Action)
  renderCtaSection() {
    return `
      <div class="w-full flex justify-center items-center py-10">
        <div class="grid grid-cols-4 grid-rows-2 sm:grid-cols-4 gap-x-76 gap-y-20">
          <div class="h-[100px]">
            <img src="./public/images/4.png" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="h-[100px]">
            <img src="./public/images/5.png" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="h-[100px]">
            <img src="./public/images/6.png" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="h-[100px]">
            <img src="./public/images/4.png" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="h-[100px]">
            <img src="./public/images/4.png" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="h-[100px]">
            <img src="./public/images/5.png" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="h-[100px]">
            <img src="./public/images/6.png" alt="" class="w-full h-full object-cover" />
          </div>
          <div class="h-[100px]">
            <img src="./public/images/4.png" alt="" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    `;
  }

  // Section: FAQ
  renderFaqSection() {
    return `
      <div class="flex flex-col items-center px-4 py-10 text-[20px] font-semibold bg-[#F2F2F2] mx-20">
        <h2 class="text-center mb-5">Masih Bingung Tentang MyCare?</h2>
        <div class="flex flex-col lg:flex-row w-full gap-10 items-start justify-center">
          <div class="w-1/2 flex justify-center">
            <img src="./public/images/Image (2).png" alt="FAQ Image" class="w-full object-contain" />
          </div>
          <div class="w-full lg:w-1/2 space-y-4" id="accordion">
            <div class="border border-gray-200 rounded-lg overflow-hidden">
              <button type="button" class="accordion-button flex items-center justify-between w-full p-4 font-medium text-left text-gray-900 bg-white hover:bg-gray-100" onclick="toggleAccordion(this)">
                <span>Apa itu MyCare?</span>
                <i class="fas fa-chevron-down transition-transform"></i>
              </button>
              <div class="accordion-content hidden p-4 bg-white text-gray-400 text-[16px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
              </div>
            </div>
            <!-- Add more FAQ items as needed -->
          </div>
        </div>
      </div>
    `;
  }

  // Section: Features
  renderFeaturesSection() {
    return `
      <div class="mt-20 px-6 md:px-20 pb-20">
        <div class="flex flex-col items-center text-center w-full max-w-4xl mx-auto space-y-4 mb-12">
          <h1 class="font-bold text-3xl md:text-4xl">Dirancang Sepenuhnya untuk Kecerdasan Emosional.</h1>
          <span class="text-base md:text-lg font-semibold text-gray-700">
            myCare menghadirkan infrastruktur AI paling canggih dan fleksibel untuk layanan kesehatan emosional, membantu meningkatkan akurasi, empati, dan kontrol dalam setiap fitur yang kamu gunakan.
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <!-- Add feature cards here -->
        </div>
      </div>
    `;
  }

  // Section: Footer
  renderFooterSection() {
    return `
      <footer class="bg-blue-700 text-white py-16">
        <div class="container mx-auto px-6 md:px-20">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div class="space-y-6">
              <div class="flex items-center">
                <img src="./public/images/Wrapper.png" alt="MyCare Logo" class="h-10 bg-white p-1 rounded" />
                <span class="ml-3 text-xl font-bold">MyCare AI</span>
              </div>
              <p class="text-gray-200 text-sm leading-relaxed">
                One Stop Solution untuk Layanan Kesehatan Emosional...
              </p>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-6">Hubungi Kami</h3>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <i class="fas fa-map-marker-alt mt-1 mr-3 text-blue-300"></i>
                  <span>Alamat lengkap</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-phone-alt mt-1 mr-3 text-blue-300"></i>
                  <span>+62 812-3456-7890</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-envelope mt-1 mr-3 text-blue-300"></i>
                  <span>info@mycare.ai</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-clock mt-1 mr-3 text-blue-300"></i>
                  <span>Senin - Jumat: 08.00 - 17.00 WIB</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  // Setelah render, lakukan aksi tambahan jika diperlukan (misalnya menambahkan event listener)
  async afterRender() {
    // Membuat ikon menggunakan lucide
    lucide.createIcons();

    // Menambahkan event listener untuk toggle accordion
    document.addEventListener("DOMContentLoaded", function () {
      const accordionButtons = document.querySelectorAll(".accordion-button");

      accordionButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const content = this.nextElementSibling;
          const icon = this.querySelector(".fa-chevron-down");

          // Toggle current item
          content.classList.toggle("hidden");
          icon.classList.toggle("rotate-180");

          // Update aria-expanded attribute
          const isExpanded = content.classList.contains("hidden") ? "false" : "true";
          this.setAttribute("aria-expanded", isExpanded);
        });
      });
    });
  }
}