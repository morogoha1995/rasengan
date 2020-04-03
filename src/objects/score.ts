import { WIDTH } from "../constants"

export default class Score extends Phaser.Physics.Arcade.StaticGroup {
  score = 0
  x = WIDTH / 2
  y = 30
  // 一文字あたりの横幅
  width = 22

  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene) {
    super(world, scene)
  }

  init() {
    this.clear(true, true)
    this.score = 0
    this.create(this.x, this.y, "0").setDepth(10)
  }

  renew() {
    this.clear(true, true)

    this.score++

    const score = this.score.toString()
    const scoreLen = score.length
    if (scoreLen == 1) {
      this.create(this.x, this.y, score).setDepth(10)
    } else {
      let initialPosition = this.x - ((scoreLen * this.width) / 2)

      for (let i = 0; i < scoreLen; i++) {
        this.create(initialPosition, this.y, score[i]).setDepth(10)
        initialPosition += this.width
      }
    }
  }
}
