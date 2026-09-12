export function getOvalKeyframes(
  startAngleDeg: number,
  rx: number,
  ry: number,
): { x: number[]; y: number[] } {
  const steps = 48;
  const x: number[] = [];
  const y: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const angle = ((startAngleDeg + (i * 360) / steps) * Math.PI) / 180;
    x.push(Math.round(Math.cos(angle) * rx * 10) / 10);
    y.push(Math.round(Math.sin(angle) * ry * 10) / 10);
  }
  return { x, y };
}
