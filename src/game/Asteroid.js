import Collider, {distanceBetweenPoint} from "./Collider";

const MAX_VERTICES = 16
const MIN_VERTICES = 5
const PRONGNESS = 1 // from 0 to 1
const ASTEROIDS_SPEED = 2
const START_ASTEROID_NUMBER = 8

const SML_AST_POINTS = 500
const SML_AST_RADIUS = 15
const MED_AST_POINTS = 300
const MED_AST_RADIUS = 25
const LRG_AST_POINTS = 100
const LRG_AST_RADIUS = 40

class Asteroid extends Collider {
   constructor(x, y) {
      super();

      this.stroke_color = '#eeddee'
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
   }

   random(x, y) {
      const random = Math.random()

      let type = undefined

      if (random < 0.35) {
         type = 'large'
      }
      if (random > 0.55) {
         type = 'medium'
      } else {
         type = 'small'
      }

      return this.create(x, y, type)
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



class AsteroidBelt {
   constructor(width, height) {
      this.game_width = width
      this.game_height = height

      this.asteroids = []
      this.asteroidsFactory = new AsteroidFactory()
   }

   init() {
      const x = this.game_width / 2
      const y = this.game_height / 2

      for (let i = 0; i < START_ASTEROID_NUMBER; i++) {
         let ax = x
         let ay = y

         do {
            ax = Math.floor(Math.random() * this.game_width)
            ay = Math.floor(Math.random() * this.game_height)
         } while (distanceBetweenPoint(x, ax, y, ay) < 250)

         const new_asteroid = this.asteroidsFactory.random(ax, ay)
         this.asteroids.push(new_asteroid)
      }
   }

   hitAsteroid(ast, ast_index) {
      if (ast.type !== 'small') {
         const new_asteroids = this.asteroidsFactory.collapse(ast.x, ast.y, ast.type)
         this.asteroids.push(...new_asteroids)
      }

      this.deleteAsteroid(ast_index)
   }

   deleteAsteroid(index) {
      this.asteroids.splice(index, 1)
   }

   createRandomAsteroid() {
      const [ax, ay] = randomizer(this.game_width, this.game_height)

      const newAsteroid = this.asteroidsFactory.random(ax, ay)

      this.asteroids.push(newAsteroid)
   }

   update() {
      this.asteroids.forEach(ast => {
         ast.update()
      })
   }
}

export const asteroidsFactory = new AsteroidFactory()

export default AsteroidBelt

