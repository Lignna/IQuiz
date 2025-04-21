import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style/DoFlashcard.css';

const DoFlashcard = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [flashcardSet, setFlashcardSet] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    const foundSet = quizzes.find((q) => q.id === quizId);
    if (foundSet) {
      setFlashcardSet(foundSet);
    } else {
      navigate('/home'); 
    }
  }, [quizId, navigate]);

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentCard < flashcardSet.flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const handleFinish = () => {
    alert('Hoàn thành flashcard (giả lập)!');
    navigate('/home');
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (!flashcardSet) return <div>Loading...</div>;

  const card = flashcardSet.flashcards[currentCard];

  return (
    <div className="home-container">
      <div className="home-card">
        <h2>{flashcardSet.title}</h2>
        <div className="flashcard-block">
          <h3>Flashcard {currentCard + 1}/{flashcardSet.flashcards.length}</h3>
          <div
            className={`flashcard-content ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip}
          >
            <div className="front">{card.front}</div>
            <div className="back">{card.back}</div>
          </div>
          <div className="navigation-controls">
            <button
              className="nav-button"
              onClick={handlePrevious}
              disabled={currentCard === 0}
              aria-label="Flashcard trước"
            >
              ←
            </button>
            <span className="nav-counter">
              {currentCard + 1} / {flashcardSet.flashcards.length}
            </span>
            <button
              className="nav-button"
              onClick={handleNext}
              disabled={currentCard === flashcardSet.flashcards.length - 1}
              aria-label="Flashcard tiếp theo"
            >
              →
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
            aria-label="Hoàn thành flashcard"
          >
            Hoàn Thành
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoFlashcard;