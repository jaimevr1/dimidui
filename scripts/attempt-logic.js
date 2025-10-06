export class QuestionAttempt {
  constructor(questionConfig) {
    this.config = questionConfig;
    this.attempts = 0;
    this.maxAttempts = 3;
  }

  checkAnswer(userAnswer) {
    this.attempts++;
    const correct = this.isCorrect(userAnswer);

    if (correct) {
      return { correct: true, message: "✅ Correto!" };
    }

    if (this.attempts === 1) {
      return { correct: false, message: "❌ Tente outra vez" };
    }

    if (this.attempts === 2) {
      return {
        correct: false,
        message: "💡 Dica: " + this.config.hint,
        showHint: true
      };
    }

    if (this.attempts === 3) {
      return {
        correct: false,
        message: `A resposta correta era: ${this.getCorrectAnswer()}`,
        showCorrect: true,
        lockQuestion: true
      };
    }
    // Should not reach here if maxAttempts is 3
    return { correct: false, message: "Erro inesperado." };
  }

  isCorrect(userAnswer) {
    // This method needs to be overridden by specific module implementations
    // For now, a basic string comparison
    return String(userAnswer).trim().toLowerCase() === String(this.config.answer).trim().toLowerCase();
  }

  getCorrectAnswer() {
    return this.config.answer;
  }
}