const distanceBetweenPoint = (x1, x2, y1, y2) => {
   const dx = x1 - x2
   const dy = y1 - y2
   return Math.sqrt(dx ** 2 + dy ** 2)
}

class Collider {
   constructor() {
   }

   collideWith(object, callback = () => undefined) {
      const dist = distanceBetweenPoint(this.x, object.x, this.y, object.y)

      if (dist < this.radius + object.radius) {
         callback()

         return true
      }

      return false
   }
}

export {distanceBetweenPoint}

export default Collider
