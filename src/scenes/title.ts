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
