import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const composeScenes = (storyboard) => {
  const scenes = (storyboard?.scenes || []).map((scene, index) => ({
    id: `scene-${index + 1}`,
    title: scene.title || `Scene ${index + 1}`,
    bullets: scene.bullets || ['Key insight', 'Supporting details'],
    diagram: scene.diagram || 'flowchart',
    icon: scene.icon || '📘',
    highlights: scene.highlights || ['Important point'],
    transition: scene.transition || 'fade',
    narrationText: scene.content || scene.title || 'Narration placeholder',
    duration: 5,
    slides: [
      {
        title: scene.title || `Scene ${index + 1}`,
        bullets: scene.bullets || ['Key insight', 'Supporting details'],
        diagram: scene.diagram || 'flowchart',
        icon: scene.icon || '📘',
        highlights: scene.highlights || ['Important point'],
        transition: scene.transition || 'fade',
      },
    ],
  }));

  return {
    scenes,
    metadata: {
      fps: 30,
      width: 1280,
      height: 720,
      outputDir: path.join(__dirname, '../../outputs'),
    },
  };
};
