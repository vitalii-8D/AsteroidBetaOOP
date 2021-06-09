import Ship from "./Ship";
import Asteroid from "./Asteroid";

class World {
   constructor(width = 800, height = 500) {
      this.background_color = 'rgba(20, 20, 20, 1)'

      this.friction = 0.95

      this.ship = new Ship()

      this.width = width
      this.height = height

      this.asteroids = [new Asteroid(width / 2, height / 2),
         new Asteroid(width / 2, height / 2),
         new Asteroid(width / 2, height / 2),
         new Asteroid(width / 2, height / 2),
         new Asteroid(width / 2, height / 2)]
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

   update() {
      this.ship.update()

      this.ship.velocity_x *= this.friction
      this.ship.velocity_y *= this.friction

      this.collideWorldBounds(this.ship)

      this.asteroids.forEach((ast, ast_index) => {
         ast.update()

         this.collideWorldBounds(ast)
         ast.collideWith(this.ship, () => { // check collision with the Ship
            console.log('Ship-Asteroid')
         })
         this.ship.lasers.forEach((laser, laser_index) => { // check collision with lasers
            ast.collideWith(laser, () => {
               this.hitAsteroid(ast_index, laser_index)
            })
         })

      })
   }

   hitAsteroid(ast_index, laser_index) {
      this.ship.deleteLaser(laser_index)
      this.deleteAsteroid(ast_index)
   }

   deleteAsteroid(index) {
      this.asteroids.splice(index, 1)
   }

}

export default World
