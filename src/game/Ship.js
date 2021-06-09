import Collider from "./Collider";

const SHIP_MOVING_SPEED = 1
const SHIP_ROTATION_SPEED = 5
const LASER_SPEED = 10
const LASER_TRAVEL_DISTANCE = 300

class Ship {
   constructor(x = 100, y = 50) {
      this.color = '#ffddff'
      this.radius = 20

      this.x = x
      this.y = y

      this.angle = 90 / 180 * Math.PI
      this.rotation = 0 // rotation side flag

      this.velocity_x = 0
      this.velocity_y = 0

      this.lasers = []
   }

   accelerate() {
      this.velocity_x += SHIP_MOVING_SPEED * Math.cos(this.angle)
      this.velocity_y -= SHIP_MOVING_SPEED * Math.sin(this.angle)
   }

   addLaser() {
      this.lasers.push(new Laser(this.x, this.y, this.radius, this.angle))
   }

   deleteLaser(index) {
      this.lasers.splice(index, 1)
   }

   update() {
      this.x += this.velocity_x
      this.y += this.velocity_y

      // this.angle += this.rotation * 5 / 180 * Math.PI
      this.angle += this.rotation * SHIP_ROTATION_SPEED * (2 * Math.PI / 360)

      for (let i = this.lasers.length - 1; i >= 0; i--) {
         this.lasers[i].update() // update laser`s position and distance
         if (this.lasers[i].distance > LASER_TRAVEL_DISTANCE) { // delete unnecessary laser
            this.deleteLaser(i)
         }
      }

      this.lasers.forEach(laser => {
         laser.update()
      })
   }

}

class Laser {
   constructor(x, y, radius, angle) {
      this.color = '#ff1111'
      this.radius = 3

      this.x = x + 4 / 3 * radius * Math.cos(angle)
      this.y = y - 4 / 3 * radius * Math.sin(angle)
      this.velocity_x = LASER_SPEED * Math.cos(angle)
      this.velocity_y = -LASER_SPEED * Math.sin(angle)

      this.distance = 0
   }

   update() {
      this.x += this.velocity_x
      this.y += this.velocity_y

      this.distance += Math.sqrt(this.velocity_x ** 2 + this.velocity_y ** 2)
   }
}


export default Ship
