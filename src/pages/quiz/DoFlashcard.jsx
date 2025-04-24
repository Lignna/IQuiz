import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case ' ':
          event.preventDefault();
          setIsFlipped((prev) => !prev);
          break;
        case 'ArrowLeft':
          if (currentCard > 0) {
            setCurrentCard(currentCard - 1);
            setIsFlipped(false);
          }
          break;
        case 'ArrowRight':
          if (flashcardSet && currentCard < flashcardSet.flashcards.length - 1) {
            setCurrentCard(currentCard + 1);
            setIsFlipped(false);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentCard, flashcardSet]);

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
            <div className="front"><p>{card.front}</p></div>
            <div className="back"><p>{card.back}</p></div>
          </div>
          <div className="navigation-controls">
            <button
              className="nav-button"
              onClick={handlePrevious}
              disabled={currentCard === 0}
              aria-label="Flashcard trước"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="nav-button"
              onClick={handleNext}
              disabled={currentCard === flashcardSet.flashcards.length - 1}
              aria-label="Flashcard tiếp theo"
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