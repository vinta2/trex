var ground
var groundIMG
var trex, trex_running;
var nuvemIMG
var obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6
var pontos = 0
var obstaculos_grupo,nuvems_grupo
var Play=1
var End=0
var trex_endIMG
var gamestate=Play
var game_overIMG,restartIMG
var game_over,restart
var dieMP3,checkpointMP3,jumpMP3
var recorde = 0
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundIMG = loadImage("ground2.png")
  nuvemIMG = loadImage("cloud.png")
  obstaculo1 = loadImage("obstacle1.png")
  obstaculo2 = loadImage("obstacle2.png")
  obstaculo3 = loadImage("obstacle3.png")
  obstaculo4 = loadImage("obstacle4.png")
  obstaculo5 = loadImage("obstacle5.png")
  obstaculo6 = loadImage("obstacle6.png")
  trex_endIMG = loadAnimation("trex_collided.png")
  game_overIMG = loadImage("gameOver.png")
  restartIMG = loadImage("restart.png")
  checkpointMP3 = loadSound("checkpoint.mp3")
  dieMP3 = loadSound("die.mp3")
  jumpMP3 = loadSound("jump.mp3")
}
function nuvems(){
if(frameCount%60===0){
var nuvem = createSprite(width,height+50,40,10)
nuvem.velocityX = -2;
nuvem.addImage(nuvemIMG)
nuvem.y=Math.round(random(10,height-200))
nuvem.lifetime=800
nuvem.scale = 1.3
nuvem.depth=trex.depth
trex.depth=trex.depth+1
nuvems_grupo.add(nuvem)
}
}
function obstaculos(){
if(frameCount%100===0){
var obstaculo = createSprite(width,height-40,10,45)
obstaculo.velocityX = -4;
var rand=Math.round(random(1,6))
switch(rand){
case 1: obstaculo.addImage(obstaculo1)
break
case 2: obstaculo.addImage(obstaculo2)
break
case 3: obstaculo.addImage(obstaculo3)
break
case 4: obstaculo.addImage(obstaculo4)
break
case 5: obstaculo.addImage(obstaculo5)
break
case 6: obstaculo.addImage(obstaculo6)
break
}
obstaculo.scale = 0.5
obstaculo.lifetime=550
obstaculos_grupo.add(obstaculo)
}
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  trex = createSprite(50, height-70, 20, 20);
  trex.scale = 0.8
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colided",trex_endIMG)
  trex.setCollider("circle",0,0,40)
  trex.debug=false
  ground = createSprite(width/2, height-20, width, 20)
  ground.addImage(groundIMG)
  ground2 = createSprite(width/2,height-10,width,20)
  ground2.visible=false
  obstaculos_grupo=new Group()
  nuvems_grupo=new Group()
  game_over = createSprite(width/2,height/2)
  game_over.scale = 1.5
  game_over.addImage(game_overIMG)
  restart = createSprite(width/2,height/2-80)
  restart.scale = 1.5
  restart.addImage(restartIMG)
  game_over.visible = false
  restart.visible = false
}
function draw() {
  background("white")
  drawSprites();
  if(gamestate===Play){
  ground.velocityX = -2
  if (ground.x < 0) {
  ground.x = width / 2
  }
    if ((touches.length>0||keyDown("space")) && trex.y>height-70) {
    trex.velocityY = -13;
    jumpMP3.play()   
    touches=[]
  }
  if(pontos%100===0&&pontos>0){
  checkpointMP3.play() 
  
  }
    nuvems()
  obstaculos()
  pontos=pontos+Math.round(getFrameRate()/60)
  if(obstaculos_grupo.isTouching(trex)){
  gamestate=End
  dieMP3.play()
  //trex.velocityY = -11;
  //jumpMP3.play()
  }
  }
  else if(gamestate===End){
  ground.velocityX=0
  obstaculos_grupo.setVelocityXEach(0)
  nuvems_grupo.setVelocityXEach(0)
  obstaculos_grupo.setLifetimeEach(-1)
  nuvems_grupo.setLifetimeEach(-1)
  trex.velocityY = 0
  trex.changeAnimation("colided")
  game_over.visible = true
  restart.visible = true
  if(mousePressedOver(restart)){
  reset()
  }
  if(pontos>recorde){
  recorde = pontos
  }
  }
 


  trex.velocityY = trex.velocityY + 0.8
  trex.collide(ground2)

  text("pontuação: "+pontos,width-100,50)
  text("hi:"+recorde,width-160,50)
}
function reset(){
gamestate=Play
pontos=0
trex.changeAnimation("running")
obstaculos_grupo.destroyEach()
nuvems_grupo.destroyEach()
game_over.visible = false
restart.visible = false

}