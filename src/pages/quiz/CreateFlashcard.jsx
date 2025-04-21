import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/CreateFlashcard.css';

const CreateFlashcard = () => {
  const navigate = useNavigate();
  const [flashcardSet, setFlashcardSet] = useState({
    title: '',
    flashcards: [
      { front: '', back: '' },
    ],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAddFlashcard = () => {
    setFlashcardSet({
      ...flashcardSet,
      flashcards: [
        ...flashcardSet.flashcards,
        { front: '', back: '' },
      ],
    });
  };

  const handleFlashcardChange = (index, field, value) => {
    const newFlashcards = [...flashcardSet.flashcards];
    newFlashcards[index][field] = value;
    setFlashcardSet({ ...flashcardSet, flashcards: newFlashcards });
  };

  const handleRemoveFlashcard = (index) => {
    if (flashcardSet.flashcards.length > 1) {
      const newFlashcards = flashcardSet.flashcards.filter((_, i) => i !== index);
      setFlashcardSet({ ...flashcardSet, flashcards: newFlashcards });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    
    if (!flashcardSet.title.trim()) {
      setError('Vui lòng nhập tiêu đề flashcard.');
      return;
    }
    for (let card of flashcardSet.flashcards) {
      if (!card.front.trim() || !card.back.trim()) {
        setError('Vui lòng nhập cả mặt trước và mặt sau cho tất cả flashcard.');
        return;
      }
    }

    
    const flashcardData = {
      id: generateId(),
      title: flashcardSet.title,
      type: 'flashcard',
      flashcards: flashcardSet.flashcards,
    };
    console.log('Flashcard Created:', flashcardData);

   
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    quizzes.push(flashcardData);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));

    setSuccess('Flashcard đã được tạo thành công!');
    setTimeout(() => navigate(`/do-flashcard/${flashcardData.id}`), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/sign-in');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <header className="home-header">
          <h2 className="home-welcome">Tạo Flashcard</h2>
          <div className="home-actions">
            <div className="create-quiz-dropdown">
              <button
                className="create-quiz-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="Tạo quiz mới"
              >
                +
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link
                    to="/create-mcq"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Tạo MCQ
                  </Link>
                  <Link
                    to="/create-flashcard"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Tạo Flashcard
                  </Link>
                </div>
              )}
            </div>
            <button
              className="logout-button"
              onClick={handleLogout}
              aria-label="Đăng xuất"
            >
              🚪
            </button>
          </div>
        </header>
        <div className="create-flashcard-content">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tiêu đề Flashcard</label>
              <input
                type="text"
                value={flashcardSet.title}
                onChange={(e) => setFlashcardSet({ ...flashcardSet, title: e.target.value })}
                placeholder="Nhập tiêu đề flashcard"
              />
            </div>
            {flashcardSet.flashcards.map((card, index) => (
              <div key={index} className="flashcard-block">
                <div className="flashcard-header">
                  <h3>Flashcard {index + 1}</h3>
                  {flashcardSet.flashcards.length > 1 && (
                    <button
                      type="button"
                      className="remove-flashcard-button"
                      onClick={() => handleRemoveFlashcard(index)}
                    >🗑️
                    </button>
                  )}
                </div>
                <div className="form-group">
                  <label>Mặt Trước</label>
                  <input
                    value={card.front}
                    onChange={(e) => handleFlashcardChange(index, 'front', e.target.value)}
                    placeholder="Nhập mặt trước"
                  />
                </div>
                <div className="form-group">
                  <label>Mặt Sau</label>
                  <input
                    value={card.back}
                    onChange={(e) => handleFlashcardChange(index, 'back', e.target.value)}
                    placeholder="Nhập mặt sau"
                  />
                </div>
              </div>
            ))}
            <div className="add-flashcard">
              <button
                type="button"
                className="add-flashcard-button"
                onClick={handleAddFlashcard}
              >
                + Thêm Flashcard
              </button>
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
                type="submit"
                className="submit-button"
                aria-label="Lưu flashcard"
              >
                Lưu Flashcard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFlashcard;