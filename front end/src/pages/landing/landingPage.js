export default class landingPage {
    async render() {
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

            <!-- grid partner -->
            <section class="partner-section">
                <div class="partner-logo">
                    <img src="../../../data/img/4.png" alt="partner 1">
                    <img src="../../../data/img/5.png" alt="partner 2">
                    <img src="../../../data/img/6.png" alt="partner 3">
                    <img src="../../../data/img/4.png" alt="partner 1">
                    <img src="../../../data/img/5.png" alt="partner 2">
                    <img src="../../../data/img/6.png" alt="partner 3">
                </div>
            </section>

            <!-- FAQ section -->
            <section class="faq-section">
                <h2 class="section-title">Masih Bingung Tentang MyCare?</h2>
            </section>
        `;
    }
    async afterRender() {

    }
}