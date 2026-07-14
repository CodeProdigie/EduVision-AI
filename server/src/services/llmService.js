export const llmService = {
  async understand(text) {
    return {
      success: true,
      summary: `The paper discusses ${text.slice(0, 120)}...`,
      themes: ['Core concept', 'Key evidence', 'Practical application'],
      keyPoints: ['Main argument', 'Supporting evidence', 'Takeaway'],
    };
  },
};
