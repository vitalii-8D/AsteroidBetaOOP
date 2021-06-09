class Engine {
   constructor(time_step, update, render) {
      this.accumulated_time = undefined // time accumulator
      this.animation_frame_request = undefined
      this.time = undefined // Previous time
      this.time_step = time_step // 1000/30  update frequency
      this.updated = undefined // if the game needs an update

      this.update = update
      this.render = render
   }

   loop(time_stamp) {
      this.accumulated_time += time_stamp - this.time
      this.time = time_stamp

      if (this.accumulated_time > this.time_step * 3) {
         this.accumulated_time = this.time_step
      }

      while (this.accumulated_time >= this.time_step) {
         this.accumulated_time -= this.time_step

         this.update(this.time_step)

         this.updated = true
      }

      if (this.updated) {
         this.render()
         this.updated = false
      }

      window.requestAnimationFrame((time) => this.loop(time))
   }

   start() {
      this.accumulated_time = this.time_step
      this.time = window.performance.now()
      this.animation_frame_request = window.requestAnimationFrame((time) => this.loop(time))
   }

   stop() {
      window.cancelAnimationFrame(this.animation_frame_request)
   }
}

export default Engine
