import React, { useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import { sdgFocusAreas } from '../../data/sdg';
import './SDGFocus.css';

const SDGFocus = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sdgFocusAreas.length) % sdgFocusAreas.length);
  };

  const showNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sdgFocusAreas.length);
  };

  return (
    <section id="sdg" className="sdg-section">
      <div className="container">
        <SectionHeader preText="United Nations" highlightText="Sustainable Development Goals" />

        <div className="sdg-focus-wrapper">
          <div className="sdg-overview" data-aos="fade-right">
            <img
              src="/images/sdg/sdg-all.jpg"
              alt="United Nations 17 Sustainable Development Goals"
              className="sdg-overview-img"
            />
          </div>

          <div className="sdg-carousel" data-aos="fade-left">
            <p className="sdg-carousel-intro">
              Out of 17 Sustainable Development Goals, KGRCET is mainly focused on the following areas:
            </p>

            <div className="carousel">
              <button
                type="button"
                className="carousel-button carousel-prev"
                aria-label="Previous SDG"
                onClick={showPrevious}
              >
                &#10094;
              </button>

              <div className="carousel-viewport">
                <div
                  className="carousel-track"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {sdgFocusAreas.map((sdg, index) => (
                    <article className="carousel-item" key={sdg.id}>
                      <div className="carousel-item-image">
                        <img src={sdg.icon} alt={`SDG ${sdg.id} - ${sdg.name}`} />
                      </div>
                      <div className="carousel-item-copy">
                        <p className="carousel-item-counter">SDG {index + 1} of {sdgFocusAreas.length}</p>
                        <h3 className="carousel-item-title">{sdg.name}</h3>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="carousel-button carousel-next"
                aria-label="Next SDG"
                onClick={showNext}
              >
                &#10095;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SDGFocus;
