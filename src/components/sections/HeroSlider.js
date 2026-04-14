'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const INTERVAL = 5000;

export default function HeroSlider({ slides, title }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next, slides.length]);

  if (slides.length === 0) {
    return (
      <section className="hero">
        <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
        </div>
      </section>
    );
  }

  const slide = slides[current];

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images - all preloaded, only active one visible */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="hero-bg"
          style={{
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        />
      ))}
      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="text-label" style={{ marginBottom: '0.75rem', opacity: 0.7, color: 'white' }}>
          {slide.category}
        </p>
        <h1 className="hero-title">{slide.title}</h1>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
          <Link href={`/du-an/${slide.slug}`} className="btn btn-outline btn-icon" style={{ color: 'white' }}>
            Xem dự án
          </Link>
        </div>
      </div>

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="hero-slider-arrow hero-slider-arrow-left"
            aria-label="Slide trước"
          >
            &#8249;
          </button>
          <button
            onClick={next}
            className="hero-slider-arrow hero-slider-arrow-right"
            aria-label="Slide sau"
          >
            &#8250;
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="hero-slider-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-slider-dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
