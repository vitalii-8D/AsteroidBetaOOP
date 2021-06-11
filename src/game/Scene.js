import Ship from "./Ship";
import AsteroidBelt from "./Asteroid";
import Collider ,{distanceBetweenPoint} from "./Collider";
import Particles from "./Particles";

const MAX_LIVES = 3

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
      this.asteroid_belt.update()

      if (this.ship.is_dead && this.ship.death_timer === 0) {
         this.createShip()
      }

      this.ship.velocity_x *= this.friction
      this.ship.velocity_y *= this.friction

      this.collideWorldBounds(this.ship)
      this.asteroid_belt.asteroids.forEach(ast => {
         this.collideWorldBounds(ast)
      })

      this.checkCollisionBetween(this.ship, this.asteroid_belt.asteroids, (ship, ast, ast_index) => {
         this.ship.collideWithAsteroid()
         this.asteroid_belt.hitAsteroid(ast, ast_index)

         this.explode_particles.emit(ast.x, ast.y)
      })
      this.checkCollisionBetween(this.asteroid_belt.asteroids, this.ship.shooting_system.lasers, (ast, ast_index, laser, laser_index) => {
         this.asteroid_belt.hitAsteroid(ast, ast_index)
         this.ship.shooting_system.deleteLaser(laser_index)

         this.explode_particles.emit(ast.x, ast.y)
      })

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

}

export default Scene
