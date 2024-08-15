const Scene = require('Scene');
const Reactive = require('Reactive');
const Patches = require('Patches');

Promise.all([
  Patches.outputs.getScalar('score'),
  Scene.root.findFirst('puntaje'),
  Patches.outputs.getPulse('gameOver'),
  Patches.outputs.getPulse('acelerar'),
  Patches.outputs.getPulse('inicio')

  ]).then(results =>{

  var score = results[0];
  var scoreDisplay = results[1];
  var gameOver = results[2];
  var acelerar = results[3];
  var inicio = results[4];

  var vel = 0.5;
  Patches.inputs.setScalar('velocidad', vel);

  scoreDisplay.text = score.toString();    

  gameOver.subscribe(() =>{
    Patches.inputs.setPulse('fin', Reactive.once());
  });

  acelerar.subscribe(() =>{
    vel = vel*1.5;
    Patches.inputs.setScalar('velocidad', vel);
  });

  inicio.subscribe(() =>{
    vel = 0.5;
    Patches.inputs.setScalar('velocidad', vel);
  });




  })

