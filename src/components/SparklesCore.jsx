import React, { useEffect, useRef } from "react";

export const SparklesCore = ({
  id = "sparkles-canvas",
  className = "",
  background = "transparent",
  minSize = 1,
  maxSize = 3,
  speed = 1.2,
  particleColor = "#ff7a00",
  particleDensity = 90
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const count = Math.floor((width * height) / (10000 / (particleDensity / 30)));
    const particles = [];

    const colors = [particleColor, "#ffaa40", "#ffffff", "#ff5500"];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * speed * 0.7,
        speedY: -Math.random() * speed * 0.9 - 0.2,
        opacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * 0.04 + 0.01,
        pulseDir: 1
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        p.opacity += p.pulse * p.pulseDir;
        if (p.opacity > 0.95) {
          p.opacity = 0.95;
          p.pulseDir = -1;
        } else if (p.opacity < 0.2) {
          p.opacity = 0.2;
          p.pulseDir = 1;
        }

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = p.size * 3.5;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [minSize, maxSize, speed, particleColor, particleDensity]);

  return (
    <div
      id={id}
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        background: background,
        overflow: "hidden",
        zIndex: 1
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%"
        }}
      />
    </div>
  );
};
