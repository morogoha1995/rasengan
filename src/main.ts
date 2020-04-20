import Phaser from "phaser"
import { Boot } from "./scenes/boot"
import Game from "./scenes/game"
import { WIDTH, HEIGHT } from "./constants"

window.onload = () => {
  new Phaser.Game({
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    parent: 'app',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 600
        },
        debug: false
      }
    },
    scene: [
      Boot,
      Game,
    ]
  })
}
