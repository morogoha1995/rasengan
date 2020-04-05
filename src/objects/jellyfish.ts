import { HEIGHT } from "../constants"

export default class Jellyfish extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body
  size = 32

  constructor(scene: Phaser.Scene) {
    super(scene, 90, 80, "jellyfish", 1)

    scene.physics.world.enable(this)
    scene.add.existing(this)

    this.setDisplaySize(this.size, this.size)
    this.body.maxVelocity.y = 800

    this.body.allowGravity = false
  }

  isOffside(): boolean {
    return 0 > this.y || HEIGHT < this.y
  }

  jump() {
    this.body.setVelocityY(-240)
  }
}
