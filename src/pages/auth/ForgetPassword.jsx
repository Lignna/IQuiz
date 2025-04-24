import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/ForgetPassword.css';
import AuthAPI from '../../api/auth';
import Cookies from 'js-cookie';

const ForgetPassword = () => {
	const [username, setUsername] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [reEnterPassword, setReEnterPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');

		if (!username) {
			setError('Vui lòng nhập tên đăng nhập!');
			return;
		}
		if (!newPassword) {
			setError('Vui lòng nhập mật khẩu mới!');
			return;
		}
		if (newPassword !== reEnterPassword) {
			setError('Mật khẩu nhập lại không khớp!');
			return;
		}

		AuthAPI.handleResetPassword(username, newPassword)
			.then(res => {
				console.log("res.status: " + res.status)
				console.log("res.message: " + res.message);
				if (res.status === "success") {
					navigate('/sign-in');
				} else {
					setError(res.message);
				}
			})
			.catch (() => {
			console.error('Lỗi đổi mật khẩu');
			setError('Đổi mật khẩu không thành công!');
			})
	};

	useEffect(() => {
		const storedUsername = Cookies.get("username");
		console.log("storedUsername: " + storedUsername);
		if (storedUsername) {
			navigate("/home");
			return;
		}
}, []);

	return (
		<div className="forget-password-container">
			<div className="forget-password-card">
			<Link to="/sign-in" className="back-link">
				← Quay lại đăng nhập
			</Link>
			<div className="forget-password-form-container">
				<h2 className="forget-password-title">Khôi phục mật khẩu</h2>
				{error && <div className="forget-password-error">{error}</div>}
				<form onSubmit={handleSubmit} className="forget-password-form">
					<div className="form-group">
					<label htmlFor="username">Tên đăng nhập</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Nhập tên đăng nhập"
						required
					/>
					</div>
					<div className="form-group">
					<label htmlFor="newPassword">Mật khẩu mới</label>
					<input
						type="password"
						id="newPassword"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						placeholder="Nhập mật khẩu mới"
						required
					/>
					</div>
					<div className="form-group">
					<label htmlFor="reEnterPassword">Nhập lại mật khẩu</label>
					<input
						type="password"
						id="reEnterPassword"
						value={reEnterPassword}
						onChange={(e) => setReEnterPassword(e.target.value)}
						placeholder="Nhập lại mật khẩu mới"
						required
					/>
					</div>
					<button type="submit" className="forget-password-button">
					Xác nhận
					</button>
				</form>
			</div>
			</div>
		</div>
	);
};

export default ForgetPassword;