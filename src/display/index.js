const debug = true

class Display {
   constructor(canvas) {
      this.buffer = document.createElement('canvas').getContext('2d')
      this.context = canvas.getContext('2d')
   }

   drawShip(x, y, radius, angle, color) {
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

      this.drawHitbox(x, y, radius)
   }

   drawLaser(x, y, radius, fill_color) {
      this.buffer.fillStyle = fill_color
      this.buffer.beginPath()
      this.buffer.arc(x, y, radius, 0, 2 * Math.PI)
      this.buffer.closePath()
      this.buffer.fill()
   }

   drawAsteroid(x, y, radius, vertices, irregularity, stroke_color) {
      this.buffer.strokeStyle = stroke_color
      this.buffer.lineWidth = radius / 10
      this.buffer.beginPath()
      this.buffer.moveTo(x + radius * irregularity[0], y)
      const angle = 2 * Math.PI / vertices
      for (let i = 1; i < vertices; i++) {
         this.buffer.lineTo(
            x + radius * irregularity[i] * Math.cos(angle * i),
            y - radius * irregularity[i] * Math.sin(angle * i)
         )
      }
      this.buffer.closePath()
      this.buffer.stroke()

      this.drawHitbox(x, y, radius)
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
