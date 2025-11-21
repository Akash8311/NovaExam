import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ml.css';
import html2pdf from 'html2pdf.js';

const questionsData = [
  {
    question: "What is the main goal of supervised learning?",
    options: ["Labeling data", "Finding patterns in unlabelled data", "Learning from labeled data", "Learning from feedback"],
    correct: "Learning from labeled data"
  },
  {
    question: "Which algorithm is best suited for classification problems?",
    options: ["Linear Regression", "K-Means", "Logistic Regression", "PCA"],
    correct: "Logistic Regression"
  },
  {
    question: "Which of the following is NOT a supervised learning algorithm?",
    options: ["K-Nearest Neighbors", "Linear Regression", "Support Vector Machine", "K-Means"],
    correct: "K-Means"
  },
  {
    question: "What does overfitting mean in machine learning?",
    options: ["Model is too simple", "Model performs well on unseen data", "Model memorizes training data", "Model underperforms on training data"],
    correct: "Model memorizes training data"
  },
  {
    question: "Which metric is commonly used to evaluate classification models?",
    options: ["MSE", "R-squared", "Accuracy", "Euclidean Distance"],
    correct: "Accuracy"
  },
  {
    question: "What is the main purpose of cross-validation?",
    options: ["Reduce overfitting", "Increase training data", "Convert labels", "Reduce features"],
    correct: "Reduce overfitting"
  },
  {
    question: "Which of the following is a dimensionality reduction technique?",
    options: ["Gradient Descent", "PCA", "Logistic Regression", "Naive Bayes"],
    correct: "PCA"
  },
  {
    question: "In a confusion matrix, what does True Positive (TP) mean?",
    options: ["Incorrect positive prediction", "Correct positive prediction", "Incorrect negative prediction", "Correct negative prediction"],
    correct: "Correct positive prediction"
  },
  {
    question: "Which ML algorithm is most suitable for clustering?",
    options: ["Decision Trees", "K-Means", "Random Forest", "Linear Regression"],
    correct: "K-Means"
  },
  {
    question: "What is the role of an activation function in neural networks?",
    options: ["Increase input size", "Control bias", "Introduce non-linearity", "Normalize outputs"],
    correct: "Introduce non-linearity"
  },
  {
    question: "What type of learning is reinforcement learning?",
    options: ["Unsupervised", "Supervised", "Semi-supervised", "Learning from environment via reward signals"],
    correct: "Learning from environment via reward signals"
  },
  {
    question: "What is ‘bias’ in a machine learning model?",
    options: ["Model complexity", "Error from simplifying assumptions", "Variability in model", "Training time"],
    correct: "Error from simplifying assumptions"
  },
  {
    question: "Which algorithm is used for text classification?",
    options: ["SVM", "K-Means", "PCA", "DBSCAN"],
    correct: "SVM"
  },
  {
    question: "Which of the following is a feature selection technique?",
    options: ["Random Forest", "Gradient Boosting", "L1 Regularization (Lasso)", "Mini-batch SGD"],
    correct: "L1 Regularization (Lasso)"
  },
  {
    question: "What does ROC curve stand for?",
    options: ["Rate of Classification", "Random Operating Curve", "Receiver Operating Characteristic", "Recall Over Classification"],
    correct: "Receiver Operating Characteristic"
  },
  {
    question: "Which library is commonly used for ML in Python?",
    options: ["NumPy", "Django", "React", "Scikit-learn"],
    correct: "Scikit-learn"
  },
  {
    question: "Which algorithm combines multiple weak learners to form a strong learner?",
    options: ["Random Forest", "KNN", "Gradient Boosting", "SVM"],
    correct: "Gradient Boosting"
  },
  {
    question: "Which parameter is tuned to avoid overfitting in Decision Trees?",
    options: ["Learning rate", "Max depth", "Epochs", "Step size"],
    correct: "Max depth"
  },
  {
    question: "Which ML model works well with linearly separable data?",
    options: ["KNN", "Naive Bayes", "SVM with linear kernel", "K-Means"],
    correct: "SVM with linear kernel"
  },
  {
    question: "Which technique is used for anomaly detection?",
    options: ["KNN", "Isolation Forest", "SVM", "Random Forest"],
    correct: "Isolation Forest"
  },
  {
    question: "What is entropy in decision trees?",
    options: ["Measure of distance", "Measure of impurity", "Loss function", "Accuracy metric"],
    correct: "Measure of impurity"
  },
  {
    question: "Which method is commonly used to reduce variance in ML?",
    options: ["Ensemble methods", "Feature scaling", "Cross-validation", "Batch normalization"],
    correct: "Ensemble methods"
  },
  {
    question: "What does the learning rate control in gradient descent?",
    options: ["Model depth", "Step size in parameter update", "Number of layers", "Loss function"],
    correct: "Step size in parameter update"
  },
  {
    question: "What kind of problem is solved by Linear Regression?",
    options: ["Classification", "Clustering", "Regression", "Dimensionality Reduction"],
    correct: "Regression"
  },
  {
    question: "Which ML algorithm is best for spam filtering?",
    options: ["Logistic Regression", "Naive Bayes", "SVM", "Random Forest"],
    correct: "Naive Bayes"
  },
  {
    question: "Which part of ML pipeline handles raw data preparation?",
    options: ["Modeling", "Preprocessing", "Tuning", "Deployment"],
    correct: "Preprocessing"
  },
  {
    question: "What is the purpose of feature scaling?",
    options: ["Convert to integers", "Reduce dimensionality", "Bring features to same scale", "Train faster"],
    correct: "Bring features to same scale"
  },
  {
    question: "Which loss function is used for classification tasks?",
    options: ["Mean Squared Error", "Binary Cross Entropy", "Huber Loss", "L2 Loss"],
    correct: "Binary Cross Entropy"
  },
  {
    question: "Which of the following is NOT a type of gradient descent?",
    options: ["Batch", "Stochastic", "Mini-batch", "Exponential"],
    correct: "Exponential"
  },
  {
    question: "Which model is most prone to overfitting?",
    options: ["Linear Regression", "Decision Tree", "Logistic Regression", "Naive Bayes"],
    correct: "Decision Tree"
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

const Ml = () => {
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
         Machine Learning<p className="quiz-subtitle">Test🎯</p>
        </span>
        <div className="underline3" style={{ width: '450px' }}></div>
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

export default Ml;
