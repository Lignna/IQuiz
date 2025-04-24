import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/CreateByAI.css';

const CreateByAI = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [quantity, setQuantity] = useState(5);
  const [language, setLanguage] = useState('vi');
  const [type, setType] = useState('mcq');
  const [error, setError] = useState('');

  const mockGenerateQuestions = () => {
    if (!topic) {
      setError('Vui lòng nhập chủ đề.');
      return;
    }
    if (quantity < 1 || quantity > 20) {
      setError('Số lượng câu hỏi phải từ 1 đến 20.');
      return;
    }

    const mockQuestions = [];

    setError('');

    if (type === 'mcq') {
      navigate('/create-mcq', { state: { questions: mockQuestions, title: `AI Generated: ${topic}` } });
    } else {
      navigate('/create-flashcard', { 
        state: { 
          flashcards: mockQuestions,
          title: `AI Generated: ${topic}` 
        } 
      });
    }
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h2>Tạo Quiz/Flashcard bằng AI</h2>

        <div className="tab-container">
          <button
            className={`tab-button ${type === 'mcq' ? 'active' : ''}`}
            onClick={() => setType('mcq')}
            aria-label="Tạo MCQ bằng AI"
          >
            Tạo MCQ bằng AI
          </button>
          <button
            className={`tab-button ${type === 'flashcard' ? 'active' : ''}`}
            onClick={() => setType('flashcard')}
            aria-label="Tạo Flashcard bằng AI"
          >
            Tạo Flashcard bằng AI
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="topic">Chủ đề</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Nhập chủ đề"
            aria-label="Chủ đề"
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Số lượng câu hỏi</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            max="20"
            aria-label="Số lượng câu hỏi"
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Ngôn ngữ</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Ngôn ngữ"
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">Tiếng Anh</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={mockGenerateQuestions}
            aria-label="Tạo câu hỏi bằng AI"
          >
            Tạo
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
            aria-label="Hủy và quay lại trang chủ"
          >
            Hủy
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default CreateByAI;