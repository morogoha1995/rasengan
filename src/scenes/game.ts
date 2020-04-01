import Phaser from "phaser"
import Jellyfish from "../objects/jellyfish"
import { WIDTH, HEIGHT } from "../constants"

export default class Game extends Phaser.Scene {
  private jellyfish!: Jellyfish
  private pipes!: Phaser.Physics.Arcade.Group
  private gaps!: Phaser.Physics.Arcade.Group

  constructor() {
    super({ key: "game" })
  }

  preload() { }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0)

    this.jellyfish = new Jellyfish(this)

    this.physics.add.collider(this.jellyfish, this.pipes, this.dead, undefined, this)
    this.physics.add.overlap(this.jellyfish, this.gaps, this.addScore, undefined, this)

    this.input.on("pointerdown", () => {
      this.jellyfish.jump()
    })
  }

  update() {
    this.jellyfish.update()
  }

  addScore() {

  }

  dead() {

  }
}
