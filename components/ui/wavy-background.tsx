"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const OceanBackground = ({
  children,
  className,
  containerClassName,
  waveWidth = 2,
  backgroundFill = "linear-gradient(to bottom, #0077be, #001d3d)",
  blur = 15,
  speed = 0.02,
  waveOpacity = 0.8,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: number;
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const init = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const waveCount = 5; // Number of wave layers
    const waveColors = ["#0044cc", "#0066ff", "#33ccff", "#66d9ff", "#ffffff"];
    let t = 0;

    // Update canvas size on resize
    window.onresize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    // Draw Waves
    const drawWaves = () => {
      ctx.clearRect(0, 0, w, h);
      // Background Gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "#0077be");
      gradient.addColorStop(1, "#001d3d");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < waveCount; i++) {
        const amplitude = 30 + i * 15; // Height of the waves
        const frequency = 0.005 + i * 0.002; // Frequency of the waves
        const offset = t * (0.5 + i * 0.1); // Wave movement speed
        ctx.beginPath();
        ctx.strokeStyle = waveColors[i % waveColors.length];
        ctx.lineWidth = waveWidth + i; // Adjust width per wave
        ctx.globalAlpha = waveOpacity - i * 0.1; // Layer transparency

        for (let x = 0; x < w; x++) {
          const y =
            Math.sin(x * frequency + offset) * amplitude + // Sine wave
            (h / 2 - i * 30); // Offset each wave layer vertically
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.closePath();
      }
      t += speed; // Increment time for animation
    };

    // Animation Loop
    const render = () => {
      drawWaves();
      requestAnimationFrame(render);
    };
    render();
  };

  useEffect(() => {
    init();
    return () => {
      window.onresize = null; // Clean up resize event
    };
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center overflow-hidden",
        containerClassName,
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        style={{
          filter: `blur(${blur}px)`,
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
