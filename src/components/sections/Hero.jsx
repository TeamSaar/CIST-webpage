import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  '/images/hero/hero-1.jpg',
  '/images/hero/hero-2.jpg',
  '/images/hero/hero-4.jpg'
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Entrance Animation Sequence
    const tl = gsap.timeline();

    tl.fromTo(".hero-title", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0.2
    )
    .fromTo(".hero-description",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(".hero-buttons",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(".hero-image-container",
      { scale: 0.96, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(".hero-scroll-indicator",
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  useEffect(() => {
    // Cross-fade slides
    const slides = document.querySelectorAll('.hero-bg-slide');
    
    slides.forEach((slide, index) => {
      if (index === currentImage) {
        gsap.to(slide, {
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut",
          zIndex: 1
        });
      } else {
        gsap.to(slide, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
          zIndex: 0
        });
      }
    });
  }, [currentImage]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentImage]);

  return (
    <section id="home" className="hero-section">
      {/* Decorative Blurred Circles */}
      <div className="hero-blur hero-blur-purple"></div>
      <div className="hero-blur hero-blur-gold"></div>
      <div className="hero-blur hero-blur-lavender"></div>

      <div className="hero-container">
        
        {/* Left Column: Content */}
        <div className="hero-content">
          
          <h1 className="hero-title">
            Centre for <span className="hero-highlight">Innovation</span><br/>
            & Social Transformation
          </h1>
          
          <p className="hero-description">
            Driving innovation through community engagement, student-led research, sustainable development and real-world impact.
          </p>
          
          <div className="hero-buttons">
            <a href="#projects" className="hero-btn hero-btn-primary">
              Explore Projects
            </a>
            <a href="#team" className="hero-btn hero-btn-secondary">
              Meet Our Team
            </a>
          </div>
        </div>

        {/* Right Column: Featured Image Showcase */}
        <div className="hero-visual">
          <div className="hero-image-container">
            {heroImages.map((imgSrc, index) => (
              <div
                key={index}
                className={`hero-bg-slide`}
              >
                <img
                  src={imgSrc}
                  alt="CIST Impact"
                  className="hero-img"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            ))}
            <div className="hero-image-overlay"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator bounce">
        <a href="#stats" aria-label="Scroll down">
          <FiChevronDown size={28} />
          <span>Discover Our Impact</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
