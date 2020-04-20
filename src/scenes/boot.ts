import * as card from "../assets/imgs/card.png"
import * as favicon from "../assets/imgs/favicon.png"

import * as pipeTop from "../assets/imgs/pipe-top.png"
import * as pipeBottom from "../assets/imgs/pipe-bottom.png"
import * as bg from "../assets/imgs/bg.jpg"
import * as one from "../assets/imgs/number_1.png"
import * as two from "../assets/imgs/number_2.png"
import * as three from "../assets/imgs/number_3.png"
import * as four from "../assets/imgs/number_4.png"
import * as five from "../assets/imgs/number_5.png"
import * as six from "../assets/imgs/number_6.png"
import * as seven from "../assets/imgs/number_7.png"
import * as eight from "../assets/imgs/number_8.png"
import * as nine from "../assets/imgs/number_9.png"
import * as zero from "../assets/imgs/number_0.png"
import * as start from "../assets/imgs/start.png"
import * as title from "../assets/imgs/title.png"
import * as gameover from "../assets/imgs/gameover.png"
import * as restart from "../assets/imgs/restart.png"
import * as jellyfish from "../assets/imgs/jellyfishsheet.png"
import * as score from "../assets/sound/score.mp3"
import * as dead from "../assets/sound/dead.mp3"

class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "boot" })
  }

  preload() {
    this.load.image("pipe-top", pipeTop.default)
      .image("pipe-bottom", pipeBottom.default)
      .image("bg", bg.default)
      .image("1", one.default)
      .image("2", two.default)
      .image("3", three.default)
      .image("4", four.default)
      .image("5", five.default)
      .image("6", six.default)
      .image("7", seven.default)
      .image("8", eight.default)
      .image("9", nine.default)
      .image("0", zero.default)
      .image("start", start.default)
      .image("title", title.default)
      .image("gameover", gameover.default)
      .image("restart", restart.default)
      .spritesheet("jellyfish", jellyfish.default, { frameWidth: 32, frameHeight: 32 })
      .audio("score", score.default)
      .audio("dead", dead.default)
  }

  create() {
    this.scene.start("game")
  }
}

export {
  Boot
}
