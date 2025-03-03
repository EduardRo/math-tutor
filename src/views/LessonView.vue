// frontend/src/views/LessonView.vue
<template>
  <div class="lesson-container">
    <div class="lesson-header">
      <h1>{{ lesson.title }}</h1>
      <p class="lesson-topic">{{ lesson.math_topic }} - {{ lesson.difficulty_level }}</p>
    </div>
    
    <div class="lesson-content-wrapper">
      <div class="lesson-content">
        <div class="lesson-explanation" v-html="lesson.content"></div>
        
        <div class="practice-problems">
          <h2>Practice Problems</h2>
          
          <div v-for="(problem, index) in lesson.practice_problems" :key="index" class="problem-item">
            <div class="problem-question">{{ problem.question }}</div>
            
            <div class="problem-input">
              <input 
                v-model="userAnswers[index]" 
                type="text" 
                placeholder="Your answer..."
                @keyup.enter="checkAnswer(index)"
                class="answer-input"
              />
              <button @click="checkAnswer(index)" class="check-button">Check</button>
            </div>
            
            <div v-if="answerResults[index]" class="answer-feedback" :class="answerResults[index].correct ? 'correct' : 'incorrect'">
              {{ answerResults[index].message }}
            </div>
          </div>
        </div>
        
        <div class="ask-tutor">
          <h3>Ask the AI Tutor</h3>
          <textarea 
            v-model="studentQuestion" 
            placeholder="Ask a question about this lesson..."
            class="question-input"
          ></textarea>
          <button @click="askQuestion" class="ask-button">Ask Question</button>
          
          <div v-if="aiResponse" class="ai-response">
            <p>{{ aiResponse }}</p>
          </div>
        </div>
      </div>
      
      <div class="tutor-sidebar">
        <TutorAvatar 
          :expression="avatarState.expression"
          :animation="avatarState.animation"
          :message="avatarState.message"
        />
        
        <VideoCapture 
          :debug-mode="true"
          @engagement-detected="handleEngagementDetection"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TutorAvatar from '@/components/TutorAvatar/TutorAvatar.vue';
import VideoCapture from '@/components/VideoCapture/VideoCapture.vue';
import axios from 'axios';

export default {
  name: 'LessonView',
  components: {
    TutorAvatar,
    VideoCapture
  },
  props: {
    lessonId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      lesson: {
        id: 1,
        title: 'Introduction to Algebra',
        math_topic: 'Algebra',
        difficulty_level: 'Beginner',
        content: `<p>Algebra is all about finding the unknown. We use letters like x, y, or z to represent values we don't know yet.</p>
                  <p>For example, in the equation <strong>x + 5 = 12</strong>, we need to find what value of x makes this equation true.</p>
                  <p>To solve this, we isolate x by subtracting 5 from both sides:</p>
                  <p>x + 5 - 5 = 12 - 5</p>
                  <p>x = 7</p>
                  <p>So the value of x that makes the equation true is 7.</p>`,
        practice_problems: [
          {
            question: 'Solve for x: x + 10 = 25',
            answer: '15',
            explanation: 'To solve x + 10 = 25, subtract 10 from both sides: x = 25 - 10 = 15'
          },
          {
            question: 'Solve for y: 3y = 27',
            answer: '9',
            explanation: 'To solve 3y = 27, divide both sides by 3: y = 27 ÷ 3 = 9'
          },
          {
            question: 'Solve for z: z - 5 = 20',
            answer: '25',
            explanation: 'To solve z - 5 = 20, add 5 to both sides: z = 20 + 5 = 25'
          }
        ]
      },
      userAnswers: {},
      answerResults: {},
      studentQuestion: '',
      aiResponse: '',
      avatarState: {
        expression: 'neutral',
        animation: 'idle',
        message: 'Hi there! I\'m your AI math tutor. Try solving the practice problems or ask me a question if you need help!'
      },
      studentId: 1 // This would normally come from authentication
    };
  },
  mounted() {
    this.loadLesson();
  },
  methods: {
    loadLesson() {
      // In a real app, this would fetch lesson data from the API
      // For now, we're using mock data defined above
      console.log('Loading lesson', this.lessonId);
      
      // Simulate API call delay
      setTimeout(() => {
        // In a real app, this would update the lesson object from API response
        console.log('Lesson loaded');
      }, 500);
    },
    
    checkAnswer(index) {
      const problem = this.lesson.practice_problems[index];
      const userAnswer = this.userAnswers[index];
      
      if (!userAnswer) {
        this.answerResults[index] = {
          correct: false,
          message: 'Please enter an answer.'
        };
        return;
      }
      
      // Simple string comparison - in a real app, you'd want more sophisticated answer checking
      const isCorrect = userAnswer.trim() === problem.answer.trim();
      
      this.answerResults[index] = {
        correct: isCorrect,
        message: isCorrect 
          ? 'Correct! Well done.' 
          : `Not quite. ${problem.explanation}`
      };
      
      // Update avatar based on result
      if (isCorrect) {
        this.updateAvatar('pleased', 'nod', 'Great job! That\'s correct!');
      } else {
        this.updateAvatar('supportive', 'lean_forward', problem.explanation);
      }
      
      // In a real app, you would also send this result to the backend to track progress
    },
    
    async askQuestion() {
      if (!this.studentQuestion.trim()) return;
      
      try {
        // Update avatar to show "thinking" state
        this.updateAvatar('neutral', 'idle', 'Let me think about that...');
        
        // In a real app, this would call your backend API
        // For now, we'll simulate it
        
        // Determine if this is a complex question (in a real app, you'd have better heuristics)
        const isComplex = this.studentQuestion.length > 50;
        
        const response = await axios.post('/api/ai/question', {
          question: this.studentQuestion,
          context: `Lesson: ${this.lesson.title}, Topic: ${this.lesson.math_topic}`,
          complexity: isComplex ? 'complex' : 'simple',
          student_id: this.studentId
        });
        
        this.aiResponse = response.data.response;
        
        // Update avatar based on response
        this.updateAvatar('pleased', 'hand_gesture', 'Does that help answer your question?');
        
      } catch (error) {
        console.error('Error asking question:', error);
        this.aiResponse = 'Sorry, I encountered an issue processing your question. Please try again.';
        this.updateAvatar('concerned', 'idle', 'I seem to be having some trouble. Let me try again.');
      }
    },
    
    async handleEngagementDetection(engagementData) {
      // Process the student's engagement data from the webcam
      console.log('Engagement detected:', engagementData);
      
      try {
        // In a real app, send this data to your backend
        const response = await axios.post('/api/ai/engagement', {
          student_id: this.studentId,
          lesson_id: this.lesson.id,
          image_data: 'base64_image_data_would_go_here', // In a real app, this would be actual image data
          engagement_data: engagementData
        });
        
        // If student appears confused or has low attention, get avatar reaction
        if (engagementData.confusion_detected || engagementData.attention_level < 0.4) {
          const reactionResponse = await axios.post('/api/ai/avatar-reaction', {
            student_id: this.studentId,
            lesson_id: this.lesson.id,
            engagement_data: engagementData
          });
          
          // Update avatar based on AI recommendation
          this.updateAvatar(
            reactionResponse.data.expression,
            reactionResponse.data.animation,
            reactionResponse.data.message
          );
        }
      } catch (error) {
        console.error('Error processing engagement:', error);
      }
    },
    
    updateAvatar(expression, animation, message) {
      this.avatarState = {
        expression,
        animation,
        message
      };
    }
  }
}
</script>

<style scoped>
.lesson-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.lesson-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
}

.lesson-topic {
  color: #4a5568;
  font-size: 1.1rem;
}

.lesson-content-wrapper {
  display: flex;
  gap: 2rem;
}

.lesson-content {
  flex: 1;
}

.tutor-sidebar {
  width: 300px;
  position: sticky;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #f7fafc;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.lesson-explanation {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.practice-problems {
  margin-bottom: 2rem;
}

.problem-item {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: #265c92;
}

.problem-question {
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.problem-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.answer-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
}

.check-button {
  padding: 0.5rem 1rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.check-button:hover {
  background-color: #3182ce;
}

.answer-feedback {
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.answer-feedback.correct {
  background-color: #c6f6d5;
  color: #22543d;
}

.answer-feedback.incorrect {
  background-color: #fed7d7;
  color: #822727;
}

.ask-tutor {
  margin-top: 2rem;
}

.question-input {
  width: 100%;
  height: 100px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
  resize: vertical;
}

.ask-button {
  padding: 0.75rem 1.5rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.ask-button:hover {
  background-color: #3182ce;
}

.ai-response {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #ebf8ff;
  border-radius: 0.5rem;
  border-left: 4px solid #4299e1;
}
</style>