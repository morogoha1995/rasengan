export default class Jellyfish extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body

  constructor(scene: Phaser.Scene) {
    super(scene, 90, 80, "jellyfish", 1)

    scene.physics.world.enable(this)
    scene.add.existing(this)

    const size = 32
    this.body.setSize(size)
    this.displayWidth = size
    this.displayHeight = size
    this.body.maxVelocity.y = 800

    this.body.allowGravity = false
  }

  jump() {
    this.body.setVelocityY(-240)
  }
}
