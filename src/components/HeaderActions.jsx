import { useState } from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

const HeaderActions = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
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
						<Link
                    to="/createbyAI"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Tạo quiz bằng AI
                  </Link>
                </div>
              )}
            </div>
            <LogoutBtn />
          </div>
	);
}

export default HeaderActions;