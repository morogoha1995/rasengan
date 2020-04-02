import Phaser from "phaser"
import Jellyfish from "../objects/jellyfish"
import { WIDTH, HEIGHT } from "../constants"
import Gap from "../objects/gap"
import Pipes from "../objects/pipes"
import Gaps from "../objects/gap"

export default class Game extends Phaser.Scene {
  private jellyfish!: Jellyfish
  private pipes!: Pipes
  private gaps!: Gaps

  constructor() {
    super({ key: "game" })
  }

  preload() { }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0)

    this.jellyfish = new Jellyfish(this)
    this.gaps = new Gaps(this.physics.world, this)
    this.pipes = new Pipes(this.physics.world, this)

    this.physics.add.collider(this.jellyfish, this.pipes, this.dead, undefined, this)
    this.physics.add.overlap(this.jellyfish, this.gaps, this.addScore, undefined, this)

    this.input.on("pointerdown", () => {
      this.jellyfish.jump()
    })

    this.makePipes()
  }

  update() {
    this.jellyfish.update()
    this.pipes.update()
    this.gaps.update()
  }

  makePipes() {
    const halfHeight = this.pipes.height / 2
    const pipeTopY = Phaser.Math.Between(-halfHeight, halfHeight)

    this.gaps.make(pipeTopY)
    this.pipes.make(pipeTopY)
  }

  addScore(_: any, gap: any) {
    gap.destroy()
    this.makePipes()
  }

  dead() {
    this.pipes.clear(true, true)
    this.gaps.clear(true, true)
    this.jellyfish.y = 0
    this.jellyfish.body.setVelocityX(0)
    this.makePipes()
  }
}
