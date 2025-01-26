import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import './Home.css';
import Footer from './Footer';

const cardData = [
  {
    title: "G2",
    description: "G2 is an upcoming Indian Telugu-language action spy thriller film directed by Vinay Kumar Sirigineedi in his directorial debut. It is a sequel to Goodachari (2018), with Adivi Sesh reprising his role. The film also stars Emraan Hashmi and Madhu Shalini.",
    image: "https://assets.gadgets360cdn.com/pricee/assets/product/202302/Goodachari-2_1675418866.jpeg",
  },
  {
    title: "SSMB29",
    description: "The highly anticipated film SSMB29 is expected to kick off production in January 2025, with director SS Rajamouli already traveling the globe in search of filming locations. While Mahesh Babu's involvement is confirmed, other cast members have yet to be officially announced, though several names are being speculated.",
    image: "https://english.rtvlive.com/wp-content/uploads/2024/10/SSMB29-585x568.jpeg",
  },
  {
    title: "Salaar 2",
    description: "Salaar 2: Shouryanga Parvam is the highly anticipated sequel to Salaar: Ceasefire, directed by Prashanth Neel and starring Prabhas. Following the massive success of the first installment in December 2023, which grossed over ₹617 crore globally, the sequel is set to escalate the stakes and explore themes of power, betrayal, and the clash of friendships.",
    image: "https://image.tmdb.org/t/p/original/mNHdClul57prczb5O0krrzyonnn.jpg",
  },
  {
    title: "Bachhala Mallia",
    description: "Bachchala Malli is an upcoming Telugu-language action drama film directed by Subbu Mangadevi[3] and starring Allari Naresh and Hari Teja in the lead roles.[4] Produced by Razesh Danda and Balaji Gutta under the banner of Hasya Movies, set against the backdrop of the 1990s, the film is set for a worldwide theatrical release on 20 December 2024.",
    image: "https://assetscdn1.paytm.com/images/cinema/Bachhala-Malli-71792c10-2c7f-11ef-823e-c1c5dc58e6ec.jpg",
  },
];

const Home = () => {
  return (
    <div className="HMCON">
      {/* Navbar */}
      <nav className="Hnavbar">
        <div className="Hnavbar-brand">
          <img src="/img/logo2.png" alt="MyApp Logo" className="Hnavbar-logo" />
        </div>
        <ul className="Hnavbar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Register
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <img
            src="/img/About.jpg"
            alt="About us"
            className="about-image"
          />
          <div className="about-text">
            <h2>About Us</h2>
            <p>
              Welcome to MovieHub, your ultimate destination for discovering the latest and greatest in the world of cinema. Our platform brings you exclusive updates, trailers, and insights into upcoming movies. Whether you're a fan of action, drama, or thrillers, we've got something for everyone. Explore, engage, and get excited about the magic of movies with us!
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Movies Section */}
      <h2>Upcoming Movies</h2>
      <div className="cardiv">
        {cardData.map((card, index) => (
          <Card key={index} sx={{ maxWidth: 345 }}>
            <CardActionArea className='cardcon'>
              <CardMedia
                component="img"
                height="100"
                image={card.image}
                alt={card.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
