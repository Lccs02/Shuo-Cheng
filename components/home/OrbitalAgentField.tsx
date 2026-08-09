"use client";

import { useEffect, useRef } from "react";

type Palette = {
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

type DepthPoint = {
  x: number;
  y: number;
  depth: number;
  phase: number;
};

const agentSpecs: AgentSpec[] = Array.from({ length: 18 }, (_, index) => ({
  orbit: index % 3,
  offset: (index / 18) * Math.PI * 2 + (index % 3) * 0.62,
  speed: (0.000025 + (index % 4) * 0.000004) * (index % 2 === 0 ? 1 : -1),
  size: 1.9 + (index % 3) * 0.55,
}));

const depthPoints: DepthPoint[] = Array.from({ length: 52 }, (_, index) => ({
  x: ((index * 47) % 101) / 100,
  y: ((index * 67 + 19) % 97) / 96,
  depth: 0.25 + ((index * 29) % 71) / 100,
  phase: index * 0.73,
}));

function readPalette(): Palette {
  const styles = getComputedStyle(document.documentElement);
  const value = (name: string) => styles.getPropertyValue(name).trim();
  return {
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

    function drawDepthField(time: number) {
      context.save();
      depthPoints.forEach((point, index) => {
        const drift = Math.sin(time * 0.00013 + point.phase) * 10 * point.depth;
        const x = width * (0.39 + point.x * 0.65) + drift;
        const y = height * (0.08 + point.y * 0.82) + Math.cos(time * 0.0001 + point.phase) * 5;
        const radius = 0.45 + point.depth * 1.05;
        const pulse = 0.5 + Math.sin(time * 0.0007 + point.phase) * 0.5;
        context.fillStyle = index % 9 === 0 ? palette.signalAlt : palette.signal;
        context.globalAlpha = 0.055 + point.depth * 0.12 + pulse * 0.035;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      });
      context.restore();
    }

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

    function drawSignalArcs(time: number) {
      const centerX = width * 0.77;
      const centerY = height * 0.43;
      context.save();
      context.translate(centerX, centerY);
      context.lineCap = "round";

      for (let index = 0; index < 5; index += 1) {
        const radius = Math.min(width, height) * (0.12 + index * 0.044);
        const rotation = time * (0.000018 + index * 0.000003) * (index % 2 ? -1 : 1);
        context.save();
        context.rotate(rotation - 0.6 + index * 0.32);
        context.strokeStyle = index % 2 === 0 ? palette.signal : palette.accent;
        context.lineWidth = index === 0 ? 1.35 : 0.7;
        context.globalAlpha = 0.12 + (5 - index) * 0.035;
        context.setLineDash([radius * 0.36, radius * 0.11, radius * 0.06, radius * 0.22]);
        context.lineDashOffset = -time * (0.006 + index * 0.0015);
        context.beginPath();
        context.ellipse(0, 0, radius, radius * 0.43, -0.12, 0, Math.PI * 2);
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

    function drawDataPackets(points: Point[], time: number) {
      context.save();
      context.lineCap = "round";
      for (let index = 0; index < 10; index += 1) {
        const source = points[(index * 5) % points.length];
        const target = points[(index * 5 + 7) % points.length];
        const progress = (time * (0.000035 + (index % 3) * 0.000006) + index * 0.117) % 1;
        const bend = Math.sin(progress * Math.PI) * (index % 2 === 0 ? 18 : -18);
        const x = source.x + (target.x - source.x) * progress;
        const y = source.y + (target.y - source.y) * progress + bend;
        const previousProgress = Math.max(0, progress - 0.055);
        const previousBend = Math.sin(previousProgress * Math.PI) * (index % 2 === 0 ? 18 : -18);
        const previousX = source.x + (target.x - source.x) * previousProgress;
        const previousY = source.y + (target.y - source.y) * previousProgress + previousBend;

        context.strokeStyle = index % 4 === 0 ? palette.signalAlt : palette.signal;
        context.lineWidth = 1.1;
        context.globalAlpha = Math.sin(progress * Math.PI) * 0.58;
        context.beginPath();
        context.moveTo(previousX, previousY);
        context.lineTo(x, y);
        context.stroke();

        context.globalAlpha *= 0.35;
        context.lineWidth = 4.2;
        context.beginPath();
        context.moveTo(previousX, previousY);
        context.lineTo(x, y);
        context.stroke();
      }
      context.restore();
    }

    function drawRelayCore(time: number) {
      const center = { x: width * 0.77, y: height * 0.43 };
      context.save();
      context.translate(center.x, center.y);
      const glow = context.createRadialGradient(0, 0, 0, 0, 0, Math.min(width, height) * 0.16);
      glow.addColorStop(0, palette.signal);
      glow.addColorStop(0.16, palette.accent);
      glow.addColorStop(1, "transparent");
      context.globalAlpha = 0.1 + Math.sin(time * 0.0008) * 0.025;
      context.fillStyle = glow;
      context.beginPath();
      context.arc(0, 0, Math.min(width, height) * 0.16, 0, Math.PI * 2);
      context.fill();

      for (let index = 0; index < 3; index += 1) {
        const radius = 10 + index * 8;
        context.save();
        context.rotate(time * (0.00011 + index * 0.000035) * (index % 2 ? -1 : 1));
        context.strokeStyle = index === 1 ? palette.accent : palette.signal;
        context.lineWidth = index === 0 ? 1.4 : 0.8;
        context.globalAlpha = 0.45 - index * 0.08;
        context.setLineDash(index === 2 ? [3, 5] : [radius * 1.25, radius * 0.7]);
        context.beginPath();
        context.ellipse(0, 0, radius, radius * 0.56, -0.2, 0, Math.PI * 2);
        context.stroke();
        context.restore();
      }

      context.globalAlpha = 0.82;
      context.fillStyle = palette.accent;
      context.beginPath();
      context.arc(0, 0, 2.1, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    function render(time: number) {
      context.clearRect(0, 0, width, height);
      drawDepthField(time);
      drawDotField(time);
      drawOrbits();
      drawSignalArcs(time);
      const points = getAgentPoints(time);
      drawAgentNetwork(points, time);
      drawDataPackets(points, time);
      drawRelayCore(time);
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
