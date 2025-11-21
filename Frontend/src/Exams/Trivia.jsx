import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Trivia.css';
import html2pdf from 'html2pdf.js';

const questionsData = [
  {
    question: "Which planet in our solar system is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    correct: "Mars"
  },
  {
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correct: "Canberra"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
    correct: "Leonardo da Vinci"
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Tiger", "Elephant", "Lion", "Leopard"],
    correct: "Lion"
  },
  {
    question: "In which year did World War II end?",
    options: ["1945", "1939", "1918", "1950"],
    correct: "1945"
  },
  {
    question: "Which metal is liquid at room temperature?",
    options: ["Gold", "Mercury", "Silver", "Iron"],
    correct: "Mercury"
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correct: "7"
  },
  {
    question: "Which country hosted the 2020 Summer Olympics (held in 2021)?",
    options: ["China", "Brazil", "Japan", "UK"],
    correct: "Japan"
  },
  {
    question: "Who is the author of the Harry Potter series?",
    options: ["J.K. Rowling", "Stephen King", "George R.R. Martin", "Rick Riordan"],
    correct: "J.K. Rowling"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Osmium", "Oxygen", "Oxide", "Ozone"],
    correct: "Oxygen"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: "Pacific"
  },
  {
    question: "Which famous scientist developed the theory of relativity?",
    options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Stephen Hawking"],
    correct: "Albert Einstein"
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Iron", "Gold", "Diamond", "Platinum"],
    correct: "Diamond"
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["South Korea", "India", "China", "Japan"],
    correct: "Japan"
  },
  {
    question: "Which sport is known as the 'king of sports'?",
    options: ["Cricket", "Football", "Tennis", "Basketball"],
    correct: "Football"
  },
  {
    question: "How many players are there in a cricket team on the field?",
    options: ["10", "11", "12", "9"],
    correct: "11"
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Nitrogen", "Carbon Monoxide", "Carbon Dioxide", "Oxygen"],
    correct: "Carbon Dioxide"
  },
  {
    question: "Which bird is known for mimicking human speech?",
    options: ["Sparrow", "Pigeon", "Parrot", "Crow"],
    correct: "Parrot"
  },
  {
    question: "In which country were the pyramids built?",
    options: ["Mexico", "India", "Peru", "Egypt"],
    correct: "Egypt"
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Yangtze", "Nile", "Mississippi"],
    correct: "Nile"
  },
  {
    question: "Which famous ship sank in 1912 after hitting an iceberg?",
    options: ["Lusitania", "Titanic", "Poseidon", "Britannic"],
    correct: "Titanic"
  },
  {
    question: "Who invented the telephone?",
    options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
    correct: "Alexander Graham Bell"
  },
  {
    question: "Which Indian festival is known as the Festival of Lights?",
    options: ["Holi", "Diwali", "Navratri", "Eid"],
    correct: "Diwali"
  },
  {
    question: "Which is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correct: "2"
  },
  {
    question: "Which country has the most number of time zones?",
    options: ["Russia", "China", "USA", "France"],
    correct: "France"
  },
  {
    question: "How many bones are there in the adult human body?",
    options: ["206", "201", "210", "216"],
    correct: "206"
  },
  {
    question: "What does 'www' stand for in a website browser?",
    options: ["World Wide Web", "Web With Widgets", "Wired Web World", "World Web Wide"],
    correct: "World Wide Web"
  },
  {
    question: "Which language is the most spoken worldwide?",
    options: ["English", "Mandarin Chinese", "Spanish", "Hindi"],
    correct: "Mandarin Chinese"
  },
  {
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Earth", "Neptune"],
    correct: "Saturn"
  },
  {
    question: "Which is the tallest mountain in the world?",
    options: ["K2", "Kangchenjunga", "Mount Everest", "Makalu"],
    correct: "Mount Everest"
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

const Trivia = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(900);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "Student";
  const examName = "Programming Test";

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
         Trivia<p className="quiz-subtitle">Test🛸</p>
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

export default Trivia;
