class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "boot" })
  }

  preload() {
    this.load
      .image("pipe-top", "./assets/imgs/pipe-top.png")
      .image("pipe-bottom", "./assets/imgs/pipe-bottom.png")
      .image("bg", "./assets/imgs/bg.jpg")
      .image("1", "./assets/imgs/number_1.png")
      .image("2", "./assets/imgs/number_2.png")
      .image("3", "./assets/imgs/number_3.png")
      .image("4", "./assets/imgs/number_4.png")
      .image("5", "./assets/imgs/number_5.png")
      .image("6", "./assets/imgs/number_6.png")
      .image("7", "./assets/imgs/number_7.png")
      .image("8", "./assets/imgs/number_8.png")
      .image("9", "./assets/imgs/number_9.png")
      .image("0", "./assets/imgs/number_0.png")
      .image("start", "./assets/imgs/start.png")
      .image("title", "./assets/imgs/title.png")
      .image("gameover", "./assets/imgs/gameover.png")
      .image("restart", "./assets/imgs/restart.png")
      .spritesheet("jellyfish", "./assets/imgs/jellyfishsheet.png", { frameWidth: 32, frameHeight: 32 })
      .audio("score", "./assets/sound/score.mp3")
      .audio("dead", "./assets/sound/dead.mp3")
  }

  create() {
    this.scene.start("game")
  }
}

export {
  Boot
}
