const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const screenWidth = 1000
const screenHeight = 487
const upKeyCode = 38
const downKeyCode = 40
const leftKeyCode = 37
const rightKeyCode = 39

const sprites = {}
const loadSprites = () => {
  sprites.player = new Image()
  sprites.player.src = './images/hero.png'

  sprites.floor = new Image()
  sprites.floor.src = './images/floor.png'

  sprites.enemy = new Image()
  sprites.enemy.src = './images/enemy.png'
}

let isGameLive = true

class Car {
  constructor (x, y, width, height, color){
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.color = "rgb(0, 0, 255)"
      this.speed = Math.floor(Math.random() * 10) + 1  //Random from 1 to 9
  }

  move() {
    this.x = this.x > screenWidth ? -50 : this.x + this.speed
  }
}

class Chicken {
  constructor (width, height){
      this.x = Math.floor(Math.random() * 800) + 200  //Random from 201 to 800
      this.y = 0
      this.width = width
      this.height = height
      this.color = "rgb(255, 0, 0)"
      this.speed = 50
  }

  moveDown() {
    console.log('moveDown', this.y , this.speed)
    this.y = this.y > screenHeight ? 0 : this.y + this.speed
  }

  moveUp() {
    console.log('moveUp', this.y , this.speed)
    this.y = this.y < 0 ? screenHeight : this.y - this.speed
  }

  moveRight() {
    console.log('moveRight', this.x , this.speed)
    this.x = this.x > screenWidth ? 0 : this.x + this.speed
  }

  moveLeft() {
    console.log('moveLeft', this.x , this.speed)
    this.x = this.x < 0 ? screenWidth : this.x - this.speed
  }
}

const isColliding = (player, enemy) => {
  const xOverlap = Math.abs(player.x - enemy.x) <= Math.max(player.width, enemy.width)
  const yOverlap = Math.abs(player.y - enemy.y) <= Math.max(player.height, enemy.height)

  return xOverlap && yOverlap
}

const isEndGame = hasCollision => {
  if (hasCollision) {
    alert('YOU LOSE')
    window.location = ""

    isGameLive = false
  }

  return false
}

const cars = [
  new Car(0, 055, 50, 50),
  new Car(40, 160, 50, 50),
  new Car(20, 215, 50, 50),
  new Car(500, 270, 50, 50),
  new Car(300, 325, 50, 50),
  new Car(700, 380, 50, 50),
  new Car(0, 435, 50, 50),
]

const chicken = new Chicken(50, 50)

const draw = () => {
  ctx.drawImage(sprites.floor, 0, 0)
  cars.map( enemy => {
    ctx.drawImage(sprites.enemy, enemy.x, enemy.y)
    const hasCollision = isColliding(chicken, enemy)
    isEndGame(hasCollision)
  })
  ctx.drawImage(sprites.player, chicken.x, chicken.y)
}

const update = item => {
  cars.map( car => car.move())
}

document.onkeydown = event => {
  let keyPressed = event.keyCode;
  console.log(keyPressed)
  if (keyPressed === upKeyCode)
    chicken.moveUp()

  if (keyPressed === downKeyCode) 
    chicken.moveDown()

  if (keyPressed === leftKeyCode) 
  chicken.moveLeft()

  if (keyPressed === rightKeyCode) 
    chicken.moveRight()
}

const step = () => {
  draw()
  update()

  if (isGameLive)
    window.requestAnimationFrame(step)
}

loadSprites()
step()