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
      display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width)
      display.render()
   }

   const render = () => {
      display.fill(game.world.background_color)
      display.drawShip(
         game.world.ship.x,
         game.world.ship.y,
         game.world.ship.radius,
         game.world.ship.angle,
         game.world.ship.color
      )

      game.world.ship.lasers.forEach((laser, i) => {
         const {x, y, radius, color} = laser
         display.drawLaser(x, y, radius, color)
      })
      game.world.asteroids.forEach(ast => {
         const {x, y, radius, vertices, irregularity} = ast
         display.drawAsteroid(x, y, radius, vertices, irregularity, '#eeddee')
      })

      display.render()
   }

   const update = () => {
      if (controller.left.active) {game.world.ship.rotation = 1}
      if (controller.right.active) {game.world.ship.rotation = -1}
      if (!controller.left.active && !controller.right.active) {
         game.world.ship.rotation = 0
      }

      if (controller.up.active) {game.world.ship.accelerate();}

      if (controller.spacebar.active) {
         game.world.ship.addLaser();
         controller.spacebar.active = false
      }

      game.update()
   }

   let controller = new Controller()
   let display = new Display(document.getElementById('canvas'))
   let game = new Game()
   let engine = new Engine(1000/30, update, render)

   display.buffer.canvas.width = game.world.width
   display.buffer.canvas.height = game.world.height

   window.addEventListener('resize', resize)
   window.addEventListener('keydown', keyDownUp)
   window.addEventListener('keyup', keyDownUp)

   resize()
   engine.start()
})
