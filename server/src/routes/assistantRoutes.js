import { Router } from 'express';
import { assistantService } from '../assistant/assistantService.js';

const router = Router();

router.post('/chat', async (req, res) => {
  try {
    const { message, filePath } = req.body;
    const result = await assistantService.chat(message, filePath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Assistant failed' });
  }
});

router.post('/quizzes', async (req, res) => {
  try {
    const { filePath } = req.body;
    const result = await assistantService.generateQuizzes(filePath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Quiz generation failed' });
  }
});

router.post('/flashcards', async (req, res) => {
  try {
    const { filePath } = req.body;
    const result = await assistantService.generateFlashcards(filePath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Flashcard generation failed' });
  }
});

router.post('/summarize', async (req, res) => {
  try {
    const { filePath } = req.body;
    const result = await assistantService.summarizeChapter(filePath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Summary failed' });
  }
});

router.post('/mistakes', async (req, res) => {
  try {
    const { filePath, mistake } = req.body;
    const result = await assistantService.explainMistake(filePath, mistake);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Mistake explanation failed' });
  }
});

router.post('/weak-topics', async (req, res) => {
  try {
    const { filePath } = req.body;
    const result = await assistantService.trackWeakTopics(filePath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Weak topics analysis failed' });
  }
});

router.post('/revision', async (req, res) => {
  try {
    const { filePath } = req.body;
    const result = await assistantService.recommendRevision(filePath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Revision recommendation failed' });
  }
});

router.post('/next-session', async (req, res) => {
  try {
    const { filePath } = req.body;
    const result = await assistantService.recommendNextStudySession(filePath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Next session recommendation failed' });
  }
});

router.post('/practice-questions', async (req, res) => {
  try {
    const { filePath } = req.body;
    const result = await assistantService.generatePracticeQuestions(filePath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Practice question generation failed' });
  }
});

router.post('/mock-exam', async (req, res) => {
  try {
    const { filePath } = req.body;
    const result = await assistantService.generateMockExam(filePath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Mock exam generation failed' });
  }
});

export default router;
