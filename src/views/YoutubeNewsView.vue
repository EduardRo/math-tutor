<template>
  <div class="container mx-auto p-6 max-w-lg bg-gray-100 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6 text-center text-white">Video to Article Generator</h1>
    
    <div class="flex flex-col space-y-4">
      <input 
        v-model="videoUrl" 
        type="text" 
        placeholder="Enter YouTube or Rumble URL" 
        class="border mt-2 p-4 text-white rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <button 
        @click="processVideo" 
        :disabled="loading"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 my-2 px-4 py-2 rounded-md transition disabled:opacity-50 flex items-center justify-center"
      >
        <span v-if="loading" class="loader"></span>
        <span v-else>Generate Article</span>
      </button>
    </div>

    <div v-if="loading" class="mt-4 text-center text-gray-600">Processing video... Please wait.</div>
    <div v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</div>
    
    <div v-if="article" class="mt-6 p-4 border rounded-md shadow-md bg-white">
      <h2 class="text-lg font-bold mb-2">{{ title }}</h2>
      <p class="mt-2 whitespace-pre-line leading-relaxed">{{ article }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      videoUrl: '',
      article: '',
      title: '',
      loading: false,
      error: ''
    };
  },
  methods: {
    async processVideo() {
      if (!this.videoUrl.trim()) {
        this.error = 'Please enter a valid video URL';
        return;
      }
      
      this.loading = true;
      this.error = '';
      this.article = '';
      this.title = '';

      try {
        const response = await axios.get(`http://127.0.0.1:8000/process_video/`, {
          params: { url: this.videoUrl }
        });

        if (response.data.title && response.data.article) {
          this.title = response.data.title;
          this.article = response.data.article;
        } else {
          this.error = "Unexpected response from server. Try again.";
        }

      } catch (err) {
        this.error = err.response?.data?.detail || 'Failed to process the video. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
.container {
  background-color: #3b285f;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin:10px;
}

/* Loader animation */
.loader {
  
  border: 3px solid #ffffff;
  border-top: 3px solid transparent;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
