import Scene from "./Scene";
import {startPage, gameOverPage} from "../ui/Page";

import {GAME_STATES} from "../constants";

class Game {
   constructor(width = 1000, height = 700, container) {
      this.width = width
      this.height = height
      this.scene = new Scene(this.width, this.height)
      this.state = GAME_STATES.MENU

      this.hi_score = localStorage.getItem('hi-score') || 0

      this.container = container
      this.start_page = undefined
      this.game_over_page = undefined

      this.init()
   }
   init() {
      this.scene.asteroid_belt.addAsteroidsForDemo()

      this.start_page = startPage(this.start_game)
      this.game_over_page = gameOverPage(this.start_game)

      this.container.appendChild(this.start_page)
      this.container.appendChild(this.game_over_page)
      // this.game_over_page.style.width = '0px'
      this.game_over_page.style.display = 'none'
   }

   update(dt) {

      if (this.scene.lives === 0 && this.state === GAME_STATES.GAME) {
         this.state = GAME_STATES.GAME_OVER
         if (this.scene.score > this.hi_score) {
            this.hi_score = this.scene.score
            localStorage.setItem('hi-score', this.hi_score.toString())
         }
         this.game_over_page.querySelector('div.score').innerHTML = `Current score: ${this.scene.score}`
         // this.game_over_page.style.width = '100%'
         this.game_over_page.style.display = 'flex'
      }

      this.scene.update(dt)
   }

   start_game = () => {
      this.scene = new Scene(this.width, this.height)
      // this.start_page.style.width = '0px'
      this.start_page.style.display = 'none'
      // this.game_over_page.style.width = '0px'
      this.game_over_page.style.display = 'none'
      this.state = GAME_STATES.GAME
   }

}

export default Game
