import react from 'react';
import './style/SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthAPI from '../../api/auth';
import { useUserContext } from '../../context/UserContext';

const SignIn = () => {
    const [username, setUsername] = react.useState('');
    const [password, setPassword] = react.useState('');
    const [error, setError] = react.useState('');
    const userCtx = useUserContext();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        console.log("username: " + username)
        console.log("password: " + password)

        AuthAPI.handleSignIn(username, password)
            .then(res => {
                console.log("res.status: " + res.status)
                console.log("res.message: " + res.message);
                if (res.status === "success") {
                    userCtx.init(username)
                    navigate('/home');
                } else {
                    setError(res.message);
                }
            })
    };
    return (
        <div className="signin-container">
            <div className='signin-card'>
                <div className='signin-left'>
                    <div className="signin-welcome">
                        <h2>Chào mừng trở lại!</h2>
                        <p>Đăng nhập để tiếp tục hành trình học tập và sáng tạo của bạn với các bài quiz và flashcard.</p>
                    </div>
                </div>
                <div className='signin-right'>
                    <div className="signin-form-container">
                        <h2 className="signin-title">Đăng nhập</h2>

                        {error && <div className="signin-error">{error}</div>}

                        <form onSubmit={handleSubmit} className="signin-form" >
                            <div className="form-group">
                                <label htmlFor="username">Tên đăng nhập</label>
                                <input
                                    type="username"
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
                            <button type="submit" className="signin-button">
                                Đăng nhập
                            </button>
                            <Link to="/sign-up" className="signup-button">
                                Đăng ký
                            </Link>
                            <Link to="/forget-password" className="forget-password">
                                Quên mật khẩu?
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default SignIn;