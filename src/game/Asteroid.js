import Collider from "./Collider";

const MAX_VERTICES = 16
const MIN_VERTICES = 5
const PRONGNESS = 1 // from 0 to 1
const ASTEROIDS_SPEED = 2

class Asteroid extends Collider {
   constructor(x, y) {
      super();

      this.radius = 40
      this.x = x
      this.y = y
      this.velocity_x = ASTEROIDS_SPEED * (Math.random() * 2 - 1)
      this.velocity_y = ASTEROIDS_SPEED * (Math.random() * 2 - 1)

      this.vertices = undefined
      this.irregularity = [] // values from 0.7 to 1.3

      this.init()
   }

   init() {
      this.vertices = Math.floor(Math.random() * (MAX_VERTICES - MIN_VERTICES) + MIN_VERTICES)

      for (let i = 0; i < this.vertices; i++) {
         const help = Math.random() * 0.8 * PRONGNESS // These formulas allow to get beautiful uneven Asteroids
         const prong = 1 + (Math.random() * help - help / 3) // which hitbox will optimal match the shape
         this.irregularity.push(prong)
      }
   }

   update() {
      this.x += this.velocity_x
      this.y += this.velocity_y
   }

   collapse() {

   }
}

export default Asteroid
