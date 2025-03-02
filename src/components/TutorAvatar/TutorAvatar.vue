// frontend/src/components/TutorAvatar/TutorAvatar.vue
<template>
  <div class="tutor-avatar-container">
    <div class="avatar-animation" :class="currentAnimation">
      <div class="avatar-face" :class="currentExpression">
        <img :src="getAvatarImage()" alt="AI Tutor" class="avatar-image" />
      </div>
    </div>
    
    <div v-if="avatarMessage" class="avatar-message">
      <p>{{ avatarMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TutorAvatar',
  props: {
    expression: {
      type: String,
      default: 'neutral'
    },
    animation: {
      type: String,
      default: 'idle'
    },
    message: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentExpression() {
      return `expression-${this.expression}`;
    },
    currentAnimation() {
      return `animation-${this.animation}`;
    },
    avatarMessage() {
      return this.message;
    }
  },
  methods: {
    getAvatarImage() {
      // In a real implementation, you would have different images
      // for different expressions or use a more sophisticated
      // animation system
      return `/avatars/${this.expression}.png`;
    }
  }
}
</script>

<style scoped>
.tutor-avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-animation {
  width: 200px;
  height: 200px;
  position: relative;
}

.avatar-face {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #4299e1;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-message {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background-color: #ebf8ff;
  border-radius: 1rem;
  border-top-left-radius: 0;
  max-width: 80%;
}

/* Animation classes */
.animation-nod {
  animation: nod 2s ease;
}

.animation-hand_gesture {
  animation: handGesture 3s ease;
}

.animation-lean_forward {
  animation: leanForward 2s ease;
}

/* Define animations */
@keyframes nod {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

@keyframes handGesture {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes leanForward {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
</style>