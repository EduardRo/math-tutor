<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Login</h2>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="credentials.email"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="credentials.password"
            id="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>

      <div class="social-login">
        <button @click="loginWithGoogle" class="social-button google-button">
          Login with Google
        </button>
        <button @click="loginWithFacebook" class="social-button facebook-button">
          Login with Facebook
        </button>
      </div>

      <p class="register-link">
        Don't have an account? <router-link to="/register">Register here</router-link>.
      </p>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/AuthService';

export default {
  name: 'LoginView',
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthService.login(this.credentials);
        localStorage.setItem('token', response.data.token);
        this.$router.push('/');
      } catch (error) {
        alert('Login failed: ' + error.response.data.message);
      }
    },
    async loginWithGoogle() {
      AuthService.redirectToProvider('google');
    },
    async loginWithFacebook() {
      AuthService.redirectToProvider('facebook');
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #000;
  color: #fff;
  padding: 20px;
}

.login-card {
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
}

.login-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #fff;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  color: #ccc;
}

input {
  padding: 0.75rem;
  border: 1px solid #444;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
}

.login-button {
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.social-button {
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.social-button:hover {
  opacity: 0.9;
}

.google-button {
  background-color: #db4437;
  color: #fff;
}

.facebook-button {
  background-color: #1877f2;
  color: #fff;
}

.register-link {
  margin-top: 1.5rem;
  text-align: center;
  color: #ccc;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #0056b3;
}
</style>
