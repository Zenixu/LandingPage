'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring, motion, useMotionValueEvent } from 'framer-motion';

import { MotionValue } from 'framer-motion';

const FRAME_COUNT = 168;

export default function ClassicPorscheCanvas({ scrollProgress }: { scrollProgress?: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress: defaultScroll } = useScroll();
  const actualScroll = scrollProgress || defaultScroll;

  // "The scroll should feel like turning a heavy, precision-weighted dial."
  const smoothProgress = useSpring(actualScroll, {
    stiffness: 40,
    damping: 20,
    mass: 1,
    restDelta: 0.001
  });

  // Map progress (0 to 1) to frame index (0 to 167)
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Deep depth of field when text overlays are active (approximate centers of the beats)
  // Beat A: 10%, Beat B: 35%, Beat C: 65%, Beat D: 90%
  // We'll apply blur at these peaks, and sharp (0px) in between to let the user admire the car.
  const canvasBlur = useTransform(
    smoothProgress,
    [0, 0.1, 0.22, 0.25, 0.35, 0.48, 0.52, 0.65, 0.77, 0.8, 0.9, 1],
    [5, 5, 0, 0, 5, 0, 0, 5, 0, 0, 5, 0] // pixel blur
  );

  useEffect(() => {
    // Preload all frames
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Format 001 to 168
      const formattedNumber = i.toString().padStart(3, '0');
      img.src = `/sequence356/ezgif-frame-${formattedNumber}.webp`;
      
      const handleLoad = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };

      img.onload = handleLoad;
      // If an adblocker blocks a frame or it 404s, we MUST still increment loadedCount
      // otherwise the ignition sequence gets stuck forever at 99%.
      img.onerror = () => {
        console.warn(`Failed to precisely load frame: ${img.src}`);
        handleLoad();
      };
      
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ensure accurate sizing to avoid clear rect issues
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
    }

    const img = images[index];
    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  };

  // Modern robust framer hook for change events
  useMotionValueEvent(frameIndex, "change", (latest) => {
     if (imagesLoaded >= FRAME_COUNT) {
       renderFrame(Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(latest))));
     }
  });

  // Handle initial render and resizes
  useEffect(() => {
    if (imagesLoaded >= FRAME_COUNT) {
       renderFrame(Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frameIndex.get()))));
    }
  }, [imagesLoaded]);

  useEffect(() => {
    const handleResize = () => {
      if (imagesLoaded >= FRAME_COUNT) {
         renderFrame(Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frameIndex.get()))));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded]);

  const progressPercentage = Math.round((imagesLoaded / FRAME_COUNT) * 100);

  return (
    <>
      {/* Loading State */}
      {imagesLoaded < FRAME_COUNT && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#050505',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F5F5F5'
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '2rem', letterSpacing: '0.1em' }}>
            IGNITION SEQUENCE
          </h2>
          {/* Key Ignition Progress Bar */}
          <div style={{ width: '200px', height: '2px', backgroundColor: '#333', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              backgroundColor: '#8B0000',
              width: `${progressPercentage}%`,
              transition: 'width 0.2s ease-out'
            }} />
          </div>
          <p style={{ marginTop: '1rem', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', opacity: 0.7 }}>
            {progressPercentage}%
          </p>
        </div>
      )}

      {/* The render canvas */}
      <motion.canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          filter: useTransform(canvasBlur, (val) => `blur(${val}px)`),
          opacity: imagesLoaded === FRAME_COUNT ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      />
    </>
  );
}
