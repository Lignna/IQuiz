import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/Home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('mcq'); 
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const navigate = useNavigate();

  
  const username = 'testuser';
  const mcqQuizzes = ['Quiz Toán 1', 'Quiz Khoa học'];
  const flashcardQuizzes = ['Flashcard Tiếng Anh', 'Flashcard Lịch sử'];

  const handleLogout = () => {
    console.log('Đăng xuất thành công!');
    navigate('/sign-in');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <header className="home-header">
          <h2 className="home-welcome">Chào mừng, {username}</h2>
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
            <button className="logout-button" onClick={handleLogout}>
              🚪
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
                mcqQuizzes.map((quiz, index) => (
                  <div key={index} className="quiz-card">
                    <h3>{quiz}</h3>
                  </div>
                ))
              ) : (
                <p>Chưa có quiz MCQ nào!</p>
              )
            ) : (
              flashcardQuizzes.length > 0 ? (
                flashcardQuizzes.map((quiz, index) => (
                  <div key={index} className="quiz-card">
                    <h3>{quiz}</h3>
                  </div>
                ))
              ) : (
                <p>Chưa có flashcard nào!</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;