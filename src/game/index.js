import Scene from "./Scene";

const GAME_STATES = {
   MENU: 'menu',
   GAME: 'game',
   GAME_OVER: 'game_over'
}

class Game {
   constructor(width = 1000, height = 700) {
      this.width = width
      this.height = height
      this.scene = new Scene(width, height)
   }

   update(dt) {
      this.scene.update(dt)
   }

}

export default Game
