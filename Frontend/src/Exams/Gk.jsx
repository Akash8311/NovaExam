import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gk.css';
import html2pdf from 'html2pdf.js';

const questionsData = [
  {
    question: "Who is the current President of India (2025)?",
    options: ["Ram Nath Kovind", "Droupadi Murmu", "Narendra Modi", "Venkaiah Naidu"],
    correctAnswer: "Droupadi Murmu",
  },
  {
    question: "Which country is the largest producer of coffee in the world?",
    options: ["Vietnam", "India", "Brazil", "Colombia"],
    correctAnswer: "Brazil",
  },
  {
    question: "Which is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2",
  },
  {
    question: "The Battle of Plassey was fought in which year?",
    options: ["1757", "1857", "1761", "1600"],
    correctAnswer: "1757",
  },
  {
    question: "Which gas is used in the preparation of soda water?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
  },
  {
    question: "Which element has the chemical symbol ‘Fe’?",
    options: ["Fluorine", "Ferrous", "Iron", "Francium"],
    correctAnswer: "Iron",
  },
  {
    question: "Is love worth the time, or just an emotional Rollercoaster..?💔",
    options: ["Hell yeah", "Yes Rollercoaster", "I agree", "All of the above"],
    // This question seems subjective; treat all options as correct for user satisfaction
    correctAnswer: ["Hell yeah", "Yes Rollercoaster", "I agree", "All of the above"],
  },
  {
    question: "Who was the founder of the Maurya Empire?",
    options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harshavardhana"],
    correctAnswer: "Chandragupta Maurya",
  },
  {
    question: "Which organ purifies blood in the human body?",
    options: ["Heart", "Lungs", "Kidney", "Liver"],
    correctAnswer: "Kidney",
  },
  {
    question: "Which Indian state has the longest coastline?",
    options: ["Tamil Nadu", "Andhra Pradesh", "Gujarat", "Maharashtra"],
    correctAnswer: "Gujarat",
  },
  {
    question: "Which Mughal emperor built the Red Fort?",
    options: ["Akbar", "Babur", "Shah Jahan", "Aurangzeb"],
    correctAnswer: "Shah Jahan",
  },
  {
    question: "What is the SI unit of pressure?",
    options: ["Pascal", "Joule", "Watt", "Newton"],
    correctAnswer: "Pascal",
  },
  {
    question: "The headquarters of UNO is situated at:",
    options: ["Paris", "Geneva", "New York", "London"],
    correctAnswer: "New York",
  },
  {
    question: "Which Indian state is known as the 'Land of Five Rivers'?",
    options: ["Haryana", "Punjab", "Bihar", "Assam"],
    correctAnswer: "Punjab",
  },
  {
    question: "Which is the highest civilian award in India?",
    options: ["Padma Shri", "Padma Bhushan", "Padma Vibhushan", "Bharat Ratna"],
    correctAnswer: "Bharat Ratna",
  },
  {
    question: "Which metal is liquid at room temperature?",
    options: ["Mercury", "Gallium", "Sodium", "Lead"],
    correctAnswer: "Mercury",
  },
  {
    question: "What is the meaning of 'www' in website URLs?",
    options: ["World Wide Web", "Web World Wide", "Wide Web World", "World Web Wide"],
    correctAnswer: "World Wide Web",
  },
  {
    question: "Which Indian scientist won the Nobel Prize in Physics in 1930?",
    options: ["APJ Abdul Kalam", "CV Raman", "Homi Bhabha", "Vikram Sarabhai"],
    correctAnswer: "CV Raman",
  },
  {
    question: "Which city is known as the Silicon Valley of India?",
    options: ["Hyderabad", "Bengaluru", "Pune", "Delhi"],
    correctAnswer: "Bengaluru",
  },
  {
    question: "Which state is famous for the dance form Kathakali?",
    options: ["Tamil Nadu", "Karnataka", "Kerala", "Odisha"],
    correctAnswer: "Kerala",
  },
  {
    question: "Who wrote ‘Discovery of India’?",
    options: ["Mahatma Gandhi", "Subhas Chandra Bose", "Rabindranath Tagore", "Jawaharlal Nehru"],
    correctAnswer: "Jawaharlal Nehru",
  },
  {
    question: "Which city hosted the 2020 Summer Olympics (held in 2021)?",
    options: ["Tokyo", "Beijing", "Rio de Janeiro", "London"],
    correctAnswer: "Tokyo",
  },
  {
    question: "What is the chemical formula of ozone?",
    options: ["O2", "O3", "CO2", "O4"],
    correctAnswer: "O3",
  },
  {
    question: "Which river is known as the Ganga of the South?",
    options: ["Godavari", "Krishna", "Kaveri", "Tungabhadra"],
    correctAnswer: "Godavari",
  },
  {
    question: "Which Indian won the first individual Olympic gold medal?",
    options: ["Abhinav Bindra", "Leander Paes", "Sushil Kumar", "Milkha Singh"],
    correctAnswer: "Abhinav Bindra",
  },
  {
    question: "Which Indian city is called the City of Lakes?",
    options: ["Udaipur", "Jaipur", "Nainital", "Bhopal"],
    correctAnswer: "Udaipur",
  },
  {
    question: "Which article of the Indian Constitution deals with emergency provisions?",
    options: ["Article 356", "Article 370", "Article 352", "Article 368"],
    correctAnswer: "Article 352",
  },
  {
    question: "Which country won the ICC Cricket World Cup in 2019?",
    options: ["India", "England", "Australia", "New Zealand"],
    correctAnswer: "England",
  },
  {
    question: "In which year was the Indian Constitution adopted?",
    options: ["1947", "1950", "1949", "1952"],
    correctAnswer: "1949",
  },
  {
    question: "Which festival is known as the Festival of Lights?",
    options: ["Holi", "Dussehra", "Diwali", "Eid"],
    correctAnswer: "Diwali",
  },
];

// You can shuffle questions on mount if you want randomness:
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const saveResultToLocal = (examName, score, total) => {
  const existing = JSON.parse(localStorage.getItem("examHistory")) || [];
  const now = new Date().toLocaleString();
  const updated = [...existing, { examName, score, total, completedAt: now }];
  localStorage.setItem("examHistory", JSON.stringify(updated));
};

const getGrade = (score) => {
  if (score >= 27) return "Ex";
  if (score >= 24) return "A+";
  if (score >= 21) return "A";
  if (score >= 18) return "B";
  if (score >= 15) return "C";
  if (score >= 10) return "D";
  return "F";
};

const Gk = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(900);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "Student";
  const examName = "General MCQ Test";

  // Shuffle questions once on component mount
  useEffect(() => {
    const shuffled = shuffleArray(questionsData);
    setQuestions(shuffled);
    setSelectedOptions(Array(shuffled.length).fill(null));
  }, []);

  useEffect(() => {
    if (showResult) return;
    if (questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          calculateResult();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResult, questions]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (option) => {
    const updated = [...selectedOptions];
    updated[currentQ] = option;
    setSelectedOptions(updated);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const calculateResult = () => {
    let finalScore = 0;
    selectedOptions.forEach((ans, i) => {
      const correct = questions[i].correct;
      if (Array.isArray(correct)) {
        if (correct.includes(ans)) finalScore++;
      } else {
        if (ans === correct) finalScore++;
      }
    });
    setScore(finalScore);
    setShowResult(true);
    saveResultToLocal(examName, finalScore, questions.length);
  };

  const handleResultClose = () => {
    navigate('/home');
  };

  const downloadCertificate = () => {
    const cert = document.getElementById("certificate");
    cert.style.display = "block";
    html2pdf().from(cert).save(`${examName}-Certificate.pdf`);
    setTimeout(() => {
      cert.style.display = "none";
    }, 1000);
  };

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div className='keyboard'>
      <div className="quiz-container">
        <span className="quiz-title">
          General knowledge<p className="quiz-subtitle">MCQ🌍</p>
        </span>
        <div className="underline3" style={{ width: '405px' }}></div>
        <p className="timer">⏳Time Left: {formatTime(timeLeft)} ⏰</p>

        {!showResult && (
          <>
            <div className="question-block">
  <h3>Q{currentQ + 1}. {questions[currentQ].question}</h3>
  {questions[currentQ].options.map((opt, i) => {
    const inputId = `q${currentQ}_opt${i}`;
    return (
      <div key={i} className="option">
        <input
          type="radio"
          id={inputId}
          name={`q${currentQ}`}
          checked={selectedOptions[currentQ] === opt}
          onChange={() => handleOptionSelect(opt)}
        />
        <label htmlFor={inputId}>{opt}</label>
      </div>
    );
  })}
</div>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${((currentQ + 1) / questionsData.length) * 100}%` }}
              />
            </div>

            <div className="button-group">
              <button className="btn prev-btn" onClick={handlePrevious} disabled={currentQ === 0}>
                Previous
              </button>
              <button
                className="btn next-btn"
                onClick={handleNext}
                disabled={selectedOptions[currentQ] === null}
              >
                {currentQ === questionsData.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        )}

        {showResult && (
          <div className="result-modal">
            <h2>Test Completed! 🎉</h2>
            <p>Your Score: <strong>{score} / {questionsData.length}</strong> 👌🏻</p>
            <p>Percentage: <strong>{((score / questionsData.length) * 100).toFixed(2)}%</strong> 🔥</p>
            <p>Grade: <strong>{getGrade(score)}</strong> 🏅</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px', alignItems: 'center' }}>
              <button className="ok-btn" onClick={handleResultClose} style={{ width: '200px', padding: '10px', fontWeight: '600', borderRadius: '8px', cursor: 'pointer' }}>
                Go To Home
              </button>
              <button
                className="ok-btn"
                onClick={downloadCertificate}
                style={{
                  width: '200px',
                  padding: '10px',
                  backgroundColor: '#00594c',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                🎓 Download Your Certificate
              </button>
            </div>
          </div>
        )}

        {/* Certificate container */}
        <div
          id="certificate"
          style={{
            display: 'none',
            width: '660px',
            height: '440px',
            margin: '30px auto',
            border: '8px double #00594c',
            padding: '40px',
            textAlign: 'center',
            fontFamily: 'Georgia, serif',
            position: 'relative',
            backgroundColor: '#f9fdfc'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 40px 0',
            borderBottom: '2px solid #ccc',
          }}>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '36px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold'
              }}>
                <span style={{ color: '#00b386' }}>Nova</span>
                <span style={{ color: 'rgba(2, 113, 97, 0.9)' }}>Exam</span>
              </h1>
              <p style={{
                margin: 0,
                fontSize: '16px',
                color: '#333',
                fontFamily: 'Georgia, serif'
              }}>
                Certificate of Achievement
              </p>
            </div>

            <img
              src="/images/main.png"
              alt="NovaExam Seal"
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain'
              }}
            />
          </div>

          <p style={{ fontSize: '16px', paddingTop: '4vh' }}>This is proudly presented to</p>
          <h1 style={{
            fontSize: '32px',
            color: '#00594c',
            margin: '10px 0 30px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            {userName}
          </h1>

 
  <p style={{ fontSize: '17px', margin: '10px 0',marginTop:'-5vh' }}>
    For successfully completing the <strong>{examName}</strong> exam
  </p>

<p style={{ fontSize: '16px',color:'black', marginTop:'-1vh'}}>Grade: <strong>{getGrade(score)}</strong></p>

          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50px',
            right: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ textAlign: 'left' }}>
                <p
        style={{
          fontSize: "5vh",
          marginBottom: "0px",
          marginLeft: "3vh",
          fontFamily:"Brush Script MT ,cursive"
        }}
      >
        Akash Maity
      </p>
              <p style={{ color: "black", marginTop: '-2vh' }}>_____________________</p>
              <p style={{ fontSize: '13px' }}>Founder & Project Head, NovaExam</p>
            </div>
            <div style={{ marginLeft: '-14vh' }}>
              <img src="/images/QR.png" alt="QR Code" />
            </div>
            <div style={{ textAlign: 'right', fontSize: '13px' }}>
              Date: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gk;
