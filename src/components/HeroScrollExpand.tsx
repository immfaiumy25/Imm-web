"use client";

import { useCallback, useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import './HeroScrollExpand.css';

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

export interface HeroScrollExpandProps {
  children?: ReactNode;
  scrollDistance?: number;
  holdDistance?: number;
  className?: string;
  style?: CSSProperties;
}

const HeroScrollExpand: React.FC<HeroScrollExpandProps> = ({
  children,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  className = '',
  style,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current;
    const content = contentRef.current;
    if (!frame) return;

    const e = smoothstep(0, 1, p);
    
    // Animate dimensions from Card size to Full Screen
    // Start width: 90% (max 1450px), End width: 100vw
    // Start height: 600px, End height: 100vh
    // Start border-radius: 32px, End: 0px
    
    // Since we can't easily animate to max-width using simple numbers, 
    // we use CSS custom properties to interpolate.
    frame.style.setProperty('--expand-progress', e.toString());

    // Fade out inner content slightly as it expands? Or just scale it up?
    // Let's fade out the original content as it expands, or just keep it centered.
    if (content) {
       // content.style.opacity = `${1 - (e * 0.5)}`; // Optional fade
       content.style.transform = `scale(${1 + (e * 0.1)})`; // Slight zoom in
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      stageH = window.innerHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, scrollDistance) + Math.max(0, holdDistance))}px`;
    };

    const readProgress = () => {
      const span = stageH * Math.max(0.01, scrollDistance);
      const top = track.getBoundingClientRect().top;
      return clamp(-top / span, 0, 1);
    };

    const tick = () => {
      // Smoothing factor
      const k = 1 - Math.exp(-1 / (60 * 0.1));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [applyProgress, scrollDistance, holdDistance]);

  return (
    <div
      ref={rootRef}
      className={`hero-scroll-expand ${className}`.trim()}
      style={style}
    >
      <div ref={trackRef} className="hero-scroll-expand__track">
        <div ref={stageRef} className="hero-scroll-expand__stage">
          {/* We place the liquid glass card here, controlled by CSS vars */}
          <div 
            ref={frameRef} 
            className="hero-scroll-expand__frame group"
            style={{ 
              backdropFilter: 'url(#liquid-glass)', 
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <div ref={contentRef} className="hero-scroll-expand__content">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroScrollExpand;
