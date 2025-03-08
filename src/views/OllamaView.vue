<template>
    <div>
      <h2>Chat with Ollama</h2>
      <textarea v-model="userInput" placeholder="Ask something..."></textarea>
      <button @click="askOllama">Send</button>
      <p><strong>Response:</strong> {{ response }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userInput: '',
        response: '',
      };
    },
    methods: {
      async askOllama() {
        try {
          const res = await axios.post('http://127.0.0.1:8000/api/ollama/chat', {
            prompt: this.userInput,
          });
          this.response = res.data.response; // Adjust based on Ollama's response format
        } catch (error) {
          console.error('Error:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
  }
  </style>
  