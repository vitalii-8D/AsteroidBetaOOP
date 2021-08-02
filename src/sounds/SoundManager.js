import {SOUND_ON} from "../constants";

import * as sound_hit from './hit.m4a'
import * as sound_laser from './laser.m4a'
import * as sound_explode from './explode.m4a'
import * as sound_thrust from './thrust.m4a'

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

// const soundHit = new Sound(sound_hit, 10, 1)
// const soundLaser = new Sound(sound_laser, 10, 1)
// const soundExplode = new Sound(sound_explode, 1, 0.3)
// const soundThrust = new Sound(sound_thrust, 1, 0.2)

const soundHit = new Sound('./hit.m4a', 10, 1)
const soundLaser = new Sound('./laser.m4a', 10, 1)
const soundExplode = new Sound('./explode.m4a', 1, 0.3)
const soundThrust = new Sound('./thrust.m4a', 1, 0.2)

export {
   soundExplode,
   soundHit,
   soundLaser,
   soundThrust
}
