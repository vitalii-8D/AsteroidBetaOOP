import Collider, {distanceBetweenPoint} from "./Collider";

const MAX_VERTICES = 16
const MIN_VERTICES = 5
const PRONGNESS = 1 // from 0 to 1
const ASTEROIDS_SPEED = 2

const SML_AST_POINTS = 500
const SML_AST_RADIUS = 15
const MED_AST_POINTS = 300
const MED_AST_RADIUS = 25
const LRG_AST_POINTS = 100
const LRG_AST_RADIUS = 40

const PARTICLES_NUMBER = 20
const PARTICLES_SPEED = 10
const PARTICLES_MAX_RADIUS = 5
const PARTICLES_MAX_TRAVEL_DISTANCE = 100

class Asteroid extends Collider {
   constructor(x, y) {
      super();

      // this.radius = 40
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
}

class SmallAsteroid extends Asteroid {
   constructor(x, y) {
      super(x, y);
      this.radius = SML_AST_RADIUS
      this.points = SML_AST_POINTS
   }
}

class MediumAsteroid extends Asteroid {
   constructor(x, y) {
      super(x, y);
      this.radius = MED_AST_RADIUS
      this.points = MED_AST_POINTS
   }
}

class LargeAsteroid extends Asteroid {
   constructor(x, y) {
      super(x, y);
      this.radius = LRG_AST_RADIUS
      this.points = LRG_AST_POINTS
   }
}

class AsteroidFactory {
   static list = {
      small: SmallAsteroid,
      medium: MediumAsteroid,
      large: LargeAsteroid
   }

   create(x, y, type = 'small') {
      const Asteroid = AsteroidFactory.list[type] || AsteroidFactory.list['small']
      const asteroid = new Asteroid(x, y)
      asteroid.type = type

      return asteroid
   }

   collapse(x, y, type) {
      if (type === 'medium') {
         return [this.create(x, y), this.create(x, y)]
      }
      if (type === 'large') {
         return [this.create(x, y, 'medium'), this.create(x, y, 'medium')]
      }

      return undefined
   }

   random(w, h, x, y) {
      const random = Math.random()
      let ax = x
      let ay = y

      if ((!ax || !ay && w && h)) {
         [ax, ay] = randomizer(w, h)
      }

      if (random < 0.35) {
         return this.create(ax, ay, 'large')
      }
      if (random > 0.55) {
         return this.create(ax, ay, 'medium')
      }

      return this.create(ax, ay)
   }

}

const randomizer = (w, h) => {
   let ax, ay

   if (Math.random() * 2 < 1) {
      ax = Math.random() * 2 < 1 ? -LRG_AST_RADIUS : w + LRG_AST_RADIUS
      ay = Math.random() * h
   } else {
      ax = Math.random() * w
      ay = Math.random() * 2 < 1 ? -LRG_AST_RADIUS : h + LRG_AST_RADIUS
   }

   return [ax, ay]
}

class Particles {
   constructor() {
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
         this.velocities.push([(Math.random() * 2 - 1) * PARTICLES_SPEED, (Math.random() * 2 - 1) * PARTICLES_SPEED])
         this.max_distances.push(Math.random() * (this.max_distance - this.max_distance * 0.4) + this.max_distance * 0.4)
         this.distances.push(0)
         this.sizes.push(Math.random() < 0.2 ? PARTICLES_MAX_RADIUS : Math.random() < 0.4 ? Math.ceil(PARTICLES_MAX_RADIUS * 0.6) : Math.ceil(PARTICLES_MAX_RADIUS * 0.3))
      }
   }

   update() {
      if (!this.coordinates.length) return undefined

      for (let i = this.coordinates.length - 1; i >= 0; i--) {
         if (this.distances[i] >= this.max_distances[i]) {
            this.coordinates.splice(i, 1)
            this.max_distances.splice(i, 1)
            this.velocities.splice(i, 1)
            this.distances.splice(i, 1)
            this.sizes.splice(i, 1)
            continue
         }

         this.coordinates[i][0] += this.velocities[i][0]
         this.coordinates[i][1] += this.velocities[i][1]

         this.distances[i] += Math.sqrt(this.velocities[i][0] ** 2 + this.velocities[i][1] ** 2)
      }
   }
}

export {Particles}
export const asteroidsFactory = new AsteroidFactory()

