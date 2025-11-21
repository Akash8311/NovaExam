import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Timed.css';
import html2pdf from 'html2pdf.js';

const questionsData = [
  {
    question: "Which physicist developed the theory of general relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"],
    correct: "Albert Einstein"
  },
  {
    question: "What is the capital city of Mongolia?",
    options: ["Ulaanbaatar", "Astana", "Tashkent", "Bishkek"],
    correct: "Ulaanbaatar"
  },
  {
    question: "In computer science, what does the acronym “FIFO” stand for?",
    options: ["First In First Out", "Fast Input Fast Output", "File Input File Output", "First Input First Output"],
    correct: "First In First Out"
  },
  {
    question: "The longest river in Asia is the...",
    options: ["Yangtze", "Mekong", "Ganges", "Lena"],
    correct: "Yangtze"
  },
  {
    question: "Who was the first woman to win a Nobel Prize?",
    options: ["Marie Curie", "Dorothy Hodgkin", "Rosalind Franklin", "Ada Lovelace"],
    correct: "Marie Curie"
  },
  {
    question: "What is the powerhouse of the cell?",
    options: ["Ribosome", "Mitochondria", "Nucleus", "Golgi apparatus"],
    correct: "Mitochondria"
  },
  {
    question: "Which treaty ended World War I?",
    options: ["Treaty of Versailles", "Treaty of Paris", "Treaty of Tordesillas", "Treaty of Ghent"],
    correct: "Treaty of Versailles"
  },
  {
    question: "Who is credited with inventing the World Wide Web?",
    options: ["Tim Berners-Lee", "Bill Gates", "Steve Jobs", "Vint Cerf"],
    correct: "Tim Berners-Lee"
  },
  {
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correct: "Saturn"
  },
  {
    question: "In economics, what does GDP stand for?",
    options: ["Gross Domestic Product", "General Domestic Price", "Gross Debt Product", "Government Development Plan"],
    correct: "Gross Domestic Product"
  },
  {
    question: "Who wrote the novel “One Hundred Years of Solitude”?",
    options: ["Gabriel García Márquez", "Pablo Neruda", "Mario Vargas Llosa", "Isabel Allende"],
    correct: "Gabriel García Márquez"
  },
  {
    question: "The “Little Ice Age” occurred during which centuries?",
    options: ["14th to 19th", "10th to 12th", "18th to 20th", "5th to 8th"],
    correct: "14th to 19th"
  },
  {
    question: "What is the largest known living structure on Earth?",
    options: ["Amazon Rainforest", "Great Barrier Reef", "Sahara Desert", "Mariana Trench"],
    correct: "Great Barrier Reef"
  },
  {
    question: "Which element has the highest electrical conductivity at room temperature?",
    options: ["Silver", "Copper", "Gold", "Aluminum"],
    correct: "Silver"
  },
  {
    question: "The Battle of Hastings in 1066 was fought in which country?",
    options: ["England", "France", "Scotland", "Ireland"],
    correct: "England"
  },
  {
    question: "What is the currency of Switzerland?",
    options: ["Euro", "Swiss Franc", "Krona", "Lira"],
    correct: "Swiss Franc"
  },
  {
    question: "Who painted “The Persistence of Memory”?",
    options: ["Salvador Dalí", "Pablo Picasso", "Claude Monet", "Vincent van Gogh"],
    correct: "Salvador Dalí"
  },
  {
    question: "Which ancient civilization built Machu Picchu?",
    options: ["Inca", "Maya", "Aztec", "Olmec"],
    correct: "Inca"
  },
  {
    question: "What is the smallest country in the world by land area?",
    options: ["Monaco", "Vatican City", "Nauru", "San Marino"],
    correct: "Vatican City"
  },
  {
    question: "The Fibonacci sequence is closely related to which mathematical concept?",
    options: ["Golden Ratio", "Pi", "Euler’s Number", "Pythagorean Theorem"],
    correct: "Golden Ratio"
  },
  {
    question: "In literature, who created the character Sherlock Holmes?",
    options: ["Arthur Conan Doyle", "Agatha Christie", "Edgar Allan Poe", "Mark Twain"],
    correct: "Arthur Conan Doyle"
  },
  {
    question: "What is the rarest blood type in humans?",
    options: ["AB-", "O+", "A-", "B-"],
    correct: "AB-"
  },
  {
    question: "Which gas makes up the majority of Earth's atmosphere?",
    options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Argon"],
    correct: "Nitrogen"
  },
  {
    question: "The Rosetta Stone helped scholars decipher which ancient script?",
    options: ["Egyptian Hieroglyphs", "Cuneiform", "Linear B", "Sanskrit"],
    correct: "Egyptian Hieroglyphs"
  },
  {
    question: "Who was the first person to reach the South Pole?",
    options: ["Roald Amundsen", "Robert Falcon Scott", "Ernest Shackleton", "Edmund Hillary"],
    correct: "Roald Amundsen"
  },
  {
    question: "What does the acronym “NASA” stand for?",
    options: ["National Aeronautics and Space Administration", "North American Space Agency", "National Aerospace and Space Association", "National Aeronautics and Space Agency"],
    correct: "National Aeronautics and Space Administration"
  },
  {
    question: "Which war was fought between the North and South regions in the United States?",
    options: ["American Civil War", "Revolutionary War", "World War I", "Mexican-American War"],
    correct: "American Civil War"
  },
  {
    question: "Who composed the music for the ballet “The Nutcracker”?",
    options: ["Pyotr Ilyich Tchaikovsky", "Ludwig van Beethoven", "Johann Sebastian Bach", "Igor Stravinsky"],
    correct: "Pyotr Ilyich Tchaikovsky"
  },
  {
    question: "What is the term for animals that eat both plants and meat?",
    options: ["Herbivores", "Carnivores", "Omnivores", "Detritivores"],
    correct: "Omnivores"
  },
  {
    question: "Which country has won the most FIFA World Cups?",
    options: ["Brazil", "Germany", "Italy", "Argentina"],
    correct: "Brazil"
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

const Timed = () => {
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
         Timed Quiz<p className="quiz-subtitle">Test🛸</p>
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

export default Timed;
