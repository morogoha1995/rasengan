import { WIDTH, HEIGHT } from "../constants"

export default class Gaps extends Phaser.Physics.Arcade.Group {
  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
    super(world, scene)
  }

  update() {
    this.children.iterate((child: any) => {
      child.body.setVelocityX(-100)
    })
  }

  make(y: number) {
    const gap = new Gap(this.scene, y)
    this.add(gap)
    gap.body.allowGravity = false
    gap.visible = false
  }
}

class Gap extends Phaser.GameObjects.Line {
  body!: Phaser.Physics.Arcade.Body

  constructor(scene: Phaser.Scene, y: number) {
    super(scene, WIDTH, y + HEIGHT / 2, 0, 0, 0, 98)
  }
}
