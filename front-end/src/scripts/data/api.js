import CONFIG from '../config.js';
import { getAuth } from '../utils/auth-api.js';

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/auth/register`,
  LOGIN: `${CONFIG.BASE_URL}/auth/login`,
  GOOGLE_LOGIN: `${CONFIG.BASE_URL}/auth/google`,
  LOGOUT: `${CONFIG.BASE_URL}/auth/logout`,
};

class AuthAPI {
  /**
   * Mendaftarkan user baru dengan nama, email, dan password.
   * @param {{ name: string, email: string, password: string }} param0
   * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
   */
  static async register({ name, email, password }) {
    try {
      const res = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await res.json();
      if (json.error || !res.ok) {
        // Jika server mengembalikan error: true atau status bukan 2xx
        return {
          error: true,
          message: json.message || `Register gagal (status ${res.status})`,
        };
      }

      return { error: false, data: json };
    } catch (err) {
      return { error: true, message: err.message };
    }
  }

  /**
   * Melakukan login dengan email dan password.
   * @param {{ email: string, password: string }} param0
   * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
   */
  static async login({ email, password }) {
    try {
      const res = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (json.error || !res.ok) {
        return {
          error: true,
          message: json.message || `Login gagal (status ${res.status})`,
        };
      }

      return { error: false, data: json };
    } catch (err) {
      return { error: true, message: err.message };
    }
  }

  /**
   * Membuka halaman login Google. 
   */
  static loginWithGoogle() {
    // Mengarahkan browser user ke endpoint Google login
    window.location.href = ENDPOINTS.GOOGLE_LOGIN;
  }

  /**
   * Melakukan logout. 
   * Jika token metode email/password, hanya hapus di FE.
   * Jika ingin memanggil endpoint logout (misalnya untuk Google),
   * gunakan token dari getAuth().
   * @returns {Promise<{ error: boolean, message?: string }>}
   */
  static async logout() {
    try {
      const auth = getAuth();
      // Jika tidak ada token, cukup kembalikan sukses
      if (!auth || !auth.token) {
        return { error: false };
      }

      // Panggil endpoint logout agar server bisa melakukan revoke (jika diperlukan)
      const res = await fetch(ENDPOINTS.LOGOUT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      // Kita abaikan body response; jika error, masih lanjut bersihkan token
      if (!res.ok) {
        console.warn(`Logout endpoint returned ${res.status}`);
      }

      return { error: false };
    } catch (err) {
      // Meski fetch error, kita tetap anggap logout berhasil di FE
      return { error: false };
    }
  }
}

export default AuthAPI;