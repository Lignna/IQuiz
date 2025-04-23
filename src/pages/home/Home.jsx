
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './style/Home.css';
import { useUserContext } from '../../context/UserContext';

const Home = () => {
  const [activeTab, setActiveTab] = useState('mcq');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]); 
  const navigate = useNavigate();
  const userCtx = useUserContext();

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    setQuizzes(storedQuizzes);
  }, []);

  const mcqQuizzes = quizzes.filter(quiz => quiz.type === 'mcq');
  const flashcardQuizzes = quizzes.filter(quiz => quiz.type === 'flashcard');

  const handleDeleteQuiz = (quizId) => {
    const updatedQuizzes = quizzes.filter(quiz => quiz.id !== quizId);
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
  };

  const handleEditQuiz = (quiz) => {
    if (quiz.type === 'mcq') {
      navigate('/create-mcq', { state: { quiz } });
    } else {
      navigate('/create-flashcard', { state: { quiz } });
    }
  };

  const handleQuizClick = (quiz) => {
    if (quiz.type === 'mcq') {
      navigate(`/mcqs/${quiz.id}`);
    } else {
      navigate(`/flashcards/${quiz.id}`);
    }
  };

  const handleLogout = () => {
    console.log('Đăng xuất thành công!');
    navigate('/sign-in');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <header className="home-header">
          <h2 className="home-welcome">Chào mừng, {userCtx.username}</h2>
          <div className="home-actions">
            <div className="create-quiz-dropdown">
              <button
                className="create-quiz-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
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
                          <FontAwesomeIcon icon={faRightFromBracket }className="logout-icon" />
                        </button>
          </div>
        </header>
        <div className="home-content">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'mcq' ? 'active' : ''}`}
              onClick={() => setActiveTab('mcq')}
            >
              MCQ
            </button>
            <button
              className={`tab ${activeTab === 'flashcard' ? 'active' : ''}`}
              onClick={() => setActiveTab('flashcard')}
            >
              Flashcard
            </button>
          </div>
          <div className="quiz-list">
            {activeTab === 'mcq' ? (
              mcqQuizzes.length > 0 ? (
                mcqQuizzes.map((quiz) => (
                  <div key={quiz.id}
                  className="quiz-card"
                  onClick={() => handleQuizClick(quiz)} >
                    <h3>{quiz.title}</h3>
                    <div className="quiz-actions">
                      <button
                        className="quiz-action-button edit-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditQuiz(quiz);
                        }}
                        aria-label="Chỉnh sửa quiz"
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                      <button
                        className="quiz-action-button delete-button"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleDeleteQuiz(quiz.id);
                        }}
                        aria-label="Xóa quiz"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-quiz-container">
                  <p>Chưa có quiz MCQ nào!</p>
                </div>
              )
            ) : (
              flashcardQuizzes.length > 0 ? (
                flashcardQuizzes.map((quiz) => (
                  <div key={quiz.id}
                  className="quiz-card"
                  onClick={() => handleQuizClick(quiz)}>
                    <h3>{quiz.title}</h3>
                    <div className="quiz-actions">
                      <button
                        className="quiz-action-button edit-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditQuiz(quiz)}}
                        aria-label="Chỉnh sửa flashcard"
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                      <button
                        className="quiz-action-button delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteQuiz(quiz.id);
                        }}
                        aria-label="Xóa flashcard"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-quiz-container">
                <p>Chưa có flashcard nào!</p>
              </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;