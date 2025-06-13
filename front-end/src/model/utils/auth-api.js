import CONFIG from "../config.js";

const AuthApi = {
    async register({ name, email, password }) {
        const response = await fetch(`${CONFIG.BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        return response.json();
    },

    async login({ email, password }) {
        const response = await fetch(`$(CONFIG.BASE_URL)/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    },
    async googleLogin(tokenID) {
        const response = await fetch(`${CONFIG.BASE_URL}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: tokenID }),
        });
        return response.json();
    },
    async logout(token) {
        const response = await fetch(`$(CONFIG.BASE_URL)/auth/logout`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.json();
    },
};
export default AuthApi;