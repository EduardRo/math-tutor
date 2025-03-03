// frontend/src/components/VideoCapture/VideoCapture.vue
<template>
  <div class="video-capture-container">
    <video ref="video" class="student-video" autoplay muted></video>
    <canvas ref="canvas" class="detection-canvas"></canvas>
    
    <div v-if="debugMode" class="debug-info">
      <p>Attention level: {{ engagementData.attention_level }}</p>
      <p>Emotion detected: {{ engagementData.emotion }}</p>
      <p>Confusion detected: {{ engagementData.confusion_detected ? 'Yes' : 'No' }}</p>
    </div>
  </div>
</template>

<script>
import * as faceapi from 'face-api.js';

export default {
  name: 'VideoCapture',
  props: {
    debugMode: {
      type: Boolean,
      default: false
    },
    captureInterval: {
      type: Number,
      default: 5000 // milliseconds
    }
  },
  data() {
    return {
      stream: null,
      detectionInterval: null,
      modelsLoaded: false,
      engagementData: {
        attention_level: 0,
        emotion: 'neutral',
        confusion_detected: false
      }
    };
  },
  async mounted() {
    await this.loadModels();
    await this.startVideo();
    this.startDetection();
  },
  beforeUnmount() {
    this.stopDetection();
    this.stopVideo();
  },
  methods: {
    async loadModels() {
      try {
        // In a real implementation, you would need to provide the correct path
        // to model files for face-api.js
        const MODEL_URL = '/models';
        
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        
        this.modelsLoaded = true;
        console.log('Face detection models loaded');
      } catch (error) {
        console.error('Error loading face detection models:', error);
      }
    },
    
    async startVideo() {
      try {
        const constraints = {
          video: {
            width: 640,
            height: 480,
            facingMode: 'user'
          }
        };
        
        this.stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.$refs.video.srcObject = this.stream;
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    },
    
    stopVideo() {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
      }
    },
    
    startDetection() {
      if (!this.modelsLoaded) {
        console.warn('Models not loaded yet, cannot start detection');
        return;
      }
      
      this.detectionInterval = setInterval(async () => {
        await this.detectFace();
      }, this.captureInterval);
    },
    
    stopDetection() {
      if (this.detectionInterval) {
        clearInterval(this.detectionInterval);
      }
    },
    
    async detectFace() {
      if (!this.$refs.video || !this.$refs.canvas) return;
      
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);
      
      const detections = await faceapi.detectAllFaces(video, 
        new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      
      // Process detections to determine engagement
      if (detections.length > 0) {
        const detection = detections[0]; // Assume first face is the student
        
        // Process expressions to determine engagement
        const expressions = detection.expressions;
        const dominantExpression = this.getDominantExpression(expressions);
        
        // Update engagement data
        this.engagementData = {
          attention_level: this.calculateAttentionLevel(expressions),
          emotion: dominantExpression,
          confusion_detected: dominantExpression === 'confused' || expressions.confused > 0.5
        };
        
        // Send engagement data to parent component
        this.$emit('engagement-detected', this.engagementData);
        
        // For debugging - draw detections on canvas
        if (this.debugMode) {
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }
      }
    },
    
    getDominantExpression(expressions) {
      let maxValue = 0;
      let dominant = 'neutral';
      
      for (const [expression, value] of Object.entries(expressions)) {
        if (value > maxValue) {
          maxValue = value;
          dominant = expression;
        }
      }
      
      return dominant;
    },
    
    calculateAttentionLevel(expressions) {
      // Simple heuristic for attention level
      // High attention: neutral, happy, surprised
      // Low attention: angry, disgusted, fearful, sad
      
      const positiveAttention = expressions.neutral + expressions.happy + expressions.surprised;
      const negativeAttention = expressions.angry + expressions.disgusted + expressions.fearful + expressions.sad;
      
      // Calculate attention level between 0 and 1
      return Math.min(1, Math.max(0, positiveAttention - negativeAttention + 0.5));
    }
  }
}
</script>

<style scoped>
.video-capture-container {
  position: relative;
  width: 260px;
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
}

.student-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detection-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.debug-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 10px;
  padding: 4px;
}
</style>