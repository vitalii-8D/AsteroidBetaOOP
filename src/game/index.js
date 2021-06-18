import Scene from "./Scene";
import {startPage, gameOverPage} from "../ui/Page";

const GAME_STATES = {
   MENU: 'menu',
   GAME: 'game',
   GAME_OVER: 'game_over'
}

class Game {
   constructor(width = 1000, height = 700, container) {
      this.width = width
      this.height = height
      this.scene = new Scene(this.width, this.height)
      this.state = GAME_STATES.MENU

      this.container = container
      this.start_page = undefined
      this.game_over_page = undefined

      this.init()
   }
   init() {
      this.start_page = startPage(this.start_game)
      this.game_over_page = gameOverPage(this.start_game)
      console.log(this.start_page);

      this.container.appendChild(this.start_page)
      this.container.appendChild(this.game_over_page)
      this.game_over_page.style.width = '0px'
   }

   update(dt) {

      if (this.scene.lives === 0 && this.state === GAME_STATES.GAME) {
         this.state = GAME_STATES.GAME_OVER
         this.game_over_page.style.width = '100%'
      }

      this.scene.update(dt)
   }

   start_game = () => {
      this.scene = new Scene(this.width, this.height)
      this.start_page.style.width = '0px'
      this.game_over_page.style.width = '0px'
      this.state = GAME_STATES.GAME
   }

}

export default Game
