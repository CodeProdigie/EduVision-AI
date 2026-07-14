export const textExtractionService = {
  async extract(text) {
    return {
      success: true,
      cleanText: text.replace(/\s+/g, ' ').trim(),
      wordCount: text.split(/\s+/).filter(Boolean).length,
      sections: [
        { title: 'Summary', content: text.slice(0, 240) },
      ],
    };
  },
};
