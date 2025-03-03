<template>
    <div class="register-container">
      <div class="register-card">
        <h2 class="register-title">Register</h2>
        <form @submit.prevent="register" class="register-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              v-model="userData.name"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="userData.email"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="userData.password"
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input
              v-model="userData.password_confirmation"
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" class="register-button">Register</button>
        </form>
        <p class="login-link">
          Already have an account? <router-link to="/login">Login here</router-link>.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import AuthService from '../services/AuthService';
  
  export default {
    name: 'Register',
    data() {
      return {
        userData: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        },
      };
    },
    methods: {
      async register() {
        try {
          await AuthService.register(this.userData);
          alert('Registration successful!');
          this.$router.push('/login');
        } catch (error) {
          alert('Registration failed: ' + error.response.data.message);
        }
      },
    },
  };
  </script>
  
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #000;
    color: #fff;
    padding: 20px;
  }
  
  .register-card {
    background-color: #1a1a1a;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 400px;
  }
  
  .register-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #fff;
  }
  
  .register-form {
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
  
  .register-button {
    padding: 0.75rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .register-button:hover {
    background-color: #0056b3;
  }
  
  .login-link {
    margin-top: 1rem;
    text-align: center;
    color: #ccc;
  }
  
  .login-link a {
    color: #007bff;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .login-link a:hover {
    color: #0056b3;
  }
  </style>
  