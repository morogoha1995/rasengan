export default class Jellyfish extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body

  constructor(scene: Phaser.Scene) {
    super(scene, 90, 0, "jellyfish")

    scene.physics.world.enable(this)
    scene.add.existing(this)

    const size = 40
    this.body.setSize(size)
    this.displayWidth = size
    this.displayHeight = size
    this.body.maxVelocity.y = 800
  }

  update() {
    this.addAngle()
  }

  addAngle() {
    if (this.angle < 60) {
      this.angle++
    }
  }

  jump() {
    console.log(this.width)
    this.body.setVelocityY(-300)
    this.angle = -20
  }
}
