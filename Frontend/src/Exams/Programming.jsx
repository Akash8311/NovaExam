import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Programming.css';
import html2pdf from 'html2pdf.js';

const questionsData = [
  {
    question: "What will be the output of the following C code?\n\nint x = 10;\nprintf(\"%d\", x++ + ++x);",
    options: ["21", "22", "20", "Undefined Behavior"],
    correct: "Undefined Behavior"
  },
  {
    question: "In Python, what does this code return?\n\nprint([i for i in range(3)] == list(map(lambda x: x, range(3))))",
    options: ["True", "False", "Error", "None"],
    correct: "True"
  },
  {
    question: "Which data structure is best for implementing recursion internally?",
    options: ["Queue", "Stack", "Linked List", "Heap"],
    correct: "Stack"
  },
  {
    question: "What does this Java code print?\n\nSystem.out.println(3 + 4 + \"Java\" + 5 + 6);",
    options: ["7Java56", "Java3456", "Java7", "34Java56"],
    correct: "7Java56"
  },
  {
    question: "In C++, what does `delete[]` operator do?",
    options: ["Deletes a single object", "Deletes an array", "Deletes pointer only", "None"],
    correct: "Deletes an array"
  },
  {
    question: "What does the following Python code output?\n\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)",
    options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4]", "Error"],
    correct: "[1, 2, 3, 4]"
  },
  {
    question: "Which sorting algorithm has the best average-case complexity?",
    options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
    correct: "Merge Sort"
  },
  {
    question: "What does the following C++ code print?\n\nint a = 5;\ncout << (++a) * (a++);",
    options: ["36", "30", "35", "Undefined Behavior"],
    correct: "36"
  },
  {
    question: "What is the output of this JavaScript code?\n\nconsole.log(typeof null);",
    options: ["null", "object", "undefined", "number"],
    correct: "object"
  },
  {
    question: "Which language uses indentation as part of its syntax?",
    options: ["C", "Java", "Python", "JavaScript"],
    correct: "Python"
  },
  {
    question: "Which one is used to prevent race condition in a multithreading environment?",
    options: ["Mutex", "Semaphore", "Lock", "All of the above"],
    correct: "All of the above"
  },
  {
    question: "What is tail recursion?",
    options: ["Recursion with return", "Function calls itself at the end", "Function ends early", "Infinite recursion"],
    correct: "Function calls itself at the end"
  },
  {
    question: "What will be the result of:\n\nx = lambda a: a + 10\nprint(x(5))",
    options: ["15", "5", "10", "Error"],
    correct: "15"
  },
  {
    question: "Which of the following is true about linked lists?",
    options: ["Random access is possible", "More memory efficient than arrays", "Insertion is costly", "Fixed size"],
    correct: "More memory efficient than arrays"
  },
  {
    question: "Which of these is NOT a valid OOP principle?",
    options: ["Abstraction", "Polymorphism", "Encapsulation", "Iteration"],
    correct: "Iteration"
  },
  {
    question: "Which of the following will execute first in JavaScript?",
    options: ["setTimeout(..., 0)", "Promise.resolve(...).then(...)", "console.log()", "async/await"],
    correct: "console.log()"
  },
  {
    question: "Which of these is a disadvantage of recursion?",
    options: ["Easy to debug", "Uses stack memory", "Faster than iteration", "Memory efficient"],
    correct: "Uses stack memory"
  },
  {
    question: "Which function checks if a string contains only digits in Python?",
    options: ["isdigit()", "isnumeric()", "isalnum()", "isint()"],
    correct: "isdigit()"
  },
  {
    question: "What will be the output?\n\narr = [1, 2, 3]\nprint(arr * 2)",
    options: ["[1, 2, 3, 1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]", "Error"],
    correct: "[1, 2, 3, 1, 2, 3]"
  },
  {
    question: "In C, what is the size of 'int' on a 64-bit system usually?",
    options: ["4 bytes", "2 bytes", "8 bytes", "Depends on compiler"],
    correct: "4 bytes"
  },
  {
    question: "Which of the following is NOT a feature of Java?",
    options: ["Object-Oriented", "Platform Independent", "Pointer Support", "Garbage Collection"],
    correct: "Pointer Support"
  },
  {
    question: "Which one is an immutable data type in Python?",
    options: ["List", "Dictionary", "Tuple", "Set"],
    correct: "Tuple"
  },
  {
    question: "What does the following code return?\n\nlist1 = [1, 2, 3]\nlist2 = list1\nlist1[0] = 100\nprint(list2[0])",
    options: ["100", "1", "Error", "None"],
    correct: "100"
  },
  {
    question: "Which loop is best when the number of iterations is unknown?",
    options: ["for", "while", "do-while", "switch"],
    correct: "while"
  },
  {
    question: "Which of the following best describes a hash table?",
    options: ["Sequential storage", "Key-value store", "LIFO", "FIFO"],
    correct: "Key-value store"
  },
  {
    question: "Which keyword is used to inherit a class in C++?",
    options: ["extends", "implements", "inherits", "public"],
    correct: "public"
  },
  {
    question: "What is the output?\n\ns = set([1, 2, 3, 2, 1])\nprint(len(s))",
    options: ["5", "3", "4", "2"],
    correct: "3"
  },
  {
    question: "Which of these sorting algorithms is not stable?",
    options: ["Merge Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"],
    correct: "Selection Sort"
  },
  {
    question: "Which data structure is used for implementing BFS?",
    options: ["Stack", "Queue", "Heap", "Array"],
    correct: "Queue"
  },
  {
    question: "Which of the following is used to handle exceptions in Python?",
    options: ["try-catch", "try-finally", "try-except", "catch-finally"],
    correct: "try-except"
  }
];
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

const Programming = () => {
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
          Programming <p className="quiz-subtitle">Test 💁</p>
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
    display: "none",
    width: "660px",
    height: "440px",
    margin: "30px auto",
    border: "8px double #00594c",
    padding: "40px",
    textAlign: "center",
    fontFamily: "Georgia, serif",
    position: "relative",
    background: "linear-gradient(135deg, #f9fdfc, #e8f8f5)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  }}
>
  {/* Decorative Corners */}
  <div
    style={{
      position: "absolute",
      top: "10px",
      left: "10px",
      fontSize: "22px",
      color: "#c9a646",
    }}
  >
    ★
  </div>
  <div
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      fontSize: "22px",
      color: "#c9a646",
    }}
  >
    ★
  </div>
  <div
    style={{
      position: "absolute",
      bottom: "10px",
      left: "10px",
      fontSize: "22px",
      color: "#c9a646",
    }}
  >
    ★
  </div>
  <div
    style={{
      position: "absolute",
      bottom: "10px",
      right: "10px",
      fontSize: "22px",
      color: "#c9a646",
    }}
  >
    ★
  </div>

  {/* Header */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 40px 0",
      borderBottom: "2px solid #ccc",
    }}
  >
    <div>
      <h1
        style={{
          margin: "0",
          fontSize: "36px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        <span style={{ color: "#00b386" }}>Nova</span>
        <span style={{ color: "rgba(2, 113, 97, 0.9)" }}>Exam</span>
      </h1>
      <p
        style={{
          margin: "0",
          fontSize: "16px",
          color: "#555",
          fontFamily: "Georgia, serif",
        }}
      >
        Certificate of Achievement
      </p>
    </div>
    <img
      src="/images/main.png"
      alt="NovaExam Seal"
      style={{
        width: "80px",
        height: "80px",
        objectFit: "contain",
      }}
    />
  </div>

  {/* Body */}
  <p style={{ fontSize: "16px", paddingTop: "4vh", color: "#333" }}>
    This is proudly presented to
  </p>
  <h1
    style={{
      fontSize: "32px",
      color: "#00594c",
      margin: "10px 0 30px",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "2px",
    }}
  >
    {userName}
  </h1>

  <p
    style={{
      fontSize: "17px",
      margin: "10px 0",
      marginTop: "-5vh",
      color: "#333",
    }}
  >
    For successfully completing the <strong>{examName}</strong> exam
  </p>

  <p style={{ fontSize: "16px", color: "black", marginTop: "-1vh" }}>
    Grade:{" "}
    <strong style={{ color: "#c9a646" }}>{getGrade(score)}</strong>
  </p>

  {/* Footer */}
  <div
    style={{
      position: "absolute",
      bottom: "40px",
      left: "50px",
      right: "50px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div style={{ textAlign: "left" }}>
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
      <p style={{ color: "black", marginTop: "-3vh" }}>
        _____________________
      </p>
      <p style={{ fontSize: "13px" }}>
        Founder & Project Head, NovaExam
      </p>
    </div>

    <div style={{ marginLeft: "-14vh" }}>
      <img src="/images/QR.png" alt="QR Code" />
    </div>

    <div style={{ textAlign: "right", fontSize: "13px" }}>
      Date: {new Date().toLocaleDateString()}
    </div>
  </div>
</div>

        {/* end */}
      </div>
    </div>
  );
};

export default Programming;