const debug = true

class Display {
   constructor(canvas) {
      this.buffer = document.createElement('canvas').getContext('2d')
      this.context = canvas.getContext('2d')
   }

   drawShip({x, y, radius, angle, color, visible, is_dead}) {
      this.drawHitbox(x, y, radius)

      if (is_dead) {
         this.drawShipsExplosion(x, y, radius)
         return undefined
      }
      if (!visible) {
         return undefined
      }

      this.drawTriangle(x, y, radius, angle, color)
   }

   drawLives(lives, radius) {
      for (let i = 0; i < lives; i++) {
         const x = 10 + radius * (i + 1) * 2.4
         const y = 20 + radius

         this.drawTriangle(x, y, radius, Math.PI / 2, 'white')
      }
   }

   drawTriangle(x, y, radius, angle, color) {
      this.buffer.strokeStyle = color
      this.buffer.lineWidth = radius / 10
      this.buffer.beginPath()
      this.buffer.moveTo(
         x + 4/3 * radius * Math.cos(angle),
         y - 4/3 * radius * Math.sin(angle)
      )
      this.buffer.lineTo( // left bottom
         x - radius * (2 / 3 * Math.cos(angle) + Math.sin(angle)),
         y + radius * (2 / 3 * Math.sin(angle) - Math.cos(angle))
      )
      this.buffer.lineTo( // right bottom
         x - radius * (2 / 3 * Math.cos(angle) - Math.sin(angle)),
         y + radius * (2 / 3 * Math.sin(angle) + Math.cos(angle))
      )
      this.buffer.closePath();
      this.buffer.stroke();
   }

   drawShipsExplosion(x, y, radius) {
      this.buffer.fillStyle = 'red'
      this.buffer.beginPath()
      this.buffer.arc(x, y, radius, 0, 2 * Math.PI)
      this.buffer.closePath()
      this.buffer.fill()
      this.buffer.fillStyle = 'orange'
      this.buffer.beginPath()
      this.buffer.arc(x, y, radius * 0.65, 0, 2 * Math.PI)
      this.buffer.closePath()
      this.buffer.fill()
      this.buffer.fillStyle = 'white'
      this.buffer.beginPath()
      this.buffer.arc(x, y, radius * 0.3, 0, 2 * Math.PI)
      this.buffer.closePath()
      this.buffer.fill()
   }

   drawLasers(lasers) {
      if (!lasers.length) return undefined

      lasers.forEach(laser => {
         const {x, y, radius, color} = laser

         this.buffer.fillStyle = color
         this.buffer.beginPath()
         this.buffer.arc(x, y, radius, 0, 2 * Math.PI)
         this.buffer.closePath()
         this.buffer.fill()
      })
   }

   drawAsteroid(asteroids) {
      // x, y, radius, vertices, irregularity, stroke_color
      if (!asteroids.length) return undefined

      asteroids.forEach(ast => {
         const {x, y, radius, vertices, irregularity, stroke_color} = ast

         this.buffer.strokeStyle = stroke_color
         this.buffer.lineWidth = radius / 10
         this.buffer.beginPath()
         this.buffer.moveTo(x + radius * irregularity[0], y)
         const angle = 2 * Math.PI / vertices

         for (let i = 0; i < vertices; i++) {
            this.buffer.lineTo(
               x + radius * irregularity[i] * Math.cos(angle * i),
               y - radius * irregularity[i] * Math.sin(angle * i)
            )
         }
         
         this.buffer.closePath()
         this.buffer.stroke()

         this.drawHitbox(x, y, radius)
      })
   }

   drawParticles({coordinates, sizes, color}) {
      if (!coordinates.length) return undefined

      this.buffer.fillStyle = color
      for (let i = 0; i < coordinates.length; i++) {
         this.buffer.beginPath()
         this.buffer.arc(coordinates[i][0], coordinates[i][1], sizes[i], 0, 2 * Math.PI)
         this.buffer.closePath()
         this.buffer.fill()
      }
   }

   drawScore(score, hi_score, width) {
      const font_size = width / 20
      this.buffer.fillStyle = '#eeeeee'
      this.buffer.font = font_size + 'px serif'
      this.buffer.textAlign = "left"
      this.buffer.fillText(`Score: ${score}`, width / 3.5, font_size)
      this.buffer.fillText(`HI: ${hi_score}`, width * 2 / 3, font_size)
   }

   drawHitbox(x, y, radius) {
      if (!debug) return undefined

      this.buffer.strokeStyle = 'green'
      this.buffer.lineWidth = 1
      this.buffer.beginPath()
      this.buffer.arc(x, y, radius, 0, 2 * Math.PI)
      this.buffer.closePath()
      this.buffer.stroke()
   }

   fill(color) {
      this.buffer.fillStyle = color
      this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height)
   }

   render() {
      this.context.drawImage(
         this.buffer.canvas,
         0, 0, this.buffer.canvas.width, this.buffer.canvas.height,
         0, 0, this.context.canvas.width, this.context.canvas.height)
   }

   resize(width, height, height_width_ratio) {
      if (height / width > height_width_ratio) {
         this.context.canvas.height = width * height_width_ratio
         this.context.canvas.width = width
      } else {
         this.context.canvas.height = height
         this.context.canvas.width = height / height_width_ratio
      }

      this.context.imageSmoothingEnabled = false;
   }

}

export default Display
