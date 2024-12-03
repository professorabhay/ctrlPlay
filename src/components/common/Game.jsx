import React from 'react'
import GameCard from './Game-Card'
import { sliderImages } from '../../utils/images';

const Game = () => {
  return (
    <div><section className="featured-games">
    <div className="container">
      <h2>Featured Games</h2>
      <div className="game-grid">
        <GameCard
          title="4 Cards"
          image="/placeholder.svg?height=300&width=300"
          playTime="2hrs played"
          rank="#3"
          recentPlayers={42}
        />
        <GameCard
          title="Cyber Rush"
          image="/placeholder.svg?height=300&width=300"
          playTime="5hrs played"
          rank="#1"
          recentPlayers={128}
        />
        <GameCard
          title="Neon Drift"
          image="/placeholder.svg?height=300&width=300"
          playTime="1hr played"
          rank="#5"
          recentPlayers={67}
        />
      </div>
    </div>
  </section></div>
  )
}

export default Game