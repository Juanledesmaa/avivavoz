import React, { useState, useEffect } from 'react';
import Banner from '../Banner/Banner';
import Introduction from '../Introduction/Introduction';
import IntroductionV2 from '../IntroductionV2/IntroductionV2';
import Services from '../About/Services';
import Contact from '../Contact/Contact';
import ProgramPDF from '../ProgramPDF/ProgramPDF';
import RequestInfoModal from '../RequestInfoModal/RequestInfoModal';
import JsonData from '../../data/data.json';

const HomePage = () => {
  const [landingPageData, setLandingPageData] = useState({});
  // Owned here because the CTA has two placements: overlaid on the banner art on
  // desktop, and at the top of the "Sobre nosotros" section on tablet and mobile.
  // Both open this one modal.
  const [showRequestInfo, setShowRequestInfo] = useState(false);
  const openRequestInfo = () => setShowRequestInfo(true);

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div className="home-page">
      <Banner onRequestInfo={openRequestInfo} />
      <ProgramPDF onRequestInfo={openRequestInfo} />
      <Introduction />
      <Services data={landingPageData.Services} />
      <IntroductionV2 />
      <Contact />

      <RequestInfoModal
        show={showRequestInfo}
        onHide={() => setShowRequestInfo(false)}
      />
    </div>
  );
};

export default HomePage;