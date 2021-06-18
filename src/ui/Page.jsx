import React from '../jsx-dom-shim'

const startPage = (fun) => {

   return (
      <div className="container" style=''>
         <h1 style='margin-bottom: 50px;'>Welcome to Asteroids game</h1>
         <button className="btn" onClick={fun}
                 style='background-color: green; color: #dddddd'>
            Start
         </button>
         <p style='position: absolute; bottom: 50px;'>Created by Vitalii Shlomenko</p>
      </div>
   )
}

const gameOverPage = (fun) => {

   return (
      <div className="container" style=''>
         <h1 style='margin-bottom: 10px;'>You lose! One more try?</h1>
         <div className='score' style='margin-bottom: 40px; font-size: 24px;'>score</div>
         <button className="btn" onClick={fun}
                 style='background-color: green; color: #dddddd'>
            Retry
         </button>
         <p style='position: absolute; bottom: 50px;'>Created by Vitalii Shlomenko</p>
      </div>
   )
}

export {startPage, gameOverPage}
