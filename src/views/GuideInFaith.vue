<template>
  <div class="ask-advice">
    <img :src="logo" alt="Spiritual Logo" class="logo" />

    <h1>Ask for Spiritual Advice</h1>
    <textarea
      v-model="prompt"
      placeholder="What's troubling you?"
      class="question-text"
    ></textarea>
    <div class="button-container">
      <button @click="submitPrompt" :disabled="loading">Ask</button>
    </div>
    <div class="donation-message">
      <p>
        We're a small passionate team working hard to keep this spiritual app
        alive and growing. 🙏
      </p>
      <p>
        If you find it helpful, consider supporting us with a small donation.
      </p>
      <p>
        Every bit counts and helps us continue improving the experience. Thank
        you! GOD BLESSED
      </p>
    </div>

    <div class="donation-buttons">
      <button @click="donate(5)">$5</button>
      <button @click="donate(10)">$10</button>
      <button @click="donate(25)">$25</button>
      <button @click="donate(50)">$50</button>
    </div>
    <div>
      <TestimonialCarousel />
      <!-- Carousel items -->
    </div>
    <div v-if="loading">Thinking...</div>

    <div v-if="response" class="response">
      <h2>Response:</h2>
      <div v-html="formattedResponse" class="formatted-response" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import logo from "@/assets/logo.png"; // This now correctly points to the file
import TestimonialCarousel from "@/components/TestimonialCarousel.vue";
const prompt = ref("");
const response = ref("");
const loading = ref(false);
const donate = (amount) => {
  alert(
    `Thank you for considering a $${amount} donation! ❤️ (Functionality coming soon)`
  );
};
const submitPrompt = async () => {
  if (!prompt.value.trim()) return;

  loading.value = true;
  response.value = "";

  try {
    const res = await axios.post(
      "http://localhost:8000/api/ask",
      {
        prompt: prompt.value,
      },
      {
        timeout: 100000,
      }
    );

    response.value = res.data.response;
  } catch (err) {
    console.error("Axios error:", err);
    if (err.response) console.error("Server response:", err.response);
    response.value = "Error talking to the AI.";
  }

  loading.value = false;
};

// Clean up line breaks and highlight verses
const formattedResponse = computed(() => {
  if (!response.value) return "";

  const lines = response.value.split("\n").filter((line) => line.trim() !== "");

  return lines
    .map((line) => {
      // Highlight verse references like "John 3:16"
      const withVerseHighlight = line.replace(
        /\*([^\*]+)\*/g,
        "<strong>$1</strong>"
      );

      return `<p>${withVerseHighlight}</p>`;
    })
    .join("");
});
</script>

<style scoped>
.ask-advice {
  background-color: black;
  color: rgb(216, 189, 34);
  min-height: 50vh;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  max-width: 150px;
  margin-bottom: 1rem;
}

textarea {
  width: 100%;
  max-width: 600px;
  height: 120px;
  padding: 1rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  border: 2px solid #1fc91f;
  border-radius: 8px;
  background-color: #222;
  color: rgb(253, 215, 0);
  resize: vertical;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

button {
  font-size: 1.2rem;
  padding: 0.75rem 2rem;
  background-color: gold;
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading {
  margin-top: 1rem;
  font-style: italic;
}

.response {
  margin-top: 2rem;
  max-width: 700px;
  background-color: #111;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgb(104, 94, 38);
}
.question-text {
  color: #25c725; /* bright green, change as needed */
  font-weight: bold;
}
.donation-message {
  margin-top: 20px;
  font-size: 1rem;
  color: gold;
  text-align: center;
}

.donation-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.donation-buttons button {
  background-color: black;
  border: 2px solid #00ff00;
  color: #00ff00;
  padding: 10px 16px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 6px;
  transition: transform 0.2s ease, background-color 0.3s ease;
}
</style>
