class Controller {
   constructor() {
      this.down = new ButtonInput()
      this.up = new ButtonInput()
      this.left = new ButtonInput()
      this.right = new ButtonInput()
      this.spacebar = new ButtonInput()
   }

   keyDownUp(event) {
      let down = (event.type === 'keydown') ? true : false

      switch (event.keyCode) {
         case 37: this.left.getInput(down); break;
         case 38: this.up.getInput(down); break;
         case 39: this.right.getInput(down); break;
         case 40: this.down.getInput(down); break;
         case 32: this.spacebar.getInput(down); break;
         default: break;
      }

   }

}

class ButtonInput {
   constructor() {
      this.active = undefined
      this.down = undefined
   }

   getInput(down) {
      if (this.down !== down) this.active = down
      this.down = down
   }
}

export default Controller
