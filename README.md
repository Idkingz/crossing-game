# Crossing Game
This repo was created to learn some basics of animation with *requestAnimationFrame* in vanila **JS**.

## RequestAnimationFrame
*requestAnimationFrame* works like a *while*

## 2dContext
Generates canvas as given context (2d)

## Sprites
Initiate sprites outside loop of *requestAnimationFrame*:
``` 
sprites.player = new Image()
sprites.player.src = './images/hero.png'
ctx.drawImage(sprites.player, chicken.x, chicken.y)
``` 

## Clear Canvas
Clear window location property and avoid *requestAnimationFrame* loop
```
const isEndGame = hasCollision => {
  if (hasCollision) {
    alert('YOU LOSE')
    window.location = ""

    isGameLive = false
  }

  return false
}

if (isGameLive)
    window.requestAnimationFrame(step)
```
    