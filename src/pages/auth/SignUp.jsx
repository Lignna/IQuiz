import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/SignUp.css';
import AuthAPI from '../../api/auth';

const SignUp = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        console.log("username: " + username)
        console.log("password: " + password)

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp!');
            return;
        }

        AuthAPI.handleSignUp(username, password)
            .then(res => {
                if (res.status === "success") {
                    navigate('/home');
                } else {
                    setError(res.message);
                }
            })

        // if (password !== confirmPassword) {
        //     setError('Mật khẩu xác nhận không khớp!');
        //     return;
        // }

        // try {
        //     console.log('Đăng ký với: ', username, password);

        //     if (username && password) {
                
        //         console.log("Đăng ký thành công!");
        //         navigate('/home'); 
        //     } else {
        //         setError('Vui lòng nhập đầy đủ thông tin!');
        //     }
        // } catch (err) {
        //     console.error("Lỗi đăng ký: ", err);
        //     setError('Đăng ký không thành công!');
        // }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-form-container">
                    <h2 className="signup-title">Đăng ký tài khoản</h2>
                    
                    {error && <div className="signup-error">{error}</div>}
                    
                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-group">
                            <label htmlFor="username">Tên đăng nhập</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Nhập tên đăng nhập của bạn"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Nhập lại mật khẩu"
                                required
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="signup-button-v2"
                            
                        >
                            Đăng ký
                        </button>
                        
                        <div className="signup-options">
                            <Link to="/sign-in" className="signin-link">
                                Đã có tài khoản? Đăng nhập
                            </Link>
                            <Link to="/forget-password" className="forget-password">
                                Quên mật khẩu?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
