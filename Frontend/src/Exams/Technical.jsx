import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Technical.css";
import html2pdf from "html2pdf.js";

const questionsData = [
  {
    question:
      'What is the output of the following C code?\nint x = 10;\nprintf("%d", x++);',
    options: ["10", "11", "Compilation error", "Undefined behavior"],
    correct: "10",
  },
  {
    question:
      "Which of the following sorting algorithms has the best average-case time complexity?",
    options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
    correct: "Merge Sort",
  },
  {
    question: "In DBMS, what does ACID stand for?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Consistency, Isolation, Durability",
      "Atomicity, Consistency, Integrity, Durability",
      "Atomicity, Concurrency, Isolation, Durability",
    ],
    correct: "Atomicity, Consistency, Isolation, Durability",
  },
  {
    question: "Which data structure is used for implementing recursion?",
    options: ["Queue", "Stack", "Heap", "Linked List"],
    correct: "Stack",
  },
  {
    question:
      "What is the time complexity of accessing an element in a Hash Table (average case)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correct: "O(1)",
  },
  {
    question: "Which of the following is NOT a NoSQL database?",
    options: ["MongoDB", "Redis", "MySQL", "Cassandra"],
    correct: "MySQL",
  },
  {
    question: "Which layer in the OSI model is responsible for routing?",
    options: ["Data Link", "Transport", "Network", "Session"],
    correct: "Network",
  },
  {
    question: "Which one is a valid IPv6 address?",
    options: [
      "192.168.0.1",
      "fe80::1ff:fe23:4567:890a",
      "255.255.255.0",
      "1234:5678",
    ],
    correct: "fe80::1ff:fe23:4567:890a",
  },
  {
    question: "Which keyword is used to prevent inheritance in Java?",
    options: ["static", "final", "private", "abstract"],
    correct: "final",
  },
  {
    question: "Which algorithm is used in public key encryption?",
    options: ["DES", "RSA", "MD5", "AES"],
    correct: "RSA",
  },
  {
    question: "Which of the following is a symmetric encryption algorithm?",
    options: ["RSA", "ECC", "AES", "Diffie-Hellman"],
    correct: "AES",
  },
  {
    question: "Which of these languages is interpreted?",
    options: ["C", "C++", "Java", "Python"],
    correct: "Python",
  },
  {
    question: "What does Git use internally to track changes?",
    options: ["Commits", "Blobs", "Trees", "All of the above"],
    correct: "All of the above",
  },
  {
    question:
      "Which of the following is a valid HTTP status code for 'Not Found'?",
    options: ["200", "301", "404", "500"],
    correct: "404",
  },
  {
    question: "In operating systems, a deadlock can occur when:",
    options: [
      "Mutual exclusion exists",
      "Hold and wait condition exists",
      "Circular wait exists",
      "All of the above",
    ],
    correct: "All of the above",
  },
  {
    question:
      "Which of the following is used to uniquely identify a process in OS?",
    options: ["PID", "Thread ID", "Handle", "Port number"],
    correct: "PID",
  },
  {
    question: "Which algorithm is used for page replacement?",
    options: ["FIFO", "LRU", "Optimal", "All of the above"],
    correct: "All of the above",
  },
  {
    question: "What does SQL injection target?",
    options: ["Operating system", "Database", "Network", "Compiler"],
    correct: "Database",
  },
  {
    question: "Which of the following is a preprocessor directive in C?",
    options: ["#include", "main", "void", "return"],
    correct: "#include",
  },
  {
    question: "What is the maximum number of child nodes in a binary tree?",
    options: ["1", "2", "3", "Any number"],
    correct: "2",
  },
  {
    question: "Which of these is not a valid HTTP method?",
    options: ["GET", "POST", "PUSH", "DELETE"],
    correct: "PUSH",
  },
  {
    question: "Which JavaScript keyword declares a constant?",
    options: ["let", "const", "var", "define"],
    correct: "const",
  },
  {
    question:
      "Which data structure gives O(1) time for insertion and deletion from both ends?",
    options: ["Queue", "Stack", "Deque", "Linked List"],
    correct: "Deque",
  },
  {
    question: "Which database uses a document-based model?",
    options: ["MySQL", "MongoDB", "Oracle", "PostgreSQL"],
    correct: "MongoDB",
  },
  {
    question: "Which of the following is a compile-time error?",
    options: [
      "Syntax error",
      "Runtime error",
      "Logical error",
      "Segmentation fault",
    ],
    correct: "Syntax error",
  },
  {
    question:
      "Which protocol is used for secure communication over the Internet?",
    options: ["HTTP", "FTP", "TCP", "HTTPS"],
    correct: "HTTPS",
  },
  {
    question: "Which principle is violated in a race condition?",
    options: ["Concurrency", "Mutual exclusion", "Atomicity", "Consistency"],
    correct: "Atomicity",
  },
  {
    question: "In React, what hook is used for side effects?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correct: "useEffect",
  },
  {
    question: "Which normalization form removes transitive dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correct: "3NF",
  },
  {
    question:
      "Which algorithm is best for finding shortest path in a weighted graph?",
    options: ["DFS", "BFS", "Dijkstra", "Prim's"],
    correct: "Dijkstra",
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

const Technical = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(900);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "Student";
  const examName = "Technical MCQ Test";

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
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOptionSelect = (option) => {
    const updated = [...selectedOptions];
    updated[currentQ] = option;
    setSelectedOptions(updated);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
    navigate("/home");
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
    <div className="keyboard">
      <div className="quiz-container">
        <span className="quiz-title">
          Technical <p className="quiz-subtitle">MCQ💻</p>
        </span>
        <div className="underline3" style={{ width: "405px" }}></div>
        <p className="timer">⏳Time Left: {formatTime(timeLeft)} ⏰</p>

        {!showResult && (
          <>
            <div className="question-block">
              <h3>
                Q{currentQ + 1}. {questions[currentQ].question}
              </h3>
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
                style={{
                  width: `${((currentQ + 1) / questionsData.length) * 100}%`,
                }}
              />
            </div>

            <div className="button-group">
              <button
                className="btn prev-btn"
                onClick={handlePrevious}
                disabled={currentQ === 0}
              >
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
            <p>
              Your Score:{" "}
              <strong>
                {score} / {questionsData.length}
              </strong>{" "}
              👌🏻
            </p>
            <p>
              Percentage:{" "}
              <strong>
                {((score / questionsData.length) * 100).toFixed(2)}%
              </strong>{" "}
              🔥
            </p>
            <p>
              Grade: <strong>{getGrade(score)}</strong> 🏅
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "20px",
                alignItems: "center",
              }}
            >
              <button
                className="ok-btn"
                onClick={handleResultClose}
                style={{
                  width: "200px",
                  padding: "10px",
                  fontWeight: "600",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Go To Home
              </button>
              <button
                className="ok-btn"
                onClick={downloadCertificate}
                style={{
                  width: "200px",
                  padding: "10px",
                  backgroundColor: "#00594c",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "8px",
                  cursor: "pointer",
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
            backgroundColor: "#f9fdfc",
          }}
        >
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
                  margin: 0,
                  fontSize: "36px",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                }}
              >
                <span style={{ color: "#00b386" }}>Nova</span>
                <span style={{ color: "rgba(2, 113, 97, 0.9)" }}>Exam</span>
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  color: "#333",
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

          <p style={{ fontSize: "16px", paddingTop: "4vh" }}>
            This is proudly presented to
          </p>
          <h1
            style={{
              fontSize: "32px",
              color: "#00594c",
              margin: "10px 0 30px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {userName}
          </h1>

          <p style={{ fontSize: "17px", margin: "10px 0", marginTop: "-5vh" }}>
            For successfully completing the <strong>{examName}</strong> exam
          </p>

          <p style={{ fontSize: "16px", color: "black", marginTop: "-1vh" }}>
            Grade: <strong>{getGrade(score)}</strong>
          </p>

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
                  fontFamily: "Brush Script MT ,cursive",
                }}
              >
                Akash Maity
              </p>
              <p style={{ color: "black", marginTop: "-2vh" }}>
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
      </div>
    </div>
  );
};

export default Technical;
