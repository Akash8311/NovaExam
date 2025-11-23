import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './Component/Navbar';
import Welcome from './Component/Welcome';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Home from './Component/Home';
import About from './About/About';
import Programming from './Exams/Programming'; 
import Gk from './Exams/Gk';
import Timed from './Exams/Timed';
import Practice from './Exams/Practice';
import Technical from './Exams/Technical';
import Trivia from './Exams/Trivia';
import Ml from './Exams/Ml';
import Contact from './About/Contact';
import Company from './About/Company';
import Profile from './Component/Profile';
import Career from './About/Career';
import Higher from './Indrusty/Higher';
import College from './Indrusty/College';
import Competitive from './Indrusty/Competitive';
import Genaral from './Indrusty/Genaral';
import It from './Indrusty/It';



const AppContent = () => {
  const location = useLocation();
  
  // All lowercase paths for consistency
  const hideNavbarPaths = [
    '/login', '/signup', '/home', '/about', '/programming', '/gk', '/timed',
    '/practice', '/technical', '/trivia', '/ml', '/contact', '/company',
    '/profile', '/career', '/higher', '/college', '/competitive', '/genaral', '/it'
  ];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname.toLowerCase()) && <Navbar />}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programming" element={<Programming />} /> 
        <Route path="/gk" element={<Gk />} />
        <Route path="/timed" element={<Timed />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/technical" element={<Technical />} />
        <Route path="/trivia" element={<Trivia />} />
        <Route path="/ml" element={<Ml />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/company" element={<Company />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/career" element={<Career />} />
        <Route path="/higher" element={<Higher />} />
        <Route path="/college" element={<College />} />
        <Route path="/competitive" element={<Competitive />} />
        <Route path="/genaral" element={<Genaral />} />
        <Route path="/it" element={<It />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
