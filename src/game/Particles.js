const PARTICLES_NUMBER = 10
const PARTICLES_SPEED = 10
const PARTICLES_MAX_RADIUS = 3
const PARTICLES_MAX_TRAVEL_DISTANCE = 100

class Particles {
   constructor() {
      this.color = 'orange'
      this.number = PARTICLES_NUMBER
      this.max_distance = PARTICLES_MAX_TRAVEL_DISTANCE
      this.max_distances = []
      this.coordinates = []
      this.velocities = []
      this.distances = []
      this.sizes = []
   }

   emit(x, y) {
      for (let i = 0; i < this.number; i++) {
         this.coordinates.push([x, y])
         // this.velocities.push([(Math.random() * PARTICLES_SPEED * 0.5 + PARTICLES_SPEED * 0.5) * Math.round(Math.random() * 2.8 - 1.4) , (Math.random() * PARTICLES_SPEED * 0.5 + PARTICLES_SPEED * 0.5) * Math.round(Math.random() * 2.8 - 1.4)])
         this.velocities.push([(Math.random() * 2 - 1) * PARTICLES_SPEED , (Math.random() * 2 - 1) * PARTICLES_SPEED])
         this.max_distances.push(Math.random() * (this.max_distance - this.max_distance * 0.4) + this.max_distance * 0.4)
         this.distances.push(0)
         this.sizes.push(Math.random() < 0.2 ? PARTICLES_MAX_RADIUS : Math.random() < 0.4 ? Math.ceil(PARTICLES_MAX_RADIUS * 0.6) : Math.ceil(PARTICLES_MAX_RADIUS * 0.3))
      }
   }

   update() {
      if (!this.coordinates.length) return undefined

      for (let i = this.coordinates.length - 1; i >= 0; i--) {
         this.coordinates[i][0] += this.velocities[i][0]
         this.coordinates[i][1] += this.velocities[i][1]

         this.distances[i] += Math.sqrt(this.velocities[i][0] ** 2 + this.velocities[i][1] ** 2)

         if (this.distances[i] >= this.max_distances[i]) {
            this.coordinates.splice(i, 1)
            this.max_distances.splice(i, 1)
            this.velocities.splice(i, 1)
            this.distances.splice(i, 1)
            this.sizes.splice(i, 1)

         }
      }

   }
}

export default Particles
