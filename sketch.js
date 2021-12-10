
var distance = 0
var coin;
var gameState = PLAY
var PLAY = 1;
var END = 0;
var coins_score=0;

function preload(){
  background1 = loadImage('background_lava.jpg')
  bomb1 = loadImage('Bomb.gif')
  coin = loadImage('Coin.gif')
  Ninja_player = loadImage('Ninja_player.gif')
  pillar = loadImage("Pillar.png")
  floor = loadImage('floor.jpg')

  coinGroup = createGroup()
  bombGroup = createGroup()
  floorGroup = createGroup()
}

function setup(){
  createCanvas(windowWidth,windowHeight)


ninja = createSprite(windowWidth/2,windowHeight/2,10,10)
ninja.addImage('n',Ninja_player)
ninja.scale = 0.5
ninja.setCollider('circle',0,0,0.1)

lava = createSprite(windowWidth/2,windowHeight,windowWidth,windowHeight-390)
lava.visible = false

}

function draw(){
  background(background1)

  if(gameState === PLAY){
    
    if(keyDown(RIGHT_ARROW)){
      ninja.x = ninja.x + 2
    }

    if(keyDown(LEFT_ARROW)){
      ninja.x = ninja.x - 2
    }

    if(keyDown(DOWN_ARROW)){
      ninja.y = ninja.y + 2
    }

    if(keyDown(UP_ARROW)){
      ninja.y = ninja.y - 2
    }

    if(ninja.isTouching(coinGroup)){
      coinGroup.destroyEach()
      coin_score = coin_score + 1
      console.log(score)

    }

    spawnBomb();
    spawnCoins();
    spawnfloors();

    if(ninja.isTouching(lava)){
      gameState = END
    }      
  }

  else if(gameState === END){
    ninja.velocityX = 0
    coinGroup.setVelocityXEach(0)
    bombGroup.setVelocityXEach(0)
    floorGroup.setVelocityXEach(0)
    coinGroup.setVelocityYEach(0)
    bombGroup.setVelocityYEach(0)
    floorGroup.setVelocitYXEach(0)
    coinGroup.setLifetimeEach(-1)
    bombGroup.setLifetimeEach(-1)
    floorGroup.setLifetimeEach(-1)

    

  }

  drawSprites();
  text('Coins:'+ coins_score, 50,100)

}

  

  


function spawnCoins(){
  if(frameCount % 24 === 0){
    coin = createSprite(250,100,10,10)
    coin.x = floor.x
    coin.y = floor.x - 5
    coin.scale = 0.5
    coin.addImage('coin1', coin)
    coinGroup.add(coin)
  }
}

function spawnBomb(){
  if(frameCount % 64 === 0){
    bomb = createSprite(250,100,10,10)
    bomb.addImage('bomb', bomb)
    bomb.scale = 0.1
    bomb.velocityY = Math.round(random(0,100))
    bomb.velocityX = Math.round(random(0,100))
    bombGroup.add(bomb)
  }
}

function spawnfloors(){
  if(frameCount % 80 === 0){
    floor = createSprite(windowWidth/2,windowHeight/2 -20 ,100,10)
    floor.addImage('f', floor)
    floor.scale = 0.1
    floor.y = Math.round(random(0,100))
    floor.x = Math.round(random(0,100))

    floorGroup.add(floor)
  }
}