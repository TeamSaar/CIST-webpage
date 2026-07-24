import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { gsap } from 'gsap';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active link based on scroll position
      const sections = ['home', 'about', 'awards', 'courses', 'partners', 'projects', 'team', 'activities', 'gallery', 'footer'];
      let currentSection = 'home';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if section is in top half of viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrolled) {
      gsap.to(".navbar", {
        padding: "8px 0",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        backdropFilter: "none",
        webkitBackdropFilter: "none",
        borderBottom: "1px solid #e5e7eb",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(".navbar", {
        padding: "16px 0",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        backdropFilter: "none",
        webkitBackdropFilter: "none",
        borderBottom: "1px solid #e5e7eb",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'awards', label: 'Awards' },
    { id: 'courses', label: 'Courses' },
    { id: 'partners', label: 'Partners' },
    { id: 'projects', label: 'Projects' },
    { id: 'team', label: 'Team' },
    { id: 'activities', label: 'Activities' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'footer', label: 'Contact Us' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="#home">
            <img src="/images/logos/kg-reddy.png" alt="KG Reddy Logo" className="logo-img" loading="lazy" />
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`} 
                  className={activeLink === link.id ? 'active' : ''}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-actions">
          <a href="https://forms.gle/bKfXxZLBtKvz1fqSA" target="_blank" rel="noopener noreferrer" className="btn-admissions desktop-only">
            Collaborate With Us
          </a>
          
          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a 
                href={`#${link.id}`} 
                className={activeLink === link.id ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="https://forms.gle/bKfXxZLBtKvz1fqSA" target="_blank" rel="noopener noreferrer" className="btn-admissions mobile-admissions" onClick={closeMobileMenu}>
              Collaborate With Us
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
