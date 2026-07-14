import { pipelineService } from '../services/pipelineService.js';

const createBaseContext = async (filePath) => {
  const pipelineResult = await pipelineService.run(filePath);
  return pipelineResult;
};

export const assistantService = {
  async chat(message, filePath) {
    const context = await createBaseContext(filePath);
    return {
      response: `Based on the uploaded paper, I can help with: ${message}. The current pipeline context is ready for deeper AI assistance.`,
      contextSummary: context.output?.studyNotes || { title: 'Study Notes' },
      source: 'pipeline-context',
    };
  },

  async generateQuizzes(filePath) {
    const context = await createBaseContext(filePath);
    return context.output?.quizQuestions || [];
  },

  async generateFlashcards(filePath) {
    const context = await createBaseContext(filePath);
    return context.output?.flashcards || [];
  },

  async summarizeChapter(filePath) {
    const context = await createBaseContext(filePath);
    return context.output?.answerExplanation || { overview: 'No summary available' };
  },

  async explainMistake(filePath, mistake) {
    const context = await createBaseContext(filePath);
    return {
      explanation: `The mistake likely stems from ${mistake}. Review the core concept and supporting evidence from the paper.`,
      context,
    };
  },

  async trackWeakTopics(filePath) {
    const context = await createBaseContext(filePath);
    return {
      weakTopics: context.understanding?.themes || ['Core concept'],
      recommendation: 'Revisit the main idea and supporting evidence before moving forward.',
    };
  },

  async recommendRevision(filePath) {
    const context = await createBaseContext(filePath);
    return {
      revisionPlan: ['Review notes', 'Practice flashcards', 'Answer quiz questions'],
      context,
    };
  },

  async recommendNextStudySession(filePath) {
    const context = await createBaseContext(filePath);
    return {
      nextSession: 'Focus on the most important concept from the paper and test your recall with flashcards.',
      context,
    };
  },

  async generatePracticeQuestions(filePath) {
    const context = await createBaseContext(filePath);
    return context.output?.quizQuestions || [];
  },

  async generateMockExam(filePath) {
    const context = await createBaseContext(filePath);
    return {
      title: 'Mock Exam',
      questions: context.output?.quizQuestions || [],
    };
  },
};
