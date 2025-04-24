import AuthAPI from "../api/auth";
import Cookies from "js-cookie";
import { useUserContext } from "../context/UserContext";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const LogoutBtn = () => {
	const userCtx = useUserContext();
	const navigate = useNavigate();

	const handleLogout = () => {
		AuthAPI.handleLogout()
			.then((res) => {
				Cookies.remove("username");
				userCtx.clear();
				navigate("/sign-in");
			})
			.catch(() => {
				console.error("Đăng xuất thất bại!");
			});
	};

	return (
		<button
			className="logout-button"
			onClick={handleLogout}
			aria-label="Đăng xuất"
		>
			<FontAwesomeIcon icon={faRightFromBracket} className="logout-icon" />
		</button>
	);
}

export default LogoutBtn;