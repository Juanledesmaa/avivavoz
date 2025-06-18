import '../styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './NavigationBar/NavigationBar';
import Footer from './Footer/Footer';
import HomePage from './HomePage/HomePage';
import ConsejosPage from './ConsejosPage/ConsejosPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="text-center">
          <NavigationBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/consejos" element={<ConsejosPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
