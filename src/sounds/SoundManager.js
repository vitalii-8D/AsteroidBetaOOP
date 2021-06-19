import {SOUND_ON} from "../constants";

class Sound {
   constructor(src, max_streams = 1, vol = 1) {
      this.src = src
      this.max = max_streams
      this.volume = vol

      this.stream_num = 0
      this.streams = []

      this.init()
   }

   init() {
      for (let i = 0; i  < this.max; i++) {
         this.streams.push(new Audio(this.src))
         this.streams[i].volume = this.volume
      }
   }

   play() {
      if (!SOUND_ON) return undefined

      this.stream_num = (this.stream_num + 1) % this.max
      this.streams[this.stream_num].play()
   }

   stop() {
      this.streams[this.stream_num].pause()
      this.streams[this.stream_num].currentTime = 0
   }

}

const soundHit = new Sound('src/sounds/hit.m4a', 10, 1)
const soundLaser = new Sound('src/sounds/laser.m4a', 10, 1)
const soundExplode = new Sound('src/sounds/explode.m4a', 1, 0.3)
const soundThrust = new Sound('src/sounds/thrust.m4a', 1, 0.2)

export {
   soundExplode,
   soundHit,
   soundLaser,
   soundThrust
}
