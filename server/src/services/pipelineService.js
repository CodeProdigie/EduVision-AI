import { ocrService } from './ocrService.js';
import { textExtractionService } from './textExtractionService.js';
import { llmService } from './llmService.js';
import { contentGenerationService } from './contentGenerationService.js';

export const pipelineService = {
  async run(filePath) {
    const ocrResult = await ocrService.extractText(filePath);
    const extractionResult = await textExtractionService.extract(ocrResult.text);
    const understandingResult = await llmService.understand(extractionResult.cleanText);
    const generatedContent = await contentGenerationService.generate({
      ocrResult,
      extractionResult,
      understandingResult,
    });

    return {
      success: true,
      pipeline: 'paper-to-json',
      ocr: ocrResult,
      extraction: extractionResult,
      understanding: understandingResult,
      output: generatedContent,
    };
  },
};
