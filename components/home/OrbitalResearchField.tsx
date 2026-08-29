"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; radius: number; ring: number };
type Palette = { line: string; accent: string; signal: string; signalAlt: string };

const agents = Array.from({ length: 16 }, (_, index) => ({
  ring: index % 3,
  phase: (index / 16) * Math.PI * 2 + (index % 3) * 0.54,
  speed: (0.000035 + (index % 4) * 0.000006) * (index % 2 ? -1 : 1),
  radius: 1.7 + (index % 3) * 0.45,
}));

function palette(): Palette {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string) => styles.getPropertyValue(name).trim();
  return {
    line: read("--line"),
    accent: read("--accent"),
    signal: read("--signal"),
    signalAlt: read("--signal-alt"),
  };
}

export function OrbitalResearchField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const contextValue = canvasElement.getContext("2d");
    if (!contextValue) return;
    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = contextValue;

    let width = 1;
    let height = 1;
    let colors = palette();
    let frame = 0;
    let lastFrame = 0;
    let visible = true;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

    const orbitSpecs = () => [
      { rx: width * 0.1, ry: height * 0.12, rotation: -0.3 },
      { rx: width * 0.17, ry: height * 0.2, rotation: 0.22 },
      { rx: width * 0.24, ry: height * 0.29, rotation: -0.12 },
    ];

    function points(time: number): Point[] {
      const centerX = width * 0.76;
      const centerY = height * 0.45;
      return agents.map((agent) => {
        const orbit = orbitSpecs()[agent.ring];
        const angle = agent.phase + time * agent.speed;
        const baseX = Math.cos(angle) * orbit.rx;
        const baseY = Math.sin(angle) * orbit.ry;
        return {
          x: centerX + baseX * Math.cos(orbit.rotation) - baseY * Math.sin(orbit.rotation),
          y: centerY + baseX * Math.sin(orbit.rotation) + baseY * Math.cos(orbit.rotation),
          radius: agent.radius,
          ring: agent.ring,
        };
      });
    }

    function drawSatellite(centerX: number, centerY: number, time: number) {
      context.save();
      context.translate(centerX, centerY);
      context.rotate(-0.16 + Math.sin(time * 0.0002) * 0.025);
      context.strokeStyle = colors.accent;
      context.fillStyle = colors.accent;
      context.globalAlpha = 0.86;
      context.lineWidth = 1;
      context.strokeRect(-7, -5, 14, 10);
      context.fillRect(-4, -3, 8, 6);
      context.strokeRect(-28, -7, 18, 14);
      context.strokeRect(10, -7, 18, 14);
      context.beginPath();
      context.moveTo(-10, 0);
      context.lineTo(-7, 0);
      context.moveTo(7, 0);
      context.lineTo(10, 0);
      context.stroke();
      context.restore();
    }

    function render(time: number) {
      context.clearRect(0, 0, width, height);
      const centerX = width * 0.76;
      const centerY = height * 0.45;
      const currentPoints = points(time);

      context.save();
      context.lineWidth = 0.8;
      context.setLineDash([3, 7]);
      orbitSpecs().forEach((orbit, index) => {
        context.save();
        context.translate(centerX, centerY);
        context.rotate(orbit.rotation);
        context.strokeStyle = index === 1 ? colors.signal : colors.line;
        context.globalAlpha = index === 1 ? 0.42 : 0.72;
        context.beginPath();
        context.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
        context.stroke();
        context.restore();
      });
      context.restore();

      context.save();
      context.lineWidth = 0.7;
      for (let first = 0; first < currentPoints.length; first += 1) {
        for (let second = first + 1; second < currentPoints.length; second += 1) {
          const a = currentPoints[first];
          const b = currentPoints[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          const threshold = Math.min(155, width * 0.14);
          if (distance > threshold || Math.abs(a.ring - b.ring) > 1) continue;
          context.strokeStyle = colors.signal;
          context.globalAlpha = (1 - distance / threshold) * 0.38;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
      context.restore();

      currentPoints.forEach((point, index) => {
        const pulse = 0.82 + Math.sin(time * 0.0014 + index) * 0.18;
        context.fillStyle = index % 5 === 0 ? colors.accent : colors.signal;
        context.globalAlpha = 0.15 * pulse;
        context.beginPath();
        context.arc(point.x, point.y, point.radius * 3.4, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 0.92;
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fill();
      });

      for (let index = 0; index < 8; index += 1) {
        const source = currentPoints[(index * 3) % currentPoints.length];
        const target = currentPoints[(index * 3 + 5) % currentPoints.length];
        const progress = (time * (0.00005 + (index % 3) * 0.000008) + index * 0.14) % 1;
        const x = source.x + (target.x - source.x) * progress;
        const y = source.y + (target.y - source.y) * progress;
        context.fillStyle = index % 3 ? colors.signalAlt : colors.accent;
        context.globalAlpha = Math.sin(progress * Math.PI) * 0.72;
        context.beginPath();
        context.arc(x, y, 1.15, 0, Math.PI * 2);
        context.fill();
      }

      drawSatellite(centerX, centerY, time);
    }

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 2);
      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      render(reducedMotion.matches ? 0 : performance.now());
    }

    function animate(time: number) {
      if (visible && time - lastFrame > 32) {
        render(time);
        lastFrame = time;
      }
      frame = requestAnimationFrame(animate);
    }

    function updateMotion() {
      cancelAnimationFrame(frame);
      if (reducedMotion.matches) render(0);
      else frame = requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(() => {
      colors = palette();
      render(reducedMotion.matches ? 0 : performance.now());
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    reducedMotion.addEventListener("change", updateMotion);
    resize();
    updateMotion();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      reducedMotion.removeEventListener("change", updateMotion);
    };
  }, []);

  return <canvas ref={canvasRef} className="orbital-research-field" aria-hidden="true" />;
}
