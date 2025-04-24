import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './style/CreateMCQ.css';
import LogoutBtn from '../../components/LogoutBtn';
import HeaderActions from '../../components/HeaderActions';

const CreateMCQ = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions: initialQuestions, title: initialTitle } = location.state || { questions: [], title: '' };
  const [quiz, setQuiz] = useState({
    // title: '',
    // questions: [
    //   { questionText: '', options: ['', '', '', ''], correctAnswer: null },
    // ],
    title: initialTitle || '',
    questions: initialQuestions.length > 0
      ? initialQuestions
      : [{ questionText: '', options: ['', '', '', ''], correctAnswer: null }],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { questionText: '', options: ['', '', '', ''], correctAnswer: null },
      ],
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...quiz.questions];
    if (field === 'questionText') {
      newQuestions[index].questionText = value;
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.split('-')[1]);
      newQuestions[index].options[optionIndex] = value;
    } else if (field === 'correctAnswer') {
      newQuestions[index].correctAnswer = parseInt(value);
    }
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleRemoveQuestion = (index) => {
    if (quiz.questions.length > 1) {
      const newQuestions = quiz.questions.filter((_, i) => i !== index);
      setQuiz({ ...quiz, questions: newQuestions });
    }
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const newQuestions = [...quiz.questions];
    const currentOptions = newQuestions[questionIndex].options;

    if (currentOptions.length <= 2) {
      setError('Mỗi câu hỏi phải có ít nhất 2 lựa chọn.');
      return;
    }

    newQuestions[questionIndex].options = currentOptions.filter(
      (_, i) => i !== optionIndex
    );

    if (newQuestions[questionIndex].correctAnswer === optionIndex) {
      newQuestions[questionIndex].correctAnswer = null;
    } else if (
      newQuestions[questionIndex].correctAnswer > optionIndex &&
      newQuestions[questionIndex].correctAnswer !== null
    ) {

      newQuestions[questionIndex].correctAnswer -= 1;
    }

    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].options.push('');
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!quiz.title.trim()) {
      setError('Vui lòng nhập tiêu đề quiz.');
      return;
    }
    for (let q of quiz.questions) {
      if (!q.questionText.trim()) {
        setError('Vui lòng nhập nội dung cho tất cả câu hỏi.');
        return;
      }
      if (q.options.some(opt => !opt.trim())) {
        setError('Vui lòng nhập tất cả các lựa chọn.');
        return;
      }
      if (q.options.length < 2) {
        setError('Mỗi câu hỏi phải có ít nhất 2 lựa chọn.');
        return;
      }
      if (q.correctAnswer === null) {
        setError('Vui lòng chọn đáp án đúng cho mỗi câu hỏi.');
        return;
      }
    }

    const quizData = {
      id: generateId(),
      title: quiz.title,
      type: 'mcq',
      questions: quiz.questions,
    };
    console.log('Quiz Created:', quizData);

    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    quizzes.push(quizData);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));

    setSuccess('Quiz đã được tạo thành công!');
    setTimeout(() => navigate(`/mcqs/${quizData.id}`), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  const closeErrorPopup = () => {
    setError('');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <header className="home-header">
          <h2 className="home-welcome">Tạo Câu Hỏi Nhiều Lựa Chọn</h2>
          <HeaderActions />
        </header>
        <div className="create-mcq-content">
          {success && <div className="success-popup-overlay">
            <div className="success-popup">
              <p className="success-popup-message">{success}</p>
            </div>
          </div>}
          {error && <div className="error-popup-overlay">
            <div className="error-popup">
            <p className="error-popup-message">{error}</p>
            <button
              className="error-popup-close-button"
              onClick={closeErrorPopup}
              aria-label="Đóng thông báo lỗi"
            >
              Đóng
            </button></div></div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tiêu đề Quiz</label>
              <input
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                placeholder="Nhập tiêu đề quiz"
              />
            </div>
            {quiz.questions.map((question, index) => (
              <div key={index} className="question-block">
                <div className="question-header">
                  <h3>Câu hỏi {index + 1}</h3>
                  {quiz.questions.length > 1 && (
                    <button
                      type="button"
                      className="remove-question-button"
                      onClick={() => handleRemoveQuestion(index)}
                      aria-label="Xóa câu hỏi"
                    >
                      <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                    </button>
                  )}
                </div>
                <div className="form-group">
                  <label>Nội dung câu hỏi</label>
                  <input
                    type="text"
                    value={question.questionText}
                    onChange={(e) =>
                      handleQuestionChange(index, 'questionText', e.target.value)
                    }
                    placeholder="Nhập câu hỏi"
                  />
                </div>
                <div className="options-group">
                  <h4>Lựa chọn</h4>
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="option-item">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        value={optIndex}
                        checked={question.correctAnswer === optIndex}
                        onChange={(e) =>
                          handleQuestionChange(index, 'correctAnswer', e.target.value)
                        }
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleQuestionChange(index, `option-${optIndex}`, e.target.value)
                        }
                        placeholder={`Lựa chọn ${optIndex + 1}`}
                        className="option-input"
                      />
                      {question.options.length > 2 && (
                        <button
                          type="button"
                          className="remove-option-button"
                          onClick={() => handleRemoveOption(index, optIndex)}
                          aria-label="Xóa lựa chọn"
                        >
                          <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="add-option">
                    <button
                      type="button"
                      className="add-option-button"
                      onClick={() => handleAddOption(index)}
                    >
                      + Thêm đáp án
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="add-question">
              <button
                type="button"
                className="add-question-button"
                onClick={handleAddQuestion}
              >
                + Thêm câu hỏi
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
                aria-label="Lưu quiz trắc nghiệm"
              >
                Lưu Quiz
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMCQ;



