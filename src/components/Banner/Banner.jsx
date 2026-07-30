import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import heroArt from "../../img/vocal_journey_2027.jpeg";
import RequestInfoModal from '../RequestInfoModal/RequestInfoModal';

import './banner.scss';

// The hero sizes itself to the viewport minus the sticky navbar. Measuring the navbar
// instead of hardcoding its height keeps the CTA above the fold when the nav reflows
// (breakpoint changes, longer link text, browser zoom, larger default font size).
const useNavHeightVar = () => {
  useEffect(() => {
    const nav = document.querySelector('.navigationBar');
    if (!nav) return undefined;

    const apply = () => {
      document.documentElement.style.setProperty(
        '--vj-nav-h',
        `${Math.round(nav.getBoundingClientRect().height)}px`
      );
    };

    apply();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', apply);
      return () => window.removeEventListener('resize', apply);
    }

    const observer = new ResizeObserver(apply);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);
};

const Banner = () => {
  const [showModal, setShowModal] = useState(false);

  useNavHeightVar();

  return (
    <div className="banner">
      {/* .vj-frame keeps the art's 2:1 ratio and fits inside the available space, so the
          whole banner is always visible and never cropped. When the viewport is not 2:1
          the leftover is filled by a blurred copy of the same art rather than flat bars,
          and the CTA is centred inside the frame. */}
      <section className="vj-hero">
        <img src={heroArt} className="vj-backdrop" alt="" aria-hidden="true" />

        <div className="vj-frame">
          <img
            src={heroArt}
            className="vj-art"
            alt="A Viva Voz El Coaching presenta The Vocal Journey: Broadway, New York y Pennsylvania, del 8 al 14 de octubre de 2027. Viaja, canta, aprende, transfórmate. Con Omayra Martínez, profesora de canto, y Yashira Guidini, cantante."
          />

          <div className="vj-cta">
            <Button
              variant="primary"
              className="vj-cta-button"
              onClick={() => setShowModal(true)}
            >
              <span className="vj-cta-label">Solicitar información</span>
              <FontAwesomeIcon icon={faArrowRight} className="vj-cta-arrow" />
            </Button>
          </div>
        </div>
      </section>

      <RequestInfoModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default Banner;
