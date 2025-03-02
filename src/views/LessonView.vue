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

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import TutorAvatar from '@/components/TutorAvatar/TutorAvatar.vue';
import VideoCapture from '@/components/VideoCapture/VideoCapture.vue';
import axios from 'axios';

interface Problem {
  question: string;
  answer: string;
  explanation: string;
}

interface Lesson {
  id: number;
  title: string;
  math_topic: string;
  difficulty_level: string;
  content: string;
  practice_problems: Problem[];
}

interface AnswerResult {
  correct: boolean;
  message: string;
}

interface AvatarState {
  expression: string;
  animation: string;
  message: string;
}

export default defineComponent({
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
  setup() {
    const lesson = reactive<Lesson>({
      id: 1,
      title: 'Introduction to Algebra',
      math_topic: 'Algebra',
      difficulty_level: 'Beginner',
      content: `<p>Algebra is all about finding the unknown...</p>`,
      practice_problems: [
        { question: 'Solve for x: x + 10 = 25', answer: '15', explanation: 'Subtract 10 from both sides: x = 25 - 10 = 15' },
        { question: 'Solve for y: 3y = 27', answer: '9', explanation: 'Divide both sides by 3: y = 27 ÷ 3 = 9' },
        { question: 'Solve for z: z - 5 = 20', answer: '25', explanation: 'Add 5 to both sides: z = 20 + 5 = 25' }
      ]
    });

    const userAnswers = ref<{ [key: number]: string }>({});
    const answerResults = ref<{ [key: number]: AnswerResult }>({});
    const studentQuestion = ref('');
    const aiResponse = ref('');
    const avatarState = reactive<AvatarState>({
      expression: 'neutral',
      animation: 'idle',
      message: "Hi there! I'm your AI math tutor. Try solving the practice problems or ask me a question if you need help!"
    });
    const studentId = ref(1);

    const checkAnswer = (index: number) => {
      const problem = lesson.practice_problems[index];
      const userAnswer = userAnswers.value[index]?.trim() || '';

      if (!userAnswer) {
        answerResults.value[index] = { correct: false, message: 'Please enter an answer.' };
        return;
      }

      const isCorrect = userAnswer === problem.answer;
      answerResults.value[index] = { correct: isCorrect, message: isCorrect ? 'Correct! Well done.' : `Not quite. ${problem.explanation}` };
    };

    const askQuestion = async () => {
      if (!studentQuestion.value.trim()) return;

      try {
        const response = await axios.post('/api/ai/question', {
          question: studentQuestion.value,
          context: `Lesson: ${lesson.title}, Topic: ${lesson.math_topic}`,
          student_id: studentId.value
        });

        aiResponse.value = response.data.response;
      } catch (error) {
        console.error('Error asking question:', error);
        aiResponse.value = 'Sorry, I encountered an issue processing your question. Please try again.';
      }
    };

    onMounted(() => {
      console.log('Loading lesson', lesson.id);
    });

    return { lesson, userAnswers, answerResults, studentQuestion, aiResponse, avatarState, checkAnswer, askQuestion };
  }
});
</script>

<style scoped>
/* Your styles remain unchanged */
</style>
