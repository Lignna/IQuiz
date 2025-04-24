import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './style/DoMCQ.css';

const DoMCQ = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    const foundQuiz = quizzes.find((q) => q.id === quizId);
    if (foundQuiz) {
      setQuiz(foundQuiz);
      setAnswers(
        foundQuiz.questions.reduce((acc, _, index) => {
          acc[index] = null;
          return acc;
        }, {})
      );
    } else {
      navigate('/home');
    }
  }, [quizId, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentQuestion < quiz?.questions.length - 1) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && currentQuestion > 0) {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentQuestion, quiz]);

  const handleOptionChange = (optionIndex) => {
    setSelectedOption(optionIndex);
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex,
    });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1]);
    }
  };

  const handleFinish = () => {
    alert(`done test`);
    navigate('/home');
  };

  if (!quiz) return <div>Loading...</div>;

  const question = quiz.questions[currentQuestion];
  const isCorrect = selectedOption !== null && selectedOption === question.correctAnswer;

  return (
    <div className="home-container">
      <div className="home-card">
        <h2 className="quiz-title">{quiz.title}</h2>
        <div className="mcq-block">
          <h3 className="question-label">Câu hỏi {currentQuestion + 1}/{quiz.questions.length}</h3>
          <p className="question-text">{question.questionText}</p>
          <div className="options-group">
            <h4 className="options-label">Trả lời</h4>
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`option-item-do ${
                  selectedOption === index
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect' 
                    : ''
                }`}
                onClick={() => handleOptionChange(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleOptionChange(index);
                  }
                }}
              >
                <span>{option}</span>
              </div>
            ))}
          </div>
          <div className="navigation-controls">
            <button
              className="nav-button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              aria-label="Câu hỏi trước"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="nav-button"
              onClick={handleNext}
              disabled={currentQuestion === quiz.questions.length - 1}
              aria-label="Câu hỏi tiếp theo"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/home')}
          >
            Hủy
          </button>
          <button
            type="button"
            className="finish-button"
            onClick={handleFinish}
            aria-label="Hoàn thành quiz"
          >
            Hoàn Thành
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoMCQ;