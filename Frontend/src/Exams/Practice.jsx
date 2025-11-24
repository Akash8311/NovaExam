import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Practice.css';
import html2pdf from 'html2pdf.js';

const questionsData = [
{
    question: "In Java, which keyword best describes the mechanism to derive a new class from an existing class, enabling reuse of code and polymorphism?",
    options: ["implement", "inherits", "extends", "interface"],
    correctAnswer: "extends",
  },
  {
    question: "Evaluate the expression in Python: 4 + 3 * 2. What is the result considering operator precedence?",
    options: ["14", "10", "7", "8"],
    correctAnswer: "10",
  },
  {
    question: "Using the Pythagorean theorem, find the value of (3² + 4²). What does this represent?",
    options: ["12", "16", "25", "21"],
    correctAnswer: "25",
  },
  {
    question: "Who holds the office of Prime Minister of India as of 2024, leading the central government?",
    options: ["Amit Shah", "Narendra Modi", "Rahul Gandhi", "Yogi Adityanath"],
    correctAnswer: "Narendra Modi",
  },
  {
    question: "In arid desert regions, which animal is traditionally referred to as the 'Ship of the Desert' due to its adaptability?",
    options: ["Horse", "Camel", "Elephant", "Donkey"],
    correctAnswer: "Camel",
  },
  {
    question: "Identify the game that does not belong to the Battle Royale genre among the following options.",
    options: ["Free Fire", "Fortnite", "Counter-Strike", "PUBG"],
    correctAnswer: "Counter-Strike",
  },
  {
    question: "Among the world’s oceans, which is the largest in surface area and volume?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: "Pacific",
  },
  {
    question: "The 2024 Summer Olympics was hosted by which city, renowned for its iconic architecture and culture?",
    options: ["Tokyo", "Los Angeles", "Paris", "London"],
    correctAnswer: "Paris",
  },
  {
    question: "Which data structure operates on the First-In-First-Out (FIFO) principle?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: "Queue",
  },
  {
    question: "Among the following data types in C++, which one is invalid or non-existent?",
    options: ["int", "float", "real", "char"],
    correctAnswer: "real",
  },
  {
    question: "In SQL, which clause is primarily used to specify a condition to filter records during a query?",
    options: ["ORDER BY", "WHERE", "GROUP BY", "HAVING"],
    correctAnswer: "WHERE",
  },
  {
    question: "Which of these memory types is considered volatile, losing its contents when power is turned off?",
    options: ["ROM", "SSD", "RAM", "Hard Disk"],
    correctAnswer: "RAM",
  },
  {
    question: "In the OSI model, which layer is mainly responsible for error detection and handling?",
    options: ["Network", "Transport", "Data Link", "Application"],
    correctAnswer: "Data Link",
  },
  {
    question: "Calculate the area of a circle given radius r = 3 units. Use π as a constant.",
    options: ["18π", "9π", "6π", "3π"],
    correctAnswer: "9π",
  },
  {
    question: "Which of these numbers is a prime number?",
    options: ["9", "15", "7", "21"],
    correctAnswer: "7",
  },
  {
    question: "Which planet in our solar system is famously known as the 'Red Planet' due to its iron oxide surface?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    correctAnswer: "Mars",
  },
  {
    question: "In the URL 'www.example.com', what does the acronym 'www' stand for?",
    options: ["World Wide Web", "Web World Wide", "Wide Web World", "World Web Wide"],
    correctAnswer: "World Wide Web",
  },
  {
    question: "Which Indian physicist was awarded the Nobel Prize in 1930 for his work on the scattering of light?",
    options: ["APJ Abdul Kalam", "CV Raman", "Homi Bhabha", "Vikram Sarabhai"],
    correctAnswer: "CV Raman",
  },
  {
    question: "The 'Ship of the Desert' is a nickname for which animal known for its resilience in harsh climates?",
    options: ["Horse", "Camel", "Elephant", "Donkey"],
    correctAnswer: "Camel",
  },
  {
    question: "Who composed the Indian National Anthem 'Jana Gana Mana'?",
    options: ["Bankim Chandra", "Rabindranath Tagore", "Subhash Chandra Bose", "Sarojini Naidu"],
    correctAnswer: "Rabindranath Tagore",
  },
  {
    question: "Who authored the book 'Discovery of India', which explores the history and culture of India?",
    options: ["Mahatma Gandhi", "Subhas Chandra Bose", "Rabindranath Tagore", "Jawaharlal Nehru"],
    correctAnswer: "Jawaharlal Nehru",
  },
  {
    question: "The 2020 Summer Olympics (held in 2021 due to pandemic) were hosted by which city?",
    options: ["Tokyo", "Beijing", "Rio de Janeiro", "London"],
    correctAnswer: "Tokyo",
  },
  {
    question: "What is the chemical formula of ozone, the molecule that protects Earth from UV rays?",
    options: ["O2", "O3", "CO2", "O4"],
    correctAnswer: "O3",
  },
  {
    question: "Which river is popularly known as the 'Ganga of the South' due to its cultural significance?",
    options: ["Godavari", "Krishna", "Kaveri", "Tungabhadra"],
    correctAnswer: "Godavari",
  },
  {
    question: "Who was the first Indian to win an individual Olympic gold medal?",
    options: ["Abhinav Bindra", "Leander Paes", "Sushil Kumar", "Milkha Singh"],
    correctAnswer: "Abhinav Bindra",
  },
  {
    question: "Which Indian city is famously known as the 'City of Lakes'?",
    options: ["Udaipur", "Jaipur", "Nainital", "Bhopal"],
    correctAnswer: "Udaipur",
  },
  {
    question: "In gaming, which title features the main character named 'Kratos'?",
    options: ["Call of Duty", "God of War", "Halo", "PUBG"],
    correctAnswer: "God of War",
  },
  {
    question: "Which company developed the popular sandbox game Minecraft?",
    options: ["Mojang", "Epic Games", "Valve", "EA"],
    correctAnswer: "Mojang",
  },
  {
    question: "In which year was the Constitution of India officially adopted?",
    options: ["1947", "1950", "1949", "1952"],
    correctAnswer: "1949",
  },
  {
    question: "Which country is commonly referred to as the 'Land of the Rising Sun'?",
    options: ["China", "Japan", "South Korea", "Thailand"],
    correctAnswer: "Japan",
  }
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

const Practice = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(900);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "Student";
  const examName = "Practice MCQ Test";

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
      const correct = questions[i].correctAnswer;
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
          Practice<p className="quiz-subtitle">MCQt📈</p>
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

        {/* start */}
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
              <p style={{ fontSize: '32px', marginBottom: '1px', fontFamily: 'Brush Script MT', marginLeft: '40px',marginLeft:'-0vh' }}>Akash Maity</p>
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

export default Practice;
