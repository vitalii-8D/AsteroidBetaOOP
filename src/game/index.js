import Scene from "./Scene";

class Game {
   constructor(width = 1200, height = 800) {
      this.width = width
      this.height = height
      this.scene = new Scene(width, height)
   }

   update(dt) {
      this.scene.update(dt)
   }

}

export default Game
