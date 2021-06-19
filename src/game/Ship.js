import {distanceBetweenPoint} from "./Collider";
import {soundThrust, soundLaser, soundExplode} from "../sounds/SoundManager";

import {
   SHIP_MOVING_SPEED, SHIP_EXPLOSION_DUR,
   SHIP_ROTATION_SPEED, SHIP_UNVIS_BLINK_DUR,
   SHIP_UNVIS_NUM, LASER_SPEED, LASER_TRAVEL_DISTANCE
} from "../constants";

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

      this.shooting_system = new LaserGun()

      this.thrusting = false
      this.visible = true
      this.blink_number = SHIP_UNVIS_NUM
      this.blink_time = Math.floor(SHIP_UNVIS_BLINK_DUR * 30)

      this.is_dead = false
      this.death_timer = 0
   }

   collideWithAsteroid() {
      if (this.blink_number > 0) return undefined

      soundThrust.stop()
      this.thrusting = false
      soundExplode.play()

      this.is_dead = true
      this.velocity_x = 0
      this.velocity_y = 0
      this.death_timer = SHIP_EXPLOSION_DUR * 30
   }

   accelerate() {
      this.velocity_x += SHIP_MOVING_SPEED * Math.cos(this.angle)
      this.velocity_y -= SHIP_MOVING_SPEED * Math.sin(this.angle)
   }

   shoot() {
      soundLaser.play()
      this.shooting_system.emit(this.x, this.y, this.angle)
   }

   update() {
      this.shooting_system.update()

      if (this.death_timer > 0) {
         this.death_timer--
         return undefined
      }

      if (this.is_dead) return undefined

      if (this.blink_number > 0) {
         this.blink_time--

         if (this.blink_time === 0) {
            this.blink_number--
            if (this.blink_number === 0) {
               this.visible = false
            }
            this.blink_time = Math.floor(SHIP_UNVIS_BLINK_DUR * 30)
            this.visible = !this.visible
         }
      }

      this.x += this.velocity_x
      this.y += this.velocity_y

      if (distanceBetweenPoint(this.velocity_x, 0, this.velocity_y, 0) > SHIP_MOVING_SPEED * 4) {
         soundThrust.play()
         this.thrusting = true
      } else {
         soundThrust.stop()
         this.thrusting = false
      }

      this.angle += this.rotation * SHIP_ROTATION_SPEED * (2 * Math.PI / 360)
   }

}

class LaserGun {
   constructor() {
      this.lasers = []

      this.distance = 0
   }

   emit(x, y, ship_angle) {
      const laser = new SimpleLaser(x, y, 3, '#ff1111', ship_angle)

      this.lasers.push(laser)
   }

   update() {
      if (!this.lasers.length) return undefined

      for (let i = this.lasers.length - 1; i >= 0; i--) {
         this.lasers[i].update() // update laser`s position and distance
         if (this.lasers[i].distance > LASER_TRAVEL_DISTANCE) {
            this.deleteLaser(i) // delete unnecessary laser
         }
      }
   }

   deleteLaser(index) {
      this.lasers.splice(index, 1)
   }

}

class SimpleLaser {
   constructor(x, y, radius, color, ship_angle) {
      this.radius = radius
      this.color = color
      this.x = x + 4 / 3 * radius * Math.cos(ship_angle)
      this.y = y - 4 / 3 * radius * Math.sin(ship_angle)
      this.velocity_x = LASER_SPEED * Math.cos(ship_angle)
      this.velocity_y = -LASER_SPEED * Math.sin(ship_angle)
      this.distance = 0
   }

   update() {
      this.x += this.velocity_x
      this.y += this.velocity_y
      this.distance += distanceBetweenPoint(this.velocity_x, 0, this.velocity_y, 0)
   }
}


export default Ship
