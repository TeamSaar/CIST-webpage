import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../ui/SectionHeader';
import { FiMap, FiGlobe, FiZap, FiCheck } from 'react-icons/fi';
import './Activities.css';

gsap.registerPlugin(ScrollTrigger);

const Activities = () => {
  const outreach = [
    "Village Visits for Problem Scoping",
    "NGO Visits",
    "Gnanshodh with Palle Srujana"
  ];
  
  const sdg = [
    "EWB Student Chapter Activities",
    "UBA Activities"
  ];
  
  const extension = [
    "Ideathon & Hackathon",
    "Sahyog",
    "STEM Activities"
  ];

  useEffect(() => {
    // Animate cards
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".activities-section",
        start: "top 80%",
        once: true
      }
    });

    tl.fromTo(".activity-col", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
    )
    .fromTo(".act-list li",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      "-=0.4" // Start animating items before cards fully finish
    );
  }, []);

  return (
    <section id="activities" className="activities-section bg-dark">
      <div className="container">
        <SectionHeader preText="Activities" highlightText="Undertaken by CIST" theme="dark" />
        
        <div className="activities-grid mt-12">
          {/* Column 1 */}
          <div className="activity-col activity-card">
            <div className="act-accent-line"></div>
            <div className="act-icon-wrapper act-purple">
              <FiMap size={32} />
            </div>
            <h3 className="act-title">Outreach Programs</h3>
            <ul className="act-list">
              {outreach.map((item, idx) => (
                <li key={idx}><FiCheck className="act-check text-primary" /> <span>{item}</span></li>
              ))}
            </ul>
          </div>
          
          {/* Column 2 */}
          <div className="activity-col activity-card">
            <div className="act-accent-line"></div>
            <div className="act-icon-wrapper act-green">
              <FiGlobe size={32} />
            </div>
            <h3 className="act-title">SDG Related</h3>
            <ul className="act-list">
              {sdg.map((item, idx) => (
                <li key={idx}><FiCheck className="act-check text-green" /> <span>{item}</span></li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="activity-col activity-card">
            <div className="act-accent-line"></div>
            <div className="act-icon-wrapper act-amber">
              <FiZap size={32} />
            </div>
            <h3 className="act-title">Extension Activities</h3>
            <ul className="act-list">
              {extension.map((item, idx) => (
                <li key={idx}><FiCheck className="act-check text-secondary" /> <span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
