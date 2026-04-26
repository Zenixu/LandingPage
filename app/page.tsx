'use client';

import ClassicPorscheCanvas from '@/components/ClassicPorscheCanvas';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
  const sequenceRef = useRef<HTMLDivElement>(null);
  
  // Track scroll specifically across the 400vh sequence wrapper
  const { scrollYProgress: sequenceProgress } = useScroll({ 
    target: sequenceRef, 
    offset: ["start start", "end end"] 
  });

  // Vertical Banjo Line Scroll Indicator Setup
  const indicatorHeight = useSpring(useTransform(sequenceProgress, [0, 1], ['0%', '100%']), {
    stiffness: 50,
    damping: 20
  });

  return (
    <main style={{ backgroundColor: 'var(--background)', position: 'relative' }}>
      {/* 475vh Wrapper for Scrolling Sequence (Beats + Gap) */}
      <div ref={sequenceRef} style={{ position: 'relative', width: '100%', zIndex: 10 }}>
        
        {/* Sticky Canvas and Indicator Wrapper */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', zIndex: 0 }}>
          {/* 3D Canvas Background */}
          <ClassicPorscheCanvas scrollProgress={sequenceProgress} />

          {/* Global Scroll Indicator (Banjo spoke style) */}
          <div style={{
            position: 'absolute',
            left: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '40vh',
            width: '2px',
            backgroundColor: '#222',
            zIndex: 20,
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            <motion.div 
              style={{
                width: '100%',
                height: indicatorHeight,
                backgroundColor: 'var(--accent)'
              }}
            />
          </div>
        </div>

        {/* Text sections that scroll over the sticky canvas */}
        <div style={{ position: 'relative', zIndex: 10, marginTop: '-100vh' }}>
        
        {/* BEAT A: 0 - 25vh approx */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            viewport={{ amount: 0.4, once: false }}
            style={{ textAlign: 'center' }}
          >
            <h1 style={{ fontSize: '4rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Porsche 365a</h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', letterSpacing: '0.1em', opacity: 0.8 }}>
              The birth of a silhouette.
            </p>
          </motion.div>
        </section>

        {/* BEAT B: 100vh - 200vh */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10vw' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
            viewport={{ amount: 0.4, once: false }}
            style={{ textAlign: 'left' }}
          >
            <h2 style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>HAND-FORMED</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', letterSpacing: '0.05em', opacity: 0.8 }}>
              Curves shaped by air and aluminum.
            </p>
          </motion.div>
        </section>

        {/* BEAT C: 200vh - 300vh */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10vw' }}>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
            viewport={{ amount: 0.4, once: false }}
            style={{ textAlign: 'right' }}
          >
            <h2 style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>1600 SUPER</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', letterSpacing: '0.05em', opacity: 0.8 }}>
              75 horsepower. Infinite soul.
            </p>
          </motion.div>
        </section>

        {/* BEAT D: 300vh - 400vh */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '15vh' }}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            viewport={{ amount: 0.7, once: false }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={{ fontSize: '4rem', marginBottom: '1.5rem', color: 'var(--foreground)' }}>TIMELESS</h2>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                letterSpacing: '0.1em',
                padding: '1rem 3rem',
                border: '1px solid var(--foreground)',
                backgroundColor: 'transparent',
                color: 'var(--foreground)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              EXPERIENCE THE HERITAGE
            </motion.button>
          </motion.div>
        </section>

        {/* PAUSE / GAP SECTION */}
        {/* This creates the requested gap so the fully assembled car stays on screen 
            by itself before the archival details scroll up. */}
        <div style={{ height: '75vh', width: '100%', position: 'relative', zIndex: 10 }} />

      </div>
      </div>

      {/* INFORMATION & SPECIFICATION SECTION */}
      <section style={{ 
        position: 'relative', 
        zIndex: 20, 
        backgroundColor: 'var(--background)', 
        color: 'var(--foreground)', 
        minHeight: '100vh', 
        padding: '15vh 10vw',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center' 
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}
        >
          <div style={{ marginBottom: '6rem' }}>
            <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>
              The Archival Records
            </h5>
            <h2 style={{ fontSize: '3.5rem', lineHeight: '1.2', fontWeight: '400', maxWidth: '800px' }}>
              The Blueprint of a Legend
            </h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', marginBottom: '8rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
            
            <div style={{ flex: '1 1 400px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>Heritage Details</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: '1.8', opacity: 0.7, fontWeight: '300' }}>
                The Porsche 356 was the company's first production automobile. The "A" model, introduced late in 1955, brought numerous refinements to the suspension and a curved panoramic windshield. Often celebrated for its lightweight agility, the 356 established the rear-engine philosophy that defines Porsche to this day.
              </p>
            </div>
            
            <div style={{ flex: '1 1 400px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>Market Valuation</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: '1.8', opacity: 0.7, fontWeight: '300' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  <span>Original Base Price (1955)</span>
                  <span>~$3,000</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  <span>Concours Restored (Present)</span>
                  <span>$250,000+</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                  <span>Auction Record (Speedster)</span>
                  <span>&gt;$500,000</span>
                </li>
              </ul>
            </div>

          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <motion.a 
              href="https://www.porsche.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ backgroundColor: 'transparent', color: 'var(--foreground)' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '1.2rem 3rem',
                backgroundColor: 'var(--foreground)',
                color: 'var(--background)',
                border: '1px solid var(--foreground)',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
              }}
            >
              VISIT OFFICIAL PORSCHE WEBSITE
            </motion.a>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
