import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleExamNavigation = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue.startsWith('/')) {
      const examName = selectedValue.slice(1).replace(/([A-Z])/g, ' $1').trim();
      const confirmGo = window.confirm(`Are you sure you want to enter the ${examName} Exam?`);
      if (confirmGo) {
        navigate(selectedValue);
      }
    }
  };

  const handleAboutChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue.startsWith('/')) {
      navigate(selectedValue);
    } else {
      alert(`Selected: ${selectedValue}`);
    }
  };

  // Feedback states
  const [comments, setComments] = useState([]);
  const [newName, setNewName] = useState("");
  const [newFeedback, setNewFeedback] = useState("");
  const [showForm, setShowForm] = useState(false);
    useEffect(() => {
    fetch('http://localhost:5000/api/feedback')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch feedback');
        return res.json();
      })
      .then(data => {
        setComments(data);
      })
      .catch(err => {
        console.error(err);
        setComments([
          { name: "Ankit Sharma", feedback: "NovaExam helped me prepare for my BCA semester—timed exams are amazing!" },
          { name: "Riya Das", feedback: "Very helpful for mock tests and the leaderboard motivates me a lot!" },
          { name: "Kunal Roy", feedback: "Clean interface and lots of variety in questions. Loved it!" },
          { name: "Akash Maity", feedback: "It feels just like a real exam. Loved the timer, navigation, and the overall vibe!" }
        ]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim() && newFeedback.trim()) {
      fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim(), feedback: newFeedback.trim() })
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to submit feedback');
          return res.json();
        })
        .then(savedFeedback => {
          const saved = savedFeedback && savedFeedback.feedback ? savedFeedback.feedback : savedFeedback;
          setComments(prev => [...prev, saved]);
          setNewName("");
          setNewFeedback("");
          setShowForm(false);
        })
        .catch(err => {
          alert('Error submitting feedback. Please try again later.');
          console.error(err);
        });
    } else {
      alert("Please enter both name and feedback");
    }
  };

  return (
    <div style={{ background: 'white' }}>
      {/* Navbar */}
      <div className="nova-navbar" style={{ fontFamily: "Poppins", height: '7vh' }}>
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
            <option value="/Programming"> Programming MCQ</option>
            <option value="/Gk">GK MCQ</option>
            <option value="/Timed">Python MCQ</option>
            <option value="/Practice">Practice MCQ</option>
            <option value="/Technical">Technicaly MCQ</option>
            <option value="/Trivia">Trivia MCQ</option>
            <option value="/Ml">Machine Learning MCQ</option>
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
            
      {/* Banner and main content */}
      <div className="okeyy">
        <div className="main-content">
          <div className="banner">
            <div className="text-content">
              <h1 style={{ fontFamily: 'Futura, sans-serif', color: '#343333ff', fontSize: "48px", textShadow: '1px 1px 4px rgba(0,0,0,0.2)' }}>
                Test your knowledge with<br />
                <span style={{ fontSize: "44px" }}>NovaExam and grow smarter..!💭</span>
              </h1>
              <p style={{ fontSize: '17px', fontFamily: 'futura, sans-serif' }}>
                Explore expertly crafted quizzes and practice tests designed for all<br />
                levels—from beginners to advanced learners....🫣
              </p>
            </div>
            <div className="image-content">
              <img src="/images/home.png" alt="NovaExam Illustration" />
            </div>
          </div>
        </div>

        <div className="why-choose" style={{
          textAlign: 'center', marginTop: '20px', fontSize: '25px',
          color: '#0f6b54ff', fontFamily: 'futura, sans-serif', paddingTop: '10px',
        }}>
          <span>
            Still thinking about <strong>NovaExam?</strong> Let us show you why it's worth it....💨
          </span>
        </div>

        <div className="circle-container" style={{
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
          marginTop: '20px', gap: '75px', paddingTop: '10px', paddingBottom: '80px',
        }}>
          <div className="circle">
            <p>Gives instant <br />feedback so you can<br />improve fast</p>
          </div>
          <div className="circle">
            <p>Offers many types <br />of tests to match your<br />needs</p>
          </div>
          <div className="circle">
            <p>Simulates real<br />exam conditions to boost<br />confidence</p>
          </div>
          <div className="circle">
            <p>Leaderboard and<br />scores to challenge your friends</p>
          </div>
        </div>
      </div>

      {/* Featured exams */}
      <div className="featured-exams" style={{ padding: '60px 20px', backgroundColor: '#fffefeff' }}>
        <h1 style={{ textAlign: 'center', color: '#027161', fontFamily: 'Futura' }}>Featured Exams 📌</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginTop: '30px' }}>
          {[
            { name: "Java Programming", icon: "💻" },
            { name: "Aptitude Test", icon: "🧠" },
            { name: "AI Basics", icon: "🤖" },
            { name: "Web 3.0 & Blockchain Fundamentals", icon: "💻" }
          ].map((exam, idx) => (
            <div
              key={idx}
              onClick={() => alert(`${exam.name} is coming soon!`)}
              style={{
                background: 'linear-gradient(to right, #ffffff, #f9f9f9)',
                border: '1px solid #d4f1ec',
                borderRadius: '20px',
                padding: '30px 25px',
                width: '280px',
                height: '210px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.07)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.07)";
              }}
            >
              <div style={{
                fontSize: '40px',
                marginBottom: '10px'
              }}>{exam.icon}</div>
              <h3 style={{ color: '#027161', fontWeight: '700', fontSize: '20px', marginBottom: '8px', textAlign: 'center' }}>{exam.name}</h3>
              <p style={{ fontSize: '14px', color: '#444', textAlign: 'center' }}>Wait... this exam is coming soon!</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Section */}
      <div style={{ backgroundColor: '#f5fef9ff', padding: '60px 20px' }}>
        <h1
          style={{
            textAlign: 'center',
            fontFamily: 'Futura, sans-serif',
            color: '#00594c',
            fontSize: '2.8rem',
            letterSpacing: '1px',
            marginTop: '40px',
            marginBottom: '20px',
            textShadow: '1px 1px 4px rgba(0,0,0,0.2)',
            animation: 'fadeIn 1s ease-out',
            opacity: 1,
            animationFillMode: 'forwards'
          }}
        >
          What Our <span style={{ color: "#7497e8ff", textShadow: '1px 1px 4px rgba(0,0,0,0.2)' }}>Users</span> Say 💭
        </h1>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: "12px 25px",
              backgroundColor: "#027161",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
            onMouseEnter={e => (e.target.style.backgroundColor = "#01594c")}
            onMouseLeave={e => (e.target.style.backgroundColor = "#027161")}
          >
            {showForm ? "Close Feedback Form" : "Add Your Feedback"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: 600,
              margin: "20px auto",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              backgroundColor: "#e6f0ea",
              padding: "25px 30px",
              borderRadius: "15px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)"
            }}
          >
            <input
              type="text"
              placeholder="Your name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{
                padding: "12px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1.5px solid #91c9b9",
                outline: "none",
                transition: "border-color 0.3s ease"
              }}
              onFocus={e => e.target.style.borderColor = "#027161"}
              onBlur={e => e.target.style.borderColor = "#91c9b9"}
              required
            />
            <textarea
              placeholder="Your feedback"
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              rows={4}
              style={{
                padding: "12px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1.5px solid #91c9b9",
                outline: "none",
                transition: "border-color 0.3s ease",
                resize: "vertical"
              }}
              onFocus={e => e.target.style.borderColor = "#027161"}
              onBlur={e => e.target.style.borderColor = "#91c9b9"}
              required
            />
           <button
              type="submit"
              style={{
                padding: "14px 0",
                backgroundColor: "#027161",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                borderRadius: "10px",
                fontSize: "18px",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
              }}
              onMouseEnter={e => (e.target.style.backgroundColor = "#01594c")}
              onMouseLeave={e => (e.target.style.backgroundColor = "#027161")}
            >
              Submit Feedback
            </button>
          </form>
        )}

        {/* Feedback cards display */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '30px',
            marginTop: '40px',
            maxWidth: '1360px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 20px',
          }}
        >
          {comments.map((user, i) => (
            <div
              key={i}
              style={{
                maxWidth: '320px',
                background: 'linear-gradient(135deg, #e0f7f4 0%, #ffffff 100%)',
                padding: '30px 25px',
                borderRadius: '22px',
                minHeight: '210px',
                boxShadow: '0 15px 35px rgba(2, 113, 97, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
                margin: 'auto',
                userSelect: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.04)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(2, 113, 97, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(2, 113, 97, 0.15)';
              }}
            >
              <div
                style={{
                  position: 'relative',
                  paddingLeft: '40px',
                  color: '#004d40',
                  fontSize: '17px',
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                  letterSpacing: '0.02em',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#027161"
                  viewBox="0 0 24 24"
                  width="28px"
                  height="28px"
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '-5px',
                    opacity: 0.2,
                    transform: 'rotate(180deg)',
                  }}
                >
                  <path d="M7.17 6A5 5 0 0 0 2 11v6a1 1 0 0 0 1 1h6a5 5 0 0 0 5-5v-1a5 5 0 0 0-6.83-5zM7 15H4v-3a3 3 0 0 1 3-3v3a1 1 0 0 0 0 2zM18 6a5 5 0 0 0-5 5v1a5 5 0 0 0 6.83 5H22a1 1 0 0 0 1-1v-6a5 5 0 0 0-5-5zM17 15h-3v-3a3 3 0 0 1 3-3v3a1 1 0 0 0 0 2z" />
                </svg>
                “{user.feedback}”
              </div>

              <hr
                style={{
                  margin: '20px 0',
                  border: 'none',
                  height: '1.5px',
                  borderRadius: '1px',
                  background: 'linear-gradient(90deg, #00bfa5, #00695c)',
                  opacity: 0.3,
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#027161',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '18px',
                    userSelect: 'none',
                    boxShadow: '0 2px 8px rgba(2, 113, 97, 0.3)',
                  }}
                  title={user.name}
                >
                  {user.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()}
                </div>

                <div
                  style={{
                    flex: '1',
                    marginLeft: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontWeight: '700',
                      fontSize: '16px',
                      color: '#004d40',
                      letterSpacing: '0.05em',
                      textTransform: 'capitalize',
                      userSelect: 'text',
                    }}
                  >
                    {user.name}
                  </p>
                  <span
                    style={{
                      marginTop: '4px',
                      fontSize: '12px',
                      color: '#00bfa5',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      userSelect: 'none',
                    }}
                  >
                    Verified User
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

   <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>Types Of Exams</h4>
            <ul>
              <li>Programming MCQ</li>
              <li>General MCQ</li>
              <li>Python MCQ</li>
              <li>Practice MCQ</li>
              <li>Technical MCQ</li>
              <li>Trivia MCQ</li>
              <li>Machine Learning MCQ</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>INDUSTRY</h4>
            <ul>
              <li>Higher Education Sector</li>
              <li>College-Level</li>
              <li>Competitive Exam Preparation</li>
              <li>IT & Coding Training</li>
              <li>Innovation & Development</li>
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
            {/* <p><strong>Find Us On:</strong></p> */}
            {/* <div className="social-icons" style={{width:"1px",display:"flex"}}>
              <a href="https://in.linkedin.com/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s" alt="LinkedIn" width="40" height="30" /></a>
              <a href="https://www.facebook.com/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsgEDLSHcm4l3PcMHNa2Nojf2jTs1jqEdxuA&s" alt="Facebook" width="40" height="30" /></a>
              <a href="https://www.youtube.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/6/62/YouTube_social_white_square_%282024%29.svg" alt="YouTube" width="40" height="30" /></a>
              <a href="https://www.instagram.com/?hl=en"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/250px-Instagram_logo_2022.svg.png" alt="Instagram" width="40" height="30" /></a>
              <a href="https://x.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/640px-Logo_of_Twitter.svg.png" alt="Twitter" width="40" height="30" /></a>
            </div> */}
          </div>
        </div>
        <div className="footer-bottom">
          <p>©2025 NovaExam</p>
        </div>
      </footer>

    </div>
  );
}

export default Home;