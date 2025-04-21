// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './style/CreateMCQ.css';

// const CreateMCQ = () => {
//   const navigate = useNavigate();
//   const [quiz, setQuiz] = useState({
//     title: '',
//     questions: [
//       { questionText: '', options: ['', '', '', ''], correctAnswer: null },
//     ],
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const generateId = () => Math.random().toString(36).substr(2, 9);

//   const handleAddQuestion = () => {
//     setQuiz({
//       ...quiz,
//       questions: [
//         ...quiz.questions,
//         { questionText: '', options: ['', '', '', ''], correctAnswer: null },
//       ],
//     });
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const newQuestions = [...quiz.questions];
//     if (field === 'questionText') {
//       newQuestions[index].questionText = value;
//     } else if (field.startsWith('option')) {
//       const optionIndex = parseInt(field.split('-')[1]);
//       newQuestions[index].options[optionIndex] = value;
//     } else if (field === 'correctAnswer') {
//       newQuestions[index].correctAnswer = parseInt(value);
//     }
//     setQuiz({ ...quiz, questions: newQuestions });
//   };

//   const handleRemoveQuestion = (index) => {
//     if (quiz.questions.length > 1) {
//       const newQuestions = quiz.questions.filter((_, i) => i !== index);
//       setQuiz({ ...quiz, questions: newQuestions });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     // Validation
//     if (!quiz.title.trim()) {
//       setError('Vui lòng nhập tiêu đề quiz.');
//       return;
//     }
//     for (let q of quiz.questions) {
//       if (!q.questionText.trim()) {
//         setError('Vui lòng nhập nội dung cho tất cả câu hỏi.');
//         return;
//       }
//       if (q.options.some(opt => !opt.trim())) {
//         setError('Vui lòng nhập tất cả các lựa chọn.');
//         return;
//       }
//       if (q.correctAnswer === null) {
//         setError('Vui lòng chọn đáp án đúng cho mỗi câu hỏi.');
//         return;
//       }
//     }

//     // Giả lập lưu quiz
//     const quizData = {
//       id: generateId(),
//       title: quiz.title,
//       type: 'mcq',
//       questions: quiz.questions,
//     };
//     console.log('Quiz Created:', quizData);

//     // Lưu vào localStorage
//     const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
//     quizzes.push(quizData);
//     localStorage.setItem('quizzes', JSON.stringify(quizzes));

//     setSuccess('Quiz đã được tạo thành công!');
//     setTimeout(() => navigate(`/do-mcq/${quizData.id}`), 2000);
//   };

//   return (
//     <div className="create-mcq-container">
//       <div className="create-mcq-card">
//         <h2>Tạo Quiz Trắc Nghiệm</h2>
//         {error && <div className="error-message">{error}</div>}
//         {success && <div className="success-message">{success}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Tiêu đề Quiz</label>
//             <input
//               type="text"
//               value={quiz.title}
//               onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
//               placeholder="Nhập tiêu đề quiz"
//             />
//           </div>
//           {quiz.questions.map((question, index) => (
//             <div key={index} className="question-block">
//               <h3>Câu hỏi {index + 1}</h3>
//               <div className="form-group">
//                 <label>Nội dung câu hỏi</label>
//                 <input
//                   type="text"
//                   value={question.questionText}
//                   onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
//                   placeholder="Nhập câu hỏi"
//                 />
//               </div>
//               <div className="options-group">
//                 {question.options.map((option, optIndex) => (
//                   <div key={optIndex} className="form-group">
//                     <label>Lựa chọn {optIndex + 1}</label>
//                     <input
//                       type="text"
//                       value={option}
//                       onChange={(e) => handleQuestionChange(index, `option-${optIndex}`, e.target.value)}
//                       placeholder={`Lựa chọn ${optIndex + 1}`}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div className="form-group">
//                 <label>Đáp án đúng</label>
//                 <div className="radio-group">
//                   {question.options.map((_, optIndex) => (
//                     <label key={optIndex}>
//                       <input
//                         type="radio"
//                         name={`correct-${index}`}
//                         value={optIndex}
//                         checked={question.correctAnswer === optIndex}
//                         onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
//                       />
//                       Lựa chọn {optIndex + 1}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               {quiz.questions.length > 1 && (
//                 <button
//                   type="button"
//                   className="remove-question-button"
//                   onClick={() => handleRemoveQuestion(index)}
//                 >
//                   Xóa Câu Hỏi
//                 </button>
//               )}
//             </div>
//           ))}
//           <button type="button" className="add-question-button" onClick={handleAddQuestion}>
//             Thêm Câu Hỏi
//           </button>
//           <div className="form-actions">
//             <button type="button" className="cancel-button" onClick={() => navigate('/home')}>
//               Hủy
//             </button>
//             <button type="submit" className="submit-button" aria-label="Lưu quiz trắc nghiệm">
//               Lưu Quiz
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateMCQ;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/CreateMCQ.css';

const CreateMCQ = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: '',
    questions: [
      { questionText: '', options: ['', '', '', ''], correctAnswer: null },
    ],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [randomizeOrder, setRandomizeOrder] = useState(false);
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
    setTimeout(() => navigate(`/do-mcq/${quizData.id}`), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <header className="home-header">
          <h2 className="home-welcome">Tạo Câu Hỏi Nhiều Lựa Chọn</h2>
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
        <div className="create-mcq-content">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
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
                    >
                      Xóa
                    </button>
                  )}
                </div>
                <div className="form-group">
                 <label>Nội dung câu hỏi</label>
                 <input
                  type="text"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
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
                    </div>
                  ))}
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
            <div className="randomize-order">
              <label>
                <input
                  type="checkbox"
                  checked={randomizeOrder}
                  onChange={(e) => setRandomizeOrder(e.target.checked)}
                />
                Randomize Order
              </label>
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