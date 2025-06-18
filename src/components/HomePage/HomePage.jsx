import React, { useState, useEffect } from 'react';
import Banner from '../Banner/Banner';
import Introduction from '../Introduction/Introduction';
import IntroductionV2 from '../IntroductionV2/IntroductionV2';
import Services from '../About/Services';
import Contact from '../Contact/Contact';
import ProgramPDF from '../ProgramPDF/ProgramPDF';
import JsonData from '../../data/data.json';

const HomePage = () => {
  const [landingPageData, setLandingPageData] = useState({});
  
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div className="home-page">
      <Banner />
      <ProgramPDF />
      <Introduction />
      <Services data={landingPageData.Services} />
      <IntroductionV2 />
      <Contact />
    </div>
  );
};

export default HomePage;