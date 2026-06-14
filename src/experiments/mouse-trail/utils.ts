export function calculatePerFrameMetrics(frameTimes: number[], frameDuration: number) {
    const averageFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
    const worstFrameTime = Math.max(...frameTimes);
    const jankedFrameCount = frameTimes.filter(time => time > frameDuration).length;

    return { averageFrameTime, jankedFrameCount, worstFrameTime };
}