import Ship from "./Ship";
import AsteroidBelt from "./Asteroid";
import Collider ,{distanceBetweenPoint} from "./Collider";
import Particles from "./Particles";

const START_ASTEROID_NUMBER = 8

class Scene extends Collider {
   constructor(width , height ) {
      super()

      this.background_color = 'rgba(20, 20, 20, 1)'

      this.friction = 0.95

      this.ship = undefined
      this.explode_particles = new Particles()

      this.width = width
      this.height = height

      this.asteroid_belt = new AsteroidBelt(width, height)

      this.init()
   }

   init() {
      this.createShip()
      this.asteroid_belt.init()
   }

   update() {
      this.ship.update()

      if (this.ship.is_dead && this.ship.death_timer === 0) {
         this.createShip()
      }

      this.ship.velocity_x *= this.friction
      this.ship.velocity_y *= this.friction

      this.collideWorldBounds(this.ship)

      this.checkCollisionBetween(this.ship, this.asteroids, (message) => {
         this.ship.collideWithAsteroid()
      })
      this.checkCollisionBetween(this.asteroids, this.ship.shooting_system.lasers, (message) => {
         console.log('Lasers & asteroids');
      })

      for (let ast_index = this.asteroids.length - 1; ast_index >=0; ast_index--) {
         const ast = this.asteroids[ast_index]

         ast.update()

         this.collideWorldBounds(ast)

         ast.collideWith(this.ship, () => { // check collision with the Ship
            this.shipCollision()
         })

         ast.collideWith(this.ship.shooting_system.lasers, (ast, laser, laser_index) => {
            this.hitAsteroid(ast, laser, ast_index, laser_index)
         })
      }

      this.explode_particles.update()
   }

   collideWorldBounds(object) {
      const half_radius = object.radius / 2

      if (object.x + half_radius < 0) {
         object.x = this.width + half_radius;
      } else if (object.x - half_radius > this.width) {
         object.x = -half_radius;
      }
      if (object.y + half_radius < 0) {
         object.y = this.height + half_radius;
      } else if (object.y - half_radius > this.height) {
         object.y = -half_radius;
      }
   }

   hitAsteroid(ast, laser, ast_index, laser_index) {
      this.ship.shooting_system.deleteLaser(laser_index)

      if (ast.type !== 'small') {
         const new_asteroids = asteroidsFactory.collapse(ast.x, ast.y, ast.type)
         this.asteroids.push(...new_asteroids)
      }

      this.explode_particles.emit(ast.x, ast.y)
      this.deleteAsteroid(ast_index)
   }

   deleteAsteroid(index) {
      this.asteroids.splice(index, 1)
   }

   createShip() {
      this.ship = new Ship(this.width / 2, this.height / 2)

      // Template for asteroids pushing away
      // this.asteroids.forEach(ast => {
      //    const dist = distanceBetweenPoint(this.width / 2, ast.x, this.height / 2, ast.y)
      //    if (dist < 100) {
      //       ast.velocity_x = (ast.x - this.width / 2) / dist
      //       ast.velocity_y = (ast.y - this.height / 2) / dist
      //    }
      // })
   }

   // shipCollision() {
   //    if (this.ship.blink_number > 0) return undefined
   //    this.ship.death()
   // }

   createAsteroids() {
      const {x, y} = this.ship

      for (let i = 0; i < START_ASTEROID_NUMBER; i++) {
         let ax = x
         let ay = y

         do {
            ax = Math.floor(Math.random() * this.width)
            ay = Math.floor(Math.random() * this.height)
         } while (distanceBetweenPoint(x, ax, y, ay) < 200)

         const new_asteroid = asteroidsFactory.random(ax, ay)
         this.asteroids.push(new_asteroid)
      }
   }

}

export default Scene
