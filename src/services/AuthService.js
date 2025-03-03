import apiClient from '../api';

export default {
    // Register a new user
    async register(userData) {
        return apiClient.post('/register', userData);
    },

    // Login and get a token
    async login(credentials) {
        return apiClient.post('/login', credentials);
    },

    // Logout and revoke the token
    async logout() {
        return apiClient.post('/logout');
    },

    // Fetch the authenticated user
    async getUser() {
        return apiClient.get('/user');
    },

    // Redirect to OAuth2 provider
    redirectToProvider(provider) {
        window.location.href = `http://127.0.0.1:8000/api/auth/${provider}`;
    },

    // Handle OAuth2 callback
    async handleProviderCallback(provider) {
        const response = await apiClient.get(`/auth/${provider}/callback`);
        return response.data.token;
    },
};
