import World from "./World";

class Game {
   constructor() {
      this.world = new World()
   }

   update() {
      this.world.update()
   }

}

export default Game
