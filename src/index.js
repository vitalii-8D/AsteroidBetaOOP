import Controller from "./controller";
import Display from "./display";
import Game from "./game";
import Engine from "./engine";

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
      display.drawShip(game.scene.ship)

      // display.drawLaser(game.scene.ship.lasers, radius, color)

      game.scene.ship.lasers.forEach((laser, i) => {
         const {x, y, radius, color} = laser
         display.drawLaser(x, y, radius, color)
      })
      game.scene.asteroids.forEach(ast => {
         const {x, y, radius, vertices, irregularity} = ast
         display.drawAsteroid(x, y, radius, vertices, irregularity, '#eeddee')
      })

      // game.scene.explode_particles.coordin

      display.render()
   }

   const update = (dt) => {
      if (controller.left.active) {game.scene.ship.rotation = 1}
      if (controller.right.active) {game.scene.ship.rotation = -1}
      if (!controller.left.active && !controller.right.active) {
         game.scene.ship.rotation = 0
      }

      if (controller.up.active) {game.scene.ship.accelerate();}

      if (controller.spacebar.active) {
         game.scene.ship.addLaser();
         controller.spacebar.active = false
      }

      game.update(dt)
   }

   let controller = new Controller()
   let display = new Display(document.getElementById('canvas'))
   let game = new Game()
   let engine = new Engine(1000/30, update, render)

   display.buffer.canvas.width = game.width
   display.buffer.canvas.height = game.height

   window.addEventListener('resize', resize)
   window.addEventListener('keydown', keyDownUp)
   window.addEventListener('keyup', keyDownUp)

   resize()
   engine.start()
})
