import { WIDTH } from "../constants"

export default class Pipes extends Phaser.Physics.Arcade.Group {
  width = 48
  height = 300

  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
    super(world, scene)
  }

  update() {
    this.children.iterate((child: any) => {
      if (child === undefined)
        return

      if (child.x < -48)
        child.destroy()
      else
        child.setVelocityX(-100)
    })
  }

  make(y: number) {
    const pipeTop = this.create(WIDTH, y, "pipe-top")
    pipeTop.body.allowGravity = false
    pipeTop.body.setImmovable(true)

    const minGap = 100
    const maxGap = 140
    const gapHeight = Phaser.Math.Between(minGap, maxGap)

    const pipeBottom = this.create(WIDTH, y + this.height + gapHeight, "pipe-bottom")
    pipeBottom.body.allowGravity = false
    pipeBottom.body.setImmovable(true)
  }
}
