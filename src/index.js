import Controller from "./controller";
import Display from "./display";
import Game from "./game";
import Engine from "./engine";

const GAME_STATES = {
   MENU: 'menu',
   GAME: 'game',
   GAME_OVER: 'game_over'
}

import '/static/styles/main.css'

window.addEventListener('load', () => {
   const keyDownUp = (event) => {
      controller.keyDownUp(event)
   }
   const resize = (event) => {
      display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.height / game.width)
      display.render()
   }

   const render = () => {
      display.fill(game.scene.background_color)

      display.drawLasers(game.scene.ship.shooting_system.lasers)
      display.drawAsteroid(game.scene.asteroid_belt.asteroids)
      display.drawShip(game.scene.ship)
      display.drawParticles(game.scene.explode_particles)
      display.drawLives(game.scene.lives, game.scene.ship.radius)
      display.drawScore(game.scene.score, game.hi_score, game.width)

      display.render()
   }

   const update = (dt) => {
      if (game.state === GAME_STATES.GAME && !game.scene.ship.is_dead) {
         checkInputs()
      }

      game.update(dt)
   }

   function checkInputs() {
      if (controller.left.active) {game.scene.ship.rotation = 1}
      if (controller.right.active) {game.scene.ship.rotation = -1}
      if (!controller.left.active && !controller.right.active) {
         game.scene.ship.rotation = 0
      }

      if (controller.up.active) {game.scene.ship.accelerate();}

      if (controller.spacebar.active) {
         game.scene.ship.shoot()
         controller.spacebar.active = false
      }
   }

   let controller = new Controller()
   let display = new Display(document.getElementById('canvas'))
   let game = new Game(1000, 700, document.getElementById('container'))
   let engine = new Engine(1000/30, update, render)

   display.buffer.canvas.width = game.width
   display.buffer.canvas.height = game.height

   window.addEventListener('resize', resize)
   window.addEventListener('keydown', keyDownUp)
   window.addEventListener('keyup', keyDownUp)

   resize()
   engine.start()
})
