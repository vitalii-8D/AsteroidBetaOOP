class Collider {
   constructor() {
   }

   collideWith(object, callback = () => undefined) {
      const dx = this.x - object.x
      const dy = this.y - object.y
      const dist = Math.sqrt(dx ** 2 + dy ** 2)

      if (dist < this.radius + object.radius) {
         callback()

         return true
      }

      return false
   }
}

export default Collider
