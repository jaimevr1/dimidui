import { QuestionAttempt } from '../attempt-logic.js';

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
    const attemptHandler = new QuestionAttempt(questionConfig);
    questionAttempts.push(attemptHandler);

    container.innerHTML = `
      <div class="m1-bateria-container">
        <p class="question-prompt">${questionConfig.prompt}</p>
        <input type="text" id="answer-input" placeholder="Sua resposta" />
        <button id="submit-answer">Responder</button>
        <p id="feedback-message"></p>
      </div>
    `;

    const answerInput = container.querySelector('#answer-input');
    const submitButton = container.querySelector('#submit-answer');
    const feedbackMessage = container.querySelector('#feedback-message');

    submitButton.onclick = () => {
      const userAnswer = answerInput.value;
      const result = attemptHandler.checkAnswer(userAnswer);

      feedbackMessage.textContent = result.message;
      feedbackMessage.style.color = result.correct ? 'green' : 'red';

      if (result.correct || result.lockQuestion) {
        currentQuestionIndex++;
        setTimeout(renderQuestion, 1500); // Move to next question after a short delay
      }
    };
  };

  renderQuestion();
}