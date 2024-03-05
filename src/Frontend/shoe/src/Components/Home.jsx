import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Features from './Utils/Features';
import BestSeller from './Utils/BestSeller';
import About from './Utils/About';

const Home = ({handleSetUserId}) => {
  const location = useLocation();
  const userId = location.state && location.state.userId;
  handleSetUserId(userId);
  const [selectedCard, setSelectedCard] = useState(null);
  const [latestVisits, setLatestVisits] = useState([]); // Use state to manage latestVisits
  const [bestseller, setBestSeller] = useState([]);

  const handleCardClick = (card) => {
    // console.log(card);
    setSelectedCard(card);
    postCardData(card);
  }
  const AddedToCart = async (card) => {
    const data_to_post = {
      user: userId,
      product: card,
      quantity: 1,
    };
    try {
      const res = await axios.post(`http://127.0.0.1:3000/bags/${userId}`, data_to_post);
      if (res.status === 200) {
        alert('Added to cart!');
      }
    } catch (err) {
      console.error(err);
    }
  }
  const postCardData = async (card) => {
    const date_now = new Date().toISOString();
    const data_to_post = {
      user: userId,
      product: card._id,
      timestamp: date_now
    };
    // console.log(data_to_post);
    try {
      const res = await axios.post(`http://127.0.0.1:3000/home/${userId}`, data_to_post);
      // Update latestVisits state with the new data
      setLatestVisits(prevVisits => [...prevVisits, res.data]);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/home/${userId}`);
        // console.log(response.data);
        // Convert the object values into an array
        const dataArray = Object.values(response.data);
        // Update latestVisits state with the fetched data
        setLatestVisits(dataArray);
        // console.log(latestVisits);
      } catch (error) {
        console.error('Error fetching latest visits:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const getBestsellers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/home/product");
        setBestSeller(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getBestsellers();
  }, []);

  return (
    <div id="home">
      <Navbar />
      <About selectedCard={selectedCard} AddedToCart={AddedToCart} />
      <Features onCardClick={handleCardClick} latestVisits={latestVisits} />
      <BestSeller onCardClick={handleCardClick} bestseller={bestseller} />
    </div>
  );
};

export default Home;
