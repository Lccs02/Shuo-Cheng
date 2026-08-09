"use client";

import { useEffect, useRef } from "react";

type Palette = {
  ink: string;
  muted: string;
  line: string;
  accent: string;
  signal: string;
  signalAlt: string;
};

type AgentSpec = {
  orbit: number;
  offset: number;
  speed: number;
  size: number;
};

type Point = {
  x: number;
  y: number;
  size: number;
  orbit: number;
};

const agentSpecs: AgentSpec[] = Array.from({ length: 18 }, (_, index) => ({
  orbit: index % 3,
  offset: (index / 18) * Math.PI * 2 + (index % 3) * 0.62,
  speed: (0.000025 + (index % 4) * 0.000004) * (index % 2 === 0 ? 1 : -1),
  size: 1.9 + (index % 3) * 0.55,
}));

function readPalette(): Palette {
  const styles = getComputedStyle(document.documentElement);
  const value = (name: string) => styles.getPropertyValue(name).trim();
  return {
    ink: value("--ink"),
    muted: value("--muted"),
    line: value("--line"),
    accent: value("--accent"),
    signal: value("--signal"),
    signalAlt: value("--signal-alt"),
  };
}

function rotatePoint(x: number, y: number, angle: number) {
  return {
    x: x * Math.cos(angle) - y * Math.sin(angle),
    y: x * Math.sin(angle) + y * Math.cos(angle),
  };
}

export function OrbitalAgentField() {
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
    let palette = readPalette();
    let animationFrame = 0;
    let lastFrame = 0;
    let visible = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const orbitData = () => [
      { rx: width * 0.12, ry: height * 0.115, rotation: -0.28 },
      { rx: width * 0.185, ry: height * 0.18, rotation: 0.24 },
      { rx: width * 0.25, ry: height * 0.255, rotation: -0.12 },
    ];

    function drawDotField(time: number) {
      const columns = Math.max(28, Math.round(width / 32));
      const rows = 11;
      context.save();
      context.fillStyle = palette.signal;
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const progress = column / Math.max(columns - 1, 1);
          const wave = Math.sin(progress * Math.PI * 3.2 + row * 0.42 + time * 0.00008);
          const x = width * (0.43 + progress * 0.62);
          const y = height * (0.57 + row * 0.035 + wave * 0.018);
          const envelope = Math.sin(progress * Math.PI);
          const radius = 0.55 + envelope * (1.2 + (row % 3) * 0.18);
          context.globalAlpha = 0.08 + envelope * 0.18;
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.restore();
    }

    function getAgentPoints(time: number): Point[] {
      const centerX = width * 0.77;
      const centerY = height * 0.43;
      const orbits = orbitData();
      return agentSpecs.map((agent) => {
        const orbit = orbits[agent.orbit];
        const angle = agent.offset + time * agent.speed;
        const point = rotatePoint(
          Math.cos(angle) * orbit.rx,
          Math.sin(angle) * orbit.ry,
          orbit.rotation,
        );
        return {
          x: centerX + point.x,
          y: centerY + point.y,
          size: agent.size,
          orbit: agent.orbit,
        };
      });
    }

    function drawOrbits() {
      const centerX = width * 0.77;
      const centerY = height * 0.43;
      context.save();
      context.strokeStyle = palette.line;
      context.lineWidth = 1;
      context.setLineDash([3, 7]);
      context.globalAlpha = 0.82;
      for (const orbit of orbitData()) {
        context.save();
        context.translate(centerX, centerY);
        context.rotate(orbit.rotation);
        context.beginPath();
        context.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
        context.stroke();
        context.restore();
      }
      context.restore();
    }

    function drawAgentNetwork(points: Point[], time: number) {
      context.save();
      context.lineWidth = 0.8;
      for (let first = 0; first < points.length; first += 1) {
        for (let second = first + 1; second < points.length; second += 1) {
          const a = points[first];
          const b = points[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          const threshold = Math.min(150, width * 0.12);
          if (distance > threshold || Math.abs(a.orbit - b.orbit) > 1) continue;
          const pulse = 0.5 + 0.5 * Math.sin(time * 0.0012 + first * 0.7 + second);
          context.globalAlpha = (1 - distance / threshold) * (0.16 + pulse * 0.28);
          context.strokeStyle = pulse > 0.58 ? palette.signal : palette.accent;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      points.forEach((point, index) => {
        const pulse = 0.72 + Math.sin(time * 0.0015 + index) * 0.2;
        context.globalAlpha = 0.2 * pulse;
        context.fillStyle = index % 5 === 0 ? palette.accent : palette.signal;
        context.beginPath();
        context.arc(point.x, point.y, point.size * 3.2, 0, Math.PI * 2);
        context.fill();

        context.globalAlpha = 0.88;
        context.beginPath();
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        context.fill();

        if (index % 6 === 0) {
          context.globalAlpha = 0.58;
          context.strokeStyle = palette.signalAlt;
          context.lineWidth = 0.8;
          context.beginPath();
          context.arc(point.x, point.y, point.size * 2.05, 0, Math.PI * 2);
          context.stroke();
        }
      });
      context.restore();
    }

    function drawSatellite(time: number) {
      const orbit = orbitData()[2];
      const angle = -2.2 + Math.sin(time * 0.00008) * 0.18;
      const center = { x: width * 0.77, y: height * 0.43 };
      const offset = rotatePoint(
        Math.cos(angle) * orbit.rx,
        Math.sin(angle) * orbit.ry,
        orbit.rotation,
      );

      context.save();
      context.translate(center.x + offset.x, center.y + offset.y);
      context.rotate(angle + orbit.rotation + Math.PI / 2);
      context.scale(1.25, 1.25);
      context.globalAlpha = 0.92;

      context.strokeStyle = palette.signal;
      context.lineWidth = 1;
      for (let radius = 11; radius <= 21; radius += 5) {
        context.globalAlpha = 0.18 + radius * 0.008;
        context.beginPath();
        context.arc(0, -8, radius, Math.PI * 1.13, Math.PI * 1.87);
        context.stroke();
      }

      context.globalAlpha = 0.9;
      context.fillStyle = palette.signal;
      context.fillRect(-20, -5, 13, 10);
      context.fillRect(7, -5, 13, 10);
      context.strokeStyle = palette.ink;
      context.strokeRect(-20, -5, 13, 10);
      context.strokeRect(7, -5, 13, 10);
      context.fillStyle = palette.ink;
      context.fillRect(-6, -8, 12, 16);
      context.fillStyle = palette.accent;
      context.beginPath();
      context.arc(0, 0, 2.25, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    function render(time: number) {
      context.clearRect(0, 0, width, height);
      drawDotField(time);
      drawOrbits();
      const points = getAgentPoints(time);
      drawAgentNetwork(points, time);
      drawSatellite(time);
    }

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      render(performance.now());
    }

    function animate(time: number) {
      if (visible && time - lastFrame >= 32) {
        render(time);
        lastFrame = time;
      }
      animationFrame = requestAnimationFrame(animate);
    }

    function updateMotion() {
      cancelAnimationFrame(animationFrame);
      if (reducedMotion.matches) {
        render(0);
      } else {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      render(reducedMotion.matches ? 0 : performance.now());
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    resizeObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    intersectionObserver.observe(canvas);
    reducedMotion.addEventListener("change", updateMotion);
    resize();
    updateMotion();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      intersectionObserver.disconnect();
      reducedMotion.removeEventListener("change", updateMotion);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="orbital-agent-field"
      className="orbital-agent-field absolute inset-0 size-full"
      aria-hidden="true"
    />
  );
}
