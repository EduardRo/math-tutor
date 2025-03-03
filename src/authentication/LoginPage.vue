<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
  
      <div class="social-login">
        <p>Or sign in with Google:</p>
        <button @click="handleGoogleLogin" class="social-button">
          
          Sign in with Google
        </button>
      </div>
  
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth'; // Assuming you're using Pinia for state management
  import axios from 'axios'; // Axios for API requests
  
  export default {
    name: 'Login',
    setup() {
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const authStore = useAuthStore();
  
      const handleLogin = async () => {
        try {
          const response = await axios.post('http://your-laravel-app-url/api/login', {
            email: email.value,
            password: password.value,
          });
  
          // Save the access token and user data to the store
          authStore.login(response.data.user, response.data.access_token);
  
          // Redirect to home or another page after login
          window.location.href = '/';
        } catch (error) {
          errorMessage.value = error.response?.data?.message || 'Login failed. Please try again.';
        }
      };
  
      const handleGoogleLogin = async () => {
        try {
          // Redirect to Laravel's Google authentication route
          window.location.href = 'http://your-laravel-app-url/api/login/google';
        } catch (error) {
          errorMessage.value = 'Google login failed. Please try again.';
        }
      };
  
      return {
        email,
        password,
        errorMessage,
        handleLogin,
        handleGoogleLogin,
      };
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
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
    text-align: left;
  }
  
  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .login-button {
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .login-button:hover {
    background-color: #0056b3;
  }
  
  .google-login {
    margin-top: 1.5rem;
  }
  
  .google-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .google-button:hover {
    background-color: #f8f9fa;
  }
  
  .google-logo {
    width: 20px;
    height: 20px;
  }
  
  .error-message {
    color: red;
    margin-top: 1rem;
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
  background-color: rgb(65, 65, 150);
}
  </style>