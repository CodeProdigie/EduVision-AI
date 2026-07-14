export const contentGenerationService = {
  async generate(payload) {
    return {
      questionAnalysis: {
        difficulty: 'intermediate',
        likelyQuestions: ['What is the central thesis of the paper?', 'How does the evidence support the conclusion?'],
      },
      answerExplanation: {
        overview: 'The paper presents a clear argument supported by evidence.',
        explanation: 'The main takeaway is that the paper connects theory to practical outcomes.',
      },
      studyNotes: {
        title: 'Study Notes',
        bullets: ['Review the core thesis', 'Summarize supporting evidence', 'Connect the findings to real use cases'],
      },
      flashcards: [
        { front: 'Main thesis', back: 'The main argument of the paper.' },
        { front: 'Evidence', back: 'Supporting proof or examples included in the paper.' },
      ],
      quizQuestions: [
        { question: 'What is the main thesis?', options: ['Option A', 'Option B', 'Option C'], correctAnswer: 'Option A' },
      ],
      storyboardJson: {
        scenes: [
          { title: 'Introduction', content: 'Introduce the paper and its thesis.' },
          { title: 'Evidence', content: 'Walk through the supporting evidence.' },
        ],
      },
      voiceScript: {
        narration: 'This paper introduces a central idea and explains its significance.',
      },
      learningObjectives: [
        { objective: 'Understand the paper’s core argument' },
        { objective: 'Identify supporting evidence' },
      ],
    };
  },
};
