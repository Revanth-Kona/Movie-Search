import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Footer from './Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

  // Check if the user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLogin');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    navigate('/login');
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/data.json');
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredMovies([]);
    } else {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [searchTerm, movies]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Conditional rendering for errors or loading state
  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error fetching movies: {error.message}</p>;

  return (
    <div className="Das-container">
      {/* Navbar component */}
      <nav className="Das-navbar">
        <div className="-Das-navbar-brand">
          <img src="/img/logo2.png" alt="MyApp Logo" className="Das-navbar-logo" />
        </div>
        <ul className="Das-navbar-links">
          <li>
            <input
              className="Das-navbar-search"
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="avatar-dropdown">
            <img
              src="/img/avatar.jpg"
              alt="User Avatar"
              className="avatar"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => navigate('/profile')}>View Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        </ul>
      </nav>
      {/* Main Card component */}
      <main className="Das-content">
        {!searchTerm && (
          <>
            <h1>Explore Your Favorite Movies</h1>
            <div className="movie-cards">
              {movies
                .sort(() => Math.random() - 0.5)
                .slice(0, 4)
                .map((movie, index) => (
                  <div key={index} className="movie-card">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="movie-image"
                    />
                    <h3>{movie.title}</h3>
                    <p><strong>Description:</strong> {movie.description}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Director:</strong> {movie.director}</p>
                    <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
                    <a
                      href={movie.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="movie-trailer-link"
                    >
                      Watch Trailer
                    </a>
                    <Stack spacing={1} className="rating">
                      <Rating
                        name={`rating-${movie.title}`}
                        defaultValue={movie.rating || 3.5}
                        precision={0.5}
                        className="custom-rating"
                      />
                    </Stack>
                  </div>
                ))}
            </div>
          </>
        )}

        {/* Render search results if searchTerm is not empty */}
        {searchTerm && filteredMovies.length > 0 ? (
          <ul className="card">
            {filteredMovies.map((movie, index) => (
              <li key={index}>
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  style={{ width: '200px', height: '300px', objectFit: 'cover' }}
                />
                <h2>{movie.title}</h2>
                <p>
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p>
                  <strong>Director:</strong> {movie.director}
                </p>
                <p>
                  <strong>Cast:</strong> {movie.cast.join(', ')}
                </p>
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Trailer
                </a>
                <Stack spacing={1} className="rating">
                  <Rating
                    name="half-rating"
                    defaultValue={2.5}
                    precision={0.5}
                    className="custom-rating"
                  />
                </Stack>
              </li>
            ))}
          </ul>
        ) : (
          searchTerm && <p>No movies found.</p>
        )}
      </main>
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default Dashboard;
