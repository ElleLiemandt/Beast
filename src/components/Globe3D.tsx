import React, { useRef, useEffect, useState } from 'react';
import { Cause } from '../types';

interface Globe3DProps {
  causes: Cause[];
  onCauseSelect: (cause: Cause) => void;
  selectedCause: Cause | null;
}

const Globe3D: React.FC<Globe3DProps> = ({ causes, onCauseSelect, selectedCause }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const size = Math.min(300, window.innerWidth - 40);
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw globe background
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(74, 144, 226, 0.3)');
    gradient.addColorStop(0.7, 'rgba(74, 144, 226, 0.1)');
    gradient.addColorStop(1, 'rgba(74, 144, 226, 0.05)');

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw grid lines (latitude and longitude)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    // Latitude lines
    for (let i = 1; i < 6; i++) {
      const y = centerY - radius + (radius * 2 * i) / 6;
      const lineRadius = Math.sqrt(radius * radius - Math.pow(y - centerY, 2));
      
      ctx.beginPath();
      ctx.ellipse(centerX, y, lineRadius, lineRadius * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Longitude lines
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 + rotation * 0.01;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * Math.cos(angle), radius, angle, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw cause beams (Beast Signals)
    causes.forEach((cause, index) => {
      // Convert lat/lng to canvas coordinates with rotation
      const lat = (cause.location.lat * Math.PI) / 180;
      const lng = ((cause.location.lng + rotation) * Math.PI) / 180;
      
      // Project 3D coordinates to 2D
      const x = centerX + radius * Math.cos(lat) * Math.sin(lng) * 0.8;
      const y = centerY - radius * Math.sin(lat) * 0.8;
      
      // Only draw if the point is on the visible side of the globe
      const z = Math.cos(lat) * Math.cos(lng);
      if (z > 0) {
        // Draw beam base
        const isSelected = selectedCause?.id === cause.id;
        const isMrBeast = cause.isMrBeastCampaign;
        
        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 8 : 6, 0, Math.PI * 2);
        
        if (isMrBeast) {
          ctx.fillStyle = 'rgba(255, 107, 53, 0.8)';
        } else {
          ctx.fillStyle = `rgba(${126 + index * 30}, ${211 + index * 20}, ${33 + index * 40}, 0.7)`;
        }
        
        ctx.fill();
        
        // Draw pulsing glow
        const pulseSize = 15 + Math.sin(Date.now() * 0.005 + index) * 5;
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize);
        glowGradient.addColorStop(0, isMrBeast ? 'rgba(255, 107, 53, 0.4)' : 'rgba(126, 211, 33, 0.4)');
        glowGradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Draw beam shooting up
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - 50 - Math.sin(Date.now() * 0.003 + index) * 20);
        ctx.strokeStyle = isMrBeast ? 'rgba(255, 107, 53, 0.6)' : 'rgba(126, 211, 33, 0.6)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw progress indicator
        const progress = cause.currentAmount / cause.targetAmount;
        const progressHeight = 20;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(x - 15, y + 15, 30, 4);
        
        ctx.fillStyle = isMrBeast ? '#ff6b35' : '#7ed321';
        ctx.fillRect(x - 15, y + 15, 30 * progress, 4);
      }
    });

    // Auto-rotation
    if (!isDragging) {
      const animationFrame = requestAnimationFrame(() => {
        setRotation(prev => prev + 0.5);
      });
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [causes, selectedCause, rotation, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouseX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMouseX;
      setRotation(prev => prev + deltaX * 0.5);
      setLastMouseX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const size = Math.min(300, window.innerWidth - 40);
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;

    // Check if click is near any cause
    causes.forEach((cause) => {
      const lat = (cause.location.lat * Math.PI) / 180;
      const lng = ((cause.location.lng + rotation) * Math.PI) / 180;
      
      const x = centerX + radius * Math.cos(lat) * Math.sin(lng) * 0.8;
      const y = centerY - radius * Math.sin(lat) * 0.8;
      
      const distance = Math.sqrt(Math.pow(clickX - x, 2) + Math.pow(clickY - y, 2));
      
      if (distance < 20 && Math.cos(lat) * Math.cos(lng) > 0) {
        onCauseSelect(cause);
      }
    });
  };

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default Globe3D;
