import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './style/DoFlashcard.css';
import FlashcardAPI from '../../api/flashcard';

const DoFlashcard = () => {
  const { uuid } = useParams();
   const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [cards, setCards] = useState(null);
   const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
 	 const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
	FlashcardAPI.getQuiz(uuid)
		.then(res => {
			setTitle(res.data.title);
			setCards(res.data.questions)
			setCurrentQuestion(res.data.questions[0])
		})
	}, []);

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prevValue) => prevValue - 1);
		setCurrentQuestion(cards[currentCardIndex - 1])
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex((prevValue) => prevValue + 1);
		setCurrentQuestion(cards[currentCardIndex + 1])
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

//   useEffect(() => {
// 	const handleKeyDown = (event) => {
// 	  switch (event.key) {
// 		 case ' ':
// 			() => handleFlip()
// 			break;
// 		 case 'ArrowLeft':
// 			handlePrevious()
// 			break;
// 		 case 'ArrowRight':
// 			handleNext()
// 			break;
// 		 default:
// 			break;
// 	  }
// 	};

// 	window.addEventListener('keydown', handleKeyDown);
// 	return () => {
// 	  window.removeEventListener('keydown', handleKeyDown);
// 	};
//  }, []);

  if (!title) return <div>Loading...</div>;

  return (
    <div className="home-container">
      <div className="home-card">
        <h2>{title}</h2>
        <div className="flashcard-block">
          <h3>Flashcard {currentCardIndex + 1}/{cards?.length}</h3>
          <div
            className={`flashcard-content ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip}
          >
            <div className="front">{currentQuestion.front}</div>
            <div className="back">{currentQuestion.back}</div>
          </div>
          <div className="navigation-controls">
            <button
              className="nav-button"
              onClick={handlePrevious}
              disabled={currentCardIndex === 0}
              aria-label="Flashcard trước"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="nav-counter">
              {currentCardIndex + 1} / {cards?.length}
            </span>
            <button
              className="nav-button"
              onClick={handleNext}
              disabled={currentCardIndex === cards?.length - 1}
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