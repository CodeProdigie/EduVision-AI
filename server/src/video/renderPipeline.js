import { composeScenes } from './sceneComposer.js';
import { narrationService } from './narrationService.js';
import { remotionRenderer } from './remotionRenderer.js';
import { renderService } from './renderService.js';

export const renderPipeline = {
  async run(storyboardJson) {
    const composed = composeScenes(storyboardJson);
    const narrationResults = [];

    for (const scene of composed.scenes) {
      const narration = await narrationService.generateNarration(scene);
      narrationResults.push(narration);
    }

    const project = await remotionRenderer.buildProject(composed.scenes);
    const renderResult = await renderService.render(project);

    return {
      success: true,
      scenes: composed.scenes,
      narration: narrationResults,
      project,
      render: renderResult,
      progress: 100,
      estimatedRenderingTime: renderResult.estimatedRenderingTime,
    };
  },
};
