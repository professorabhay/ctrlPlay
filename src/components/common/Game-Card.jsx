import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaTrophy, FaUsers } from 'react-icons/fa';
import './Game.css';

const GameCard = ({ title, image, playTime, rank, recentPlayers }) => {
  return (
    <motion.div
      className="game-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={image} alt={title} className="game-image" />
      <div className="game-info">
        <h3>{title}</h3>
        <div className="game-stats">
          <div className="stat">
            <FaClock />
            <span>{playTime}</span>
          </div>
          <div className="stat">
            <FaTrophy />
            <span>{rank}</span>
          </div>
          <div className="stat">
            <FaUsers />
            <span>{recentPlayers} players</span>
          </div>
        </div>
      </div>
      <motion.button
        className="btn btn-primary play-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Play Now
      </motion.button>
    </motion.div>
  );
};

export default GameCard;

