import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';
import GlassCard from '../ui/GlassCard';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <SectionHeader preText="About" highlightText="CIST" />
            
            <p className="about-paragraph text-muted mb-8 text-lg">
              The Centre for Innovation and Social Transformation has a goal to help students contribute to socio-economic environmental growth in various communities. Encouraging innovative thinking and problem-solving skills, CIST gives students the opportunity to work with local community members, and identify their most pressing challenges. They then design and develop technology-based solutions, to improve the quality of living in these areas. Through capacity building and community-based learning programmes, CIST aims to instill principles of Sustainable Development and United Nations Sustainable Development Goals (SDGs). Students involved in CIST activities are expected to emerge as leaders in the community, with a high sense of moral and civic responsibility towards the development of the country.
            </p>
            

          </div>
          
          <div className="about-visual">
            <GlassCard className="about-card text-center">
              <div className="about-logo-container">
                <img src="/images/logos/cist.png" alt="CIST Logo" className="about-logo" />
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
