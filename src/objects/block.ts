import { WIDTH } from "../constants"

export default class Block extends Phaser.GameObjects.Sprite {

  constructor(scene: Phaser.Scene) {
    super(scene, WIDTH, 0, "pipe")


    scene.add.existing(this)
  }

  make() {

  }

  move() {

  }
}
