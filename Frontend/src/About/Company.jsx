import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Company.css";

const faqs = [
  {
    question: "What types of exams does NovaExam support?",
    answer:
      "We support Programming, GK, Timed Quizzes, Practice Tests, Technical, Trivia, and Machine Learning exams.",
  },
  {
    question: "Is NovaExam secure?",
    answer:
      "Yes, we use advanced encryption, real-time monitoring, and secure authentication to ensure exam integrity.",
  },
  {
    question: "Can I access NovaExam from anywhere?",
    answer:
      "Absolutely! Our platform is designed for anytime, anywhere access for both students and institutions.",
  },
];

const Company = () => {
  const navigate = useNavigate();
  const [isShrunk, setIsShrunk] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [usersCount, setUsersCount] = useState(0);
  const [examsCount, setExamsCount] = useState(0);
  const [certCount, setCertCount] = useState(0);

  const handleExamNavigation = (e) => {
    const selectedPath = e.target.value;
    if (selectedPath) {
      navigate(selectedPath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAboutChange = (e) => {
    const selectedPath = e.target.value;
    if (selectedPath) {
      navigate(selectedPath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsShrunk(offset > 50);
      setShowBackToTop(offset > 300);
      const countersSection = document.getElementById("counters-section");
      if (
        countersSection &&
        !countersStarted &&
        offset + window.innerHeight > countersSection.offsetTop + 100
      ) {
        setCountersStarted(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [countersStarted]);

  useEffect(() => {
  if (countersStarted) {
    const usersTarget = 12000;
    const examsTarget = 3500;
    const certTarget = 15000;
    const stepUsers = Math.ceil(usersTarget / 100);
    const stepExams = Math.ceil(examsTarget / 100);
    const stepCert = Math.ceil(certTarget / 100);

    const interval = setInterval(() => {
      setUsersCount((prev) => (prev + stepUsers >= usersTarget ? 0 : prev + stepUsers));
      setExamsCount((prev) => (prev + stepExams >= examsTarget ? 0 : prev + stepExams));
      setCertCount((prev) => (prev + stepCert >= certTarget ? 0 : prev + stepCert));
    }, 30);

    // Remove this stopping condition:
    // if (usersCount === usersTarget && examsCount === examsTarget && certCount === certTarget) {
    //   clearInterval(interval);
    // }

    return () => clearInterval(interval);
  }
}, [countersStarted]);


  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showMissionAlert = () => {
    alert(
      "Our mission is to revolutionize exams with a secure, accessible, and innovative platform that empowers learners worldwide."
    );
  };

  const showCommitmentAlert = () => {
    alert(
      "We are committed to top-notch security standards ensuring trust and integrity in every assessment."
    );
  };

  return (
    <div className="company-page">
        <div className={`nova-navbar ${isShrunk ? 'shrink' : ''}`} style={{ fontFamily: "Poppins" }}>
        <div className="logo-section">
          <img
            src="https://dynamic.design.com/asset/logo/b777bb05-ef3a-40c1-81e5-c218a4b7311f/logo?logoTemplateVersion=1&v=638750126514600000&text=+NovaExam+online+exam+potel&layout=auto"
            alt="NovaExam Logo"
            className="logo"
          />
          <h1 className="site-title">
            Nova<span className="light-title">Exam</span>
          </h1>
        </div>

        <div className="dropdown-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <select defaultValue="" required className="custom-select" onChange={handleExamNavigation}>
            <option value="" disabled>Type of Test</option>
            <option value="/Programming">Programming Test</option>
            <option value="/Gk">GK Test</option>
            <option value="/Timed">Timed Quiz</option>
            <option value="/Practice">Practice MCQ</option>
            <option value="/Technical">Technical Test</option>
            <option value="/Trivia">Trivia Exam</option>
            <option value="/Ml">Machine Learning Test</option>
          </select>

          <select defaultValue="" required className="custom-select" onChange={handleAboutChange}>
            <option value="" disabled>Industry</option>
            <option value="/Higher">Higher Education</option>
            <option value="/College">College-Level</option>
            <option value="/Competitive">Competitive Prep</option>
            <option value="/It">IT Training</option>
            <option value="/Genaral">Innovation & Development</option>
          </select>

          <select defaultValue="" required className="custom-select" onChange={handleAboutChange}>
            <option value="" disabled>About Us</option>
            <option value="/company">Company</option>
            <option value="/About">Our Team</option>
            <option value="/contact">Contact</option>
            <option value="/career">Career</option>
            <option value="/home">Home</option>
          </select>

          <div
            className="profile-icon"
            onClick={() => navigate('/Profile')}
            style={{
              cursor: 'pointer',
              fontSize: '24px',
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: '#e4f8f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Your Profile"
          >
            👤
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15vh  100px",
          backgroundColor: "#fdfdfd",
        }}
      >
        {/* Left Content */}
        <div style={{ flex: 1, paddingRight: "40px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
            We are <span style={{ fontWeight: "bold" }}>NovaExam</span>
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#333",
              marginBottom: "20px",
            }}
          >
            Welcome to NovaExam, the next-generation online examination platform designed to transform the way assessments are conducted. We are committed to providing a secure, efficient, and cost-effective solution that caters to the needs of educational institutions and organizations worldwide. With advanced technology and user-friendly features, NovaExam ensures a smooth, reliable, and fair examination experience for both examiners and examinees
          </p>
          <button
            style={{
              backgroundColor: "#21c87a",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Mission
          </button>
        </div>

        {/* Right Image */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src="https://examonline.in/wp-content/uploads/2023/03/about-us.png"
            alt="ExamOnline Illustration"
            style={{ width: "80%", maxWidth: "500px" }}
          />
        </div>
      </div>

      <section className="section about">
        <div className="">
          <h1 style={{fontFamily:'Times New Roman',fontSize:"5vh"}}>ABOUT NOVA EXAM</h1>
          <div className='underline1'></div>
          <div>
            NovaExam is a cutting-edge online examination platform built to redefine the future of digital assessments. Our mission is simple — to make exams smarter, faster, and more secure. Whether for schools, universities, or corporate organizations, NovaExam provides a seamless environment where assessments can be conducted anytime, anywhere, without compromising integrity.
            <br/>
            With robust security features, intuitive navigation, and real-time monitoring, we ensure that both examiners and examinees have a stress-free experience. Our platform supports multiple test formats, detailed performance analytics, and certificate generation, making it a complete end-to-end solution for modern examinations.

            At NovaExam, we believe in empowering education and professional growth through innovation, accessibility, and trust.
        </div>
        </div>

      </section>


      <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 140px",
        backgroundColor: "#fdfdfd",
      }}
    >
      {/* Left Content */}
      <div style={{ flex: 1, paddingRight: "40px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
          Our Mission
        </h1>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          At NovaExam, our mission is to revolutionize the examination process by delivering a platform that is secure, efficient, and accessible to everyone. We strive to eliminate geographical barriers, reduce operational costs, and ensure fairness in every assessment. By combining advanced technology with a user-friendly experience, we aim to empower educational institutions, organizations, and learners worldwide to achieve their goals with confidence and integrity.
        </p>
        <button
          style={{
            backgroundColor: "#21c87a",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Mission
        </button>
      </div>

      {/* Right Image */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <img
          src="https://examonline.in/wp-content/uploads/2023/03/achievement.png"
          alt="ExamOnline Illustration"
          style={{ width: "80%", maxWidth: "500px" }}
        />
      </div>
    </div>


       <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 140px",
        backgroundColor: "#fdfdfd",
      }}
    >
      {/* Left Content */}
      <div style={{ flex: 1, paddingRight: "40px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
          Our Commitment to Security
        </h1>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#333",
            marginBottom: "20px",
          }}
        >
         At NovaExam, security is at the heart of everything we do. We understand that trust is built on protecting the integrity of every assessment. Our platform is equipped with advanced encryption, secure authentication, and real-time monitoring to prevent unauthorized access or malpractice. From data privacy to exam proctoring, every feature is designed to safeguard both examiners and examinees. We continuously update our systems to meet the highest industry standards, ensuring a safe, fair, and transparent examination environment.


        </p>
        <button
          style={{
            backgroundColor: "#21c87a",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Commitment
        </button>
      </div>

      {/* Right Image */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <img
          src="https://examonline.in/wp-content/uploads/2021/12/Privacy-Security-Q32021.png"
          alt="ExamOnline Illustration"
          style={{ width: "80%", maxWidth: "500px" }}
        />
      </div>
    </div>


      {/* Counters Section */}
      <section
        id="counters-section"
        style={{
          backgroundColor: "#21c87a",
          color: "#fff",
          padding: "60px 20px",
          display: "flex",
          justifyContent: "center",
          gap: "60px",
          flexWrap: "wrap",
          textAlign: "center",
          fontFamily: "Poppins",
        }}
      >
        <div>
          <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>{usersCount.toLocaleString()}</h1>
          <p style={{ fontSize: "1.2rem" }}>Registered Users</p>
        </div>
        <div>
          <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>{examsCount.toLocaleString()}</h1>
          <p style={{ fontSize: "1.2rem" }}>Exams Conducted</p>
        </div>
        <div>
          <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>{certCount.toLocaleString()}</h1>
          <p style={{ fontSize: "1.2rem" }}>Certificates Issued</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="faq-section"
        style={{
          maxWidth: "900px",
          margin: "60px auto",
          padding: "0 20px",
          fontFamily: "Poppins",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Frequently Asked Questions</h1>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "15px 0",
              cursor: "pointer",
            }}
            onClick={() => toggleFaq(index)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") toggleFaq(index);
            }}
            aria-expanded={expandedFaq === index}
            aria-controls={`faq-answer-${index}`}
          >
            <h3 style={{ margin: 0, fontWeight: "600" }}>{faq.question}</h3>
            <p
              id={`faq-answer-${index}`}
              style={{
                maxHeight: expandedFaq === index ? "500px" : "0",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
                marginTop: expandedFaq === index ? "10px" : "0",
              }}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </section>

     <section className="thankyou">
        <p style={{padding:"10px 120px"}}>
          Thank you for choosing NovaExam as your trusted online examination platform.
If you have any questions or wish to learn more about our services, feel free to reach out to us. Our dedicated support team is always ready to assist you and ensure you have the best experience possible with NovaExam.
        </p>
        
      </section>


          


      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>Types Of Exams</h4>
            <ul>
              <li>Programming Exams</li>
              <li>General Knowledge</li>
              <li>Timed Quiz</li>
              <li>Practice Test</li>
              <li>Technical Quizzes</li>
              <li>Trivia Quizzes</li>
              <li>Machine Learning</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>INDUSTRY</h4>
            <ul>
              <li>Higher Education Sector</li>
              <li>College-Level</li>
              <li>Competitive Exam Preparation</li>
              <li>IT & Coding Training</li>
              <li>General Knowledge & Current Affairs</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>About Us</h4>
            <ul>
              <li>AboutUs</li>
              <li>Company</li>
              <li>Our Team</li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h4>Contact Us:</h4>
            <p><strong>Sales Department:</strong></p>
            <p className="sales">Sales: +91 9831403680</p>
            <p className="sales">✉ am6030920@gmail.com</p>
            <br />
            <p><strong>Support Department:</strong></p>
            <p className="sales">📞 Support: +91 9831403680</p>
            <p className="sales">✉ am6030920@gmail.com</p>
            <p>Support All time</p>
            <br />
            <p><strong>Find Us On:</strong></p>
            <div className="social-icons">
              <a href="https://in.linkedin.com/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s" alt="LinkedIn" width="40" height="30" /></a>
              <a href="https://www.facebook.com/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsgEDLSHcm4l3PcMHNa2Nojf2jTs1jqEdxuA&s" alt="Facebook" width="40" height="30" /></a>
              <a href="https://www.youtube.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/6/62/YouTube_social_white_square_%282024%29.svg" alt="YouTube" width="40" height="30" /></a>
              <a href="https://www.instagram.com/?hl=en"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/250px-Instagram_logo_2022.svg.png" alt="Instagram" width="40" height="30" /></a>
              <a href="https://x.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/640px-Logo_of_Twitter.svg.png" alt="Twitter" width="40" height="30" /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>©2025 NovaExam</p>
        </div>

      </footer>
    </div>
  );
};

export default Company;
