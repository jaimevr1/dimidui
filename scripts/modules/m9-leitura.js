import { QuestionAttempt } from '../attempt-logic.js';

class M9QuestionAttempt extends QuestionAttempt {
  constructor(questionConfig) {
    super(questionConfig);
  }

  isCorrect(userAnswer) {
    return userAnswer === this.config.correct;
  }

  getCorrectAnswer() {
    const correctAlternative = this.config.alternatives.find(alt => alt.id === this.config.correct);
    return correctAlternative ? correctAlternative.text : 'N/A';
  }
}

export function render(config, container, onComplete) {
  container.innerHTML = ''; // Clear container

  let currentQuestionIndex = 0;
  const questions = config.questions;
  let questionAttempts = [];

  const renderQuestion = () => {
    if (currentQuestionIndex >= questions.length) {
      onComplete(); // All questions answered
      return;
    }

    const questionConfig = questions[currentQuestionIndex];
    const attemptHandler = new M9QuestionAttempt(questionConfig);
    questionAttempts.push(attemptHandler);

    container.innerHTML = `
      <div class="m9-leitura-container">
        <p class="m9-text">${config.text}</p>
        <p class="question-prompt">${questionConfig.prompt}</p>
        <div id="alternatives-container">
          ${questionConfig.alternatives.map(alt => `
            <button class="alternative-button" data-id="${alt.id}">${alt.text}</button>
          `).join('')}
        </div>
        <p id="feedback-message"></p>
      </div>
    `;

    const alternativesContainer = container.querySelector('#alternatives-container');
    const feedbackMessage = container.querySelector('#feedback-message');

    alternativesContainer.querySelectorAll('.alternative-button').forEach(button => {
      button.onclick = () => {
        const userAnswer = button.dataset.id;
        const result = attemptHandler.checkAnswer(userAnswer);

        feedbackMessage.textContent = result.message;
        feedbackMessage.style.color = result.correct ? 'green' : 'red';

        if (result.correct) {
          button.style.backgroundColor = 'lightgreen';
        } else {
          button.style.backgroundColor = 'lightcoral';
        }

        if (result.correct || result.lockQuestion) {
          // Disable all buttons after answer
          alternativesContainer.querySelectorAll('.alternative-button').forEach(btn => btn.disabled = true);
          currentQuestionIndex++;
          setTimeout(renderQuestion, 1500); // Move to next question after a short delay
        }
      };
    });
  };

  renderQuestion();
}