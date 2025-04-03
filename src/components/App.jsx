import '../styles/App.scss';
import { useState, useEffect } from 'react';

import Banner from './Banner/Banner';
import NavigationBar from './NavigationBar/NavigationBar';
import Introduction from './Introduction/Introduction';
import IntroductionV2 from './IntroductionV2/IntroductionV2';
import Services from './About/Services';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';
import JsonData from '../data/data.json';
import ProgramPDF from './ProgramPDF/ProgramPDF';

const App = () => {
  const [landingPageData, setLandingPageData] = useState({})
  useEffect(() => {
    setLandingPageData(JsonData)
  }, [])

  return (
    <div className="App">
      <div className="text-center">
        <NavigationBar />
        <Banner />
        <ProgramPDF />
        <Introduction />
        <Services data={landingPageData.Services} />
        <IntroductionV2 />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default App;
