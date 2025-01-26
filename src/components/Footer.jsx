import React from 'react'
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <div>
      <footer className="Das-footer">
        <div className="Das-footer-content">
          <p>&copy; 2024 MyApp. All rights reserved.</p>
          <ul className="footer-links">
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'active-footer-link' : ''
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'active-footer-link' : ''
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy"
                className={({ isActive }) =>
                  isActive ? 'active-footer-link' : ''
                }
              >
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Footer
