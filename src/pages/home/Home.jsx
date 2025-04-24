
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import './style/Home.css';
import { useUserContext } from '../../context/UserContext';
import WebAPI from '../../api/web';
import Cookies
 from 'js-cookie';
import HeaderActions from '../../components/HeaderActions';
import FlashcardAPI from '../../api/flashcard';

const Home = () => {
	const [activeTab, setActiveTab] = useState('mcq');
	const [quizzes, setQuizzes] = useState([]);
	const [multipleChoices, setMultipleChoices] = useState(null);
	const [flashcards, setFlashcards] = useState(null);
	const userCtx = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		const storedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
		setQuizzes(storedQuizzes);
	}, []);

	const handleDeleteQuiz = (uuid) => {
		if (activeTab === 'mcq') {
			setMultipleChoices((quizzes) => quizzes.filter(quiz => quiz.uuid !== uuid))
		} else {
			FlashcardAPI.deleteQuiz(uuid)
				.then(res => {
					setFlashcards((quizzes) => quizzes.filter(quiz => quiz.uuid !== uuid))
				})
		}
	};

	const handleEditQuiz = (uuid) => {
		if (activeTab === 'mcq') {
			navigate(`/create-mcq/${uuid}`);
		} else {
			navigate(`/create-flashcard/${uuid}`);
		}
	};

	const handleQuizClick = (quiz) => {
		if (activeTab === 'mcq') {
			navigate(`/mcqs/${quiz.uuid}`);
		} else {
			navigate(`/flashcards/${quiz.uuid}`);
		}
	};

	useEffect(() => {
		const username = Cookies.get("username");

		if (!username) {
			navigate("/sign-in");
			return;
		}

		WebAPI.getHomeData().then((res) => {
			userCtx.init(res.user.username);
			setMultipleChoices(res.multipleChoices);
			setFlashcards(res.flashcards);
		});
	}, []);



	return (
		<div className="home-container">
		<div className="home-card">
			<header className="home-header">
				<h2 className="home-welcome">Chào mừng, {userCtx.username}</h2>
				<HeaderActions />
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
					multipleChoices?.length ?? 0 > 0 ? (
						multipleChoices.map((quiz) => (
						<div key={quiz.id}
						className="quiz-card"
						onClick={() => handleQuizClick(quiz)} >
							<h3>{quiz.title}</h3>
							<div className="quiz-actions">
								<button
								className="quiz-action-button edit-button"
								onClick={(e) => {
									e.stopPropagation();
									handleEditQuiz(quiz.uuid);
								}}
								aria-label="Chỉnh sửa quiz"
								>
								<FontAwesomeIcon icon={faPencil} />
								</button>
								<button
								className="quiz-action-button delete-button"
								onClick={(e) => {
									e.stopPropagation();
									handleDeleteQuiz(quiz.uuid);
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
					flashcards?.length ?? 0 > 0 ? (
						flashcards.map((quiz) => (
						<div key={quiz.id}
						className="quiz-card"
						onClick={() => handleQuizClick(quiz)}>
							<h3>{quiz.title}</h3>
							<div className="quiz-actions">
								<button
								className="quiz-action-button edit-button"
								onClick={(e) => {
									e.stopPropagation();
									handleEditQuiz(quiz.uuid)}}
								aria-label="Chỉnh sửa flashcard"
								>
								<FontAwesomeIcon icon={faPencil} />
								</button>
								<button
								className="quiz-action-button delete-button"
								onClick={(e) => {
									e.stopPropagation();
									handleDeleteQuiz(quiz.uuid);
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
