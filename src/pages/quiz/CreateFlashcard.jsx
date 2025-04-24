import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { faTrash, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style/CreateFlashcard.css';
import LogoutBtn from '../../components/LogoutBtn';
import HeaderActions from '../../components/HeaderActions';
import FlashcardAPI from '../../api/flashcard';

const CreateFlashcard = () => {
	const navigate = useNavigate();
	const { uuid } = useParams();
	const [title, setTitle] = useState("")
	const [cards, setCards] = useState([{
		front: "",
		back: ""
	}])
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const location = useLocation();
	const { quizCards, quizTitle } = location.state || {};

	useEffect(() => {
		console.log("uuid: " + uuid)
		if (uuid) {
			FlashcardAPI.getQuiz(uuid)
			.then(res => {
				setTitle(res.data.title);
				setCards(res.data.questions)
			})
		} else if (quizCards || quizTitle) {
			setTitle(quizTitle)
			setCards(quizCards)
		}
	}, []);

	const onAddNewQuestion = () => {
		setCards((prevData) => [...prevData, {front: "", back: ""}])
	};

	const handleCardChange = (index, field, value) => {
		const newCards = [...cards];

		newCards[index][field] = value;
		setCards(newCards)
	};

	const onRemoveCard = (index) => {
		if (cards.length > 1) {
			setCards(cards => cards.filter((_, i) => i !== index));
		}
	};

	const onSaveQuiz = (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');


		if (!title.trim()) {
			setError('Vui lòng nhập tiêu đề flashcard.');
			return;
		}
		for (let card of cards) {
			if (!card.front.trim() || !card.back.trim()) {
			setError('Vui lòng nhập cả mặt trước và mặt sau cho tất cả flashcard.');
			return;
			}
		}

		if (uuid) {
			FlashcardAPI.updateQuiz(uuid, title, cards)
				.then(res => {
					navigate('/home');
				})
		} else {
			FlashcardAPI.createQuiz(title, cards)
			.then(res => {
				navigate('/home');
			})
		}

	};

	const closeErrorPopup = () => {
		setError('');
	};

	return (
		<div className="home-container">
			<div className="home-card">
			<header className="home-header">
				<h2 className="home-welcome">Tạo Flashcard</h2>
				<HeaderActions />
			</header>
			<div className="create-flashcard-content">
				{error && (<div className="error-popup-overlay">
					<div className="error-popup">
					<p className="error-popup-message">{error}</p>
					<button
						className="error-popup-close-button"
						onClick={closeErrorPopup}
						aria-label="Đóng thông báo lỗi"
					>
						Đóng
					</button>
					</div>
				</div>
				)}
				{success &&
					<div className="success-popup-overlay">
					<div className="success-popup">
						<p className="success-popup-message">{success}</p>
					</div>
					</div>}
				<form onSubmit={onSaveQuiz}>
					<div className="form-group">
					<label>Tiêu đề Flashcard</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Nhập tiêu đề flashcard"
					/>
					</div>
					{cards.map((card, index) => (
					<div key={index} className="flashcard-block">
						<div className="flashcard-header">
							<h3>Card {index + 1}</h3>
							{cards.length > 1 && (
							<button
								type="button"
								className="remove-flashcard-button"
								onClick={() => onRemoveCard(index)}
								aria-label="Xóa câu hỏi"
							>
								<FontAwesomeIcon icon={faTrash} className="trash-icon" />
							</button>
							)}
						</div>

						<div className="form-group">
							<label>Mặt Trước</label>
							<input
							value={card.front}
							onChange={(e) => handleCardChange(index, 'front', e.target.value)}
							placeholder="Nhập mặt trước"
							/>
						</div>
						<div className="form-group">
							<label>Mặt Sau</label>
							<input
							value={card.back}
							onChange={(e) => handleCardChange(index, 'back', e.target.value)}
							placeholder="Nhập mặt sau"
							/>
						</div>
					</div>
					))}
					<div className="add-flashcard">
					<button
						type="button"
						className="add-flashcard-button"
						onClick={onAddNewQuestion}
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