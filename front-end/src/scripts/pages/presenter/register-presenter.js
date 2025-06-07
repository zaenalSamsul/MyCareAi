// src/pages/register-presenter.js

export default class RegisterPresenter {
    /**
     * @param {object} params
     * @param {object} params.view      – objek dengan method showLoading, showError, showSuccess
     * @param {object} params.authAPI   – referensi ke AuthAPI (Model)
     * @param {object} params.authUtils – referensi berisi { setAuth }
     */
    constructor({ view, authAPI, authUtils }) {
        this._view = view;
        this._authAPI = authAPI;
        this._setAuth = authUtils.setAuth;
    }

    /**
     * @param {{ username: string, email: string, password: string, confirmPassword: string }} formData
     */
    async register(formData) {
        this._view.showLoading();

        // Validasi sederhana: password dan confirmPassword harus sama
        if (formData.password !== formData.confirmPassword) {
            this._view.showError('Kata sandi dan konfirmasi tidak cocok.');
            return;
        }

        // Panggil Model untuk register
        const { error, data, message } = await this._authAPI.register({
            name: formData.username,
            email: formData.email,
            password: formData.password,
        });

        if (error) {
            this._view.showError(message || 'Registrasi gagal.');
            return;
        }

        // Jika berhasil, simpan token + data user, lalu tampilkan sukses di View
        // Asumsi respon data: { token: '...', user: { name, email, photoUrl? } }
        this._setAuth({ token: data.token, user: data.user });
        this._view.showSuccess();
    }
}