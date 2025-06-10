export default class ChatPageView {
    constructor() {
        this.messageInput = document.getElementById("messageInput");
        this.sendButton = document.getElementById("sendButton");
    }

    // Render tampilan halaman chat
    async render() {
        return `
      <div class="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div class="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <div class="flex items-center space-x-4">
            <button class="p-2 hover:bg-gray-100 rounded-lg transition" onclick="this.goBack()">
              <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <img src="./public/images/Wrapper.png" alt="Logo" class="h-8" />
          </div>
          <div class="flex items-center space-x-3">
            <button class="p-2 hover:bg-gray-100 rounded-lg transition" onclick="this.toggleMusic()">
              <i class="fas fa-music text-gray-600"></i>
            </button>
            <button class="p-2 hover:bg-gray-100 rounded-lg transition" onclick="this.openSettings()">
              <i class="fas fa-cog text-gray-600"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="chat-container flex flex-col">
        <div class="flex-1 flex flex-col justify-center items-center px-6 py-8">
          <div class="text-center max-w-2xl mx-auto mb-8">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">
              Teman Curhat Virtual yang Selalu Ada <span class="gradient-text">24/7</span>
            </h1>
            <p class="text-lg text-gray-600 leading-relaxed">
              Dibuat dengan AI cerdas yang mampu memahami emosi kamu dan kasih solusi yang bikin hati lebih tenang.
            </p>
          </div>
        </div>
        
        <div class="px-6 pb-6">
          <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
              <div class="flex items-end space-x-4">
                <div class="flex-1">
                  <textarea
                    id="messageInput"
                    class="message-input w-full border-0 resize-none focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400"
                    placeholder="Tanya Pertanyaan Mu Disini...."
                    rows="1"
                    onInput="this.autoResize(event)"
                    onKeyDown="this.handleKeyPress(event)"
                  ></textarea>
                </div>
                <button id="sendButton" class="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 flex-shrink-0" onclick="this.sendMessage()" disabled>
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    }

    // Fungsi untuk otomatis mengubah ukuran input
    autoResize(event) {
        event.target.style.height = "auto";
        event.target.style.height = Math.min(event.target.scrollHeight, 200) + "px";
        this.sendButton.disabled = event.target.value.trim() === "";
    }

    // Fungsi untuk menangani penekanan tombol "Enter"
    handleKeyPress(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            this.sendMessage();
        }
    }

    // Fungsi untuk mengirim pesan
    sendMessage() {
        const input = this.messageInput;
        const message = input.value.trim();

        if (message) {
            console.log("Sending message:", message);
            input.value = "";
            input.style.height = "auto";
            this.sendButton.disabled = true;
        }
    }

    // Navigasi ke halaman sebelumnya
    goBack() {
        window.history.back();
    }

    // Menyalakan/mematikan musik
    toggleMusic() {
        console.log("Toggle music");
    }

    // Membuka pengaturan
    openSettings() {
        console.log("Open settings");
    }

    // Fungsi async untuk setelah render
    async afterRender() {
        console.log("ChatPageView: afterRender");

        // Fokuskan input message setelah halaman dirender
        this.messageInput.focus();

        // Mungkin bisa ditambahkan logika lain setelah render, seperti event listeners
        // Misalnya, menambahkan event listener untuk tombol kirim pesan atau fungsi lain
    }
}