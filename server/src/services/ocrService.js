import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ocrService = {
  async extractText(filePath) {
    const fileName = path.basename(filePath);
    const text = `OCR placeholder for ${fileName}. This pipeline is modular and ready for a real OCR engine. `;
    return {
      success: true,
      text,
      language: 'en',
      confidence: 0.85,
    };
  },
};
