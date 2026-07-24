import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';
import { fundedProjects, deployedProjects, ongoingProjects } from '../../data/projects';
import { FiMapPin } from 'react-icons/fi';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const tabs = ["All", "Funded", "Deployed", "Ongoing"];
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    gsap.fromTo(".project-card", 
      { y: 80, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1, 
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 75%",
          once: true
        }
      }
    );
  }, [activeTab]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Deployed': return <Badge label={status} color="green" />;
      case 'Ongoing': return <Badge label={status} color="amber" />;
      case 'PoC Done': return <Badge label={status} color="blue" />;
      case 'Prototype Tested': return <Badge label={status} color="purple" />;
      default: return <Badge label={status} color="primary" />;
    }
  };

  const ProjectCard = ({ proj, isOngoing }) => {
    return (
      <div className="project-card fade-in">
        <div className="project-card-image">
          <img src={proj.image || '/images/projects/project-1.jpg'} alt={proj.title} loading="lazy" />
          <div className="project-card-overlay">
            <FiMapPin size={32} className="mb-2" />
            <span className="text-center px-4 font-semibold">{proj.village || 'Various Locations'}</span>
          </div>
        </div>
        <div className="project-card-content">
          <h4 className="project-card-title">{proj.title}</h4>
          {proj.investigator && <p className="project-card-investigator">Investigator: {proj.investigator}</p>}


        </div>
      </div>
    );
  };

  const renderGrid = (projects, isOngoing = false) => (
    <div className="projects-grid">
      {projects.map((proj, idx) => (
        <ProjectCard key={idx} proj={proj} isOngoing={isOngoing} />
      ))}
    </div>
  );

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <SectionHeader preText="Our" highlightText="Projects" />
        
        <div className="filter-tabs">
          {tabs.map(tab => (
            <button 
              key={tab}
              className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="projects-content">
          {activeTab === "All" && (
            <div className="all-projects-view">
              <h3 className="category-title mt-0">Funded Projects</h3>
              {renderGrid(fundedProjects)}
              
              <h3 className="category-title">Deployed Projects</h3>
              {renderGrid(deployedProjects)}
              
              <h3 className="category-title">Ongoing Projects</h3>
              {renderGrid(ongoingProjects, true)}
            </div>
          )}
          {activeTab === "Funded" && renderGrid(fundedProjects)}
          {activeTab === "Deployed" && renderGrid(deployedProjects)}
          {activeTab === "Ongoing" && renderGrid(ongoingProjects, true)}

          {((activeTab === 'Funded' && fundedProjects.length === 0) ||
            (activeTab === 'Deployed' && deployedProjects.length === 0) ||
            (activeTab === 'Ongoing' && ongoingProjects.length === 0)) && (
            <div className="empty-state">
              <p>No projects in this category yet</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
