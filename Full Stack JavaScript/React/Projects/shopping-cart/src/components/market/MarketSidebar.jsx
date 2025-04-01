import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faChevronDown,
  faChevronUp,
  faChartLine,
  faFire,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../../styles/market/MarketSidebar.css';

export default function MarketSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleDropdown = (e, menu) => {
    e.preventDefault(); // Prevent navigation when clicking the dropdown toggle
    e.stopPropagation(); // Prevent event bubbling
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* Sidebar Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      <ul className="menu">
        {/* General Dropdown */}
        <li className="menu-item dropdown">
          <div className="menu-link-container">
            <Link to="./general" className="menu-link">
              <FontAwesomeIcon icon={faChartLine} />
              {isOpen && <span>General</span>}
            </Link>

            {isOpen && (
              <button
                className="dropdown-toggle"
                onClick={(e) => toggleDropdown(e, 'general')}
              >
                <FontAwesomeIcon
                  icon={
                    dropdownOpen === 'general' ? faChevronUp : faChevronDown
                  }
                  className="dropdown-icon"
                />
              </button>
            )}
          </div>

          {dropdownOpen === 'general' && (
            <ul className="submenu">
              <li>
                <Link to="/market/apparel">
                  <FontAwesomeIcon icon={faFire} /> Apparel
                </Link>
              </li>
              <li>
                <Link to="/market/accessories">
                  <FontAwesomeIcon icon={faUserTie} /> Accessories
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
