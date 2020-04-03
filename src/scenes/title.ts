import Phaser from "phaser"
import { WIDTH, HEIGHT } from "../constants"

export default class Title extends Phaser.Scene {
  private startText?: Phaser.GameObjects.Text
  private bgColor = "0xe08734"
  private fontStyle = { color: "red", fontSize: "70px" }

  constructor() {
    super({ key: "title" })
  }

  preload() {
    this.load.image("jellyfish", "imgs/jellyfish.png")
    this.load.image("pipe-top", "imgs/pipe-top.png")
    this.load.image("pipe-bottom", "imgs/pipe-bottom.png")
    this.load.image("bg", "imgs/bg.jpg")
    this.load.image("1", "imgs/number_1.png")
    this.load.image("2", "imgs/number_2.png")
    this.load.image("3", "imgs/number_3.png")
    this.load.image("4", "imgs/number_4.png")
    this.load.image("5", "imgs/number_5.png")
    this.load.image("6", "imgs/number_6.png")
    this.load.image("7", "imgs/number_7.png")
    this.load.image("8", "imgs/number_8.png")
    this.load.image("9", "imgs/number_9.png")
    this.load.image("0", "imgs/number_0.png")

  }

  create() {
    this.cameras.main.setBackgroundColor(this.bgColor)
    this.startText = this.add.text(WIDTH / 2, HEIGHT / 2, 'START', this.fontStyle)
    this.startText.setOrigin(0.5)
    this.startText.setInteractive()
    this.startText.on("pointerdown", () => {
      this.scene.start("game")
    })
  }
}
