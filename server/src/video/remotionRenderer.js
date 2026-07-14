export const remotionRenderer = {
  async buildProject(scenes) {
    return {
      id: `remotion-${Date.now()}`,
      scenes,
      composition: {
        fps: 30,
        width: 1280,
        height: 720,
        durationInFrames: scenes.length * 30 * 5,
      },
    };
  },
};
