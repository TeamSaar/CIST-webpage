import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import Badge from '../ui/Badge';
import { useFilter } from '../../hooks/useFilter';
import { teamMembers } from '../../data/team';
import { FiMail, FiUser } from 'react-icons/fi';
import './Team.css';

const roles = ["All", "Leadership", "Faculty", "Teaching Assistants"];

const getDepartmentColor = (dept) => {
  switch (dept) {
    case 'CSE': return 'purple';
    case 'EEE': return 'blue';
    case 'ME': return 'green';
    case 'Civil': return 'amber';
    case 'H&S': return 'teal';
    case 'CIST': return 'indigo';
    default: return 'primary';
  }
};

const PhotoPlaceholder = () => (
  <div className="photo-placeholder">
    <FiUser size={40} />
  </div>
);

const filterFn = (data, filterKey, filterValue) => {
  if (filterValue === "All") return data;
  return data.filter(item => {
    if (filterValue === "Leadership") return item.role === "leadership";
    if (filterValue === "Faculty") return item.role === "faculty";
    if (filterValue === "Teaching Assistants") return item.role === "teaching-assistant";
    return true;
  });
};

const Team = () => {
  const [activeFilter, setActiveFilter] = React.useState("All");
  
  const filteredTeam = filterFn(teamMembers, 'role', activeFilter);
  const leadership = filteredTeam.filter(m => m.role === 'leadership');
  const others = filteredTeam.filter(m => m.role !== 'leadership');

  return (
    <section id="team" className="team-section">
      <div className="container">
        <SectionHeader preText="Our" highlightText="Team" />
        
        <div className="filter-tabs">
          {roles.map(tab => (
            <button 
              key={tab}
              className={`filter-tab ${activeFilter === tab ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="team-content">
          {leadership.length > 0 && (
            <div className="leadership-grid mb-8">
              {leadership.map((member, index) => (
                <div key={member.id} className="team-card leadership-card">
                  <div className="member-photo-wrapper">
                    {member.photo ? <img src={member.photo} alt={member.name} loading="lazy" /> : <PhotoPlaceholder />}
                  </div>
                  <div className="member-info text-center">
                    <h3 className="member-name text-white">{member.name}</h3>
                    <p className="member-designation text-secondary font-semibold">{member.designation}</p>
                    <p className="member-position text-secondary font-bold uppercase tracking-wide text-sm">{member.position}</p>
                    <a href={`mailto:${member.email}`} className="member-email text-white opacity-80 hover-secondary mt-2 inline-flex items-center gap-2">
                      <FiMail /> {member.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {others.length > 0 && (
            <div className="faculty-grid">
              {others.map((member, index) => (
                <div key={member.id} className="team-card faculty-card">
                  <div className="faculty-card-inner">
                    <div className="member-photo-wrapper sm">
                      {member.photo ? <img src={member.photo} alt={member.name} loading="lazy" /> : <PhotoPlaceholder />}
                    </div>
                    <div className="member-info text-center mt-4">
                      <h4 className="member-name">{member.name}</h4>
                      <p className="member-designation text-muted text-sm mb-2">{member.designation}</p>
                      
                      <div className="flex justify-center gap-2 mb-3">
                        <Badge label={member.role === 'teaching-assistant' ? 'Teaching Assistant' : 'Faculty'} color="light" />
                      </div>
                      
                      <a href={`mailto:${member.email}`} className="text-secondary inline-flex items-center gap-2 text-sm">
                        <FiMail /> {member.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
