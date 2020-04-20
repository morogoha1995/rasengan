import Phaser from "phaser"
import Jellyfish from "../objects/jellyfish"
import Pipes from "../objects/pipes"
import Gaps from "../objects/gap"
import Score from "../objects/score"
import Box from "../objects/box"
import { HEIGHT, WIDTH } from "../constants"
import { createFontStyle } from "../utils/text"

export default class Game extends Phaser.Scene {
  private jellyfish!: Jellyfish
  private pipes!: Pipes
  private gaps!: Gaps
  private score!: Score

  private isStart = false
  private isMute = false
  private isRestart = false

  constructor() {
    super({ key: "game" })
  }

  init(data: any) {
    this.isRestart = data.isRestart || false
    this.isMute = data.isMute || false
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0)
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("jellyfish", {
        start: 3,
        end: 1,
      }),
      frameRate: 12,
      repeat: 0
    })
    this.anims.create({
      key: "dead",
      frames: [{
        key: "jellyfish",
        frame: 0
      }],
      frameRate: 20
    })

    this.jellyfish = new Jellyfish(this)
    this.gaps = new Gaps(this.physics.world, this)
    this.pipes = new Pipes(this.physics.world, this)
    this.score = new Score(this.physics.world, this)

    this.physics.add.collider(this.jellyfish, this.pipes, this.dead, undefined, this)
    this.physics.add.overlap(this.jellyfish, this.gaps, this.addScore, undefined, this)

    this.makePipes()
    this.score.init()

    if (!this.isRestart)
      this.createStartBox()
    else
      this.start()

    this.input.on("pointerdown", () => {
      if (!this.isStart)
        return

      this.jellyfish.jump()
      this.jellyfish.anims.play("jump")
    })
  }

  update() {
    if (!this.isStart)
      return

    this.jellyfish.update()
    this.pipes.update()
    this.gaps.update()

    if (this.jellyfish.isOffside())
      this.dead()
  }

  private start() {
    this.isStart = true
    this.jellyfish.body.allowGravity = true
    this.sound.mute = this.isMute
  }

  private createStartBox() {
    const startBox = new Box(this, "title", "start")
    startBox.switchSoundConfigText(this.isMute)
    startBox.btn.on("pointerdown", () => {
      this.start()
      startBox.toUnvisible()
    })
    startBox.soundConfig.on("pointerdown", () => {
      this.switchMute()
      startBox.switchSoundConfigText(this.isMute)
    })
    startBox.tween(this)
  }

  private switchMute() {
    this.isMute = !this.isMute
  }

  private makePipes() {
    const halfHeight = this.pipes.height / 2
    const pipeTopY = Phaser.Math.Between(-halfHeight, halfHeight)

    this.gaps.make(pipeTopY)
    this.pipes.make(pipeTopY)
  }

  private addScore(_: any, gap: any) {
    gap.destroy()
    this.sound.play("score")
    this.makePipes()
    this.score.renew()
  }

  private dead() {
    this.physics.pause()
    this.jellyfish.anims.play("dead")
    this.isStart = false
    this.sound.play("dead")

    const gameoverBox = new Box(this, "gameover", "restart")
    gameoverBox.switchSoundConfigText(this.isMute)
    gameoverBox.btn.on("pointerdown", () => this.scene.restart({ isRestart: true, isMute: this.isMute }))
    gameoverBox.soundConfig.on("pointerdown", () => {
      this.isMute = !this.isMute
      gameoverBox.switchSoundConfigText(this.isMute)
    })
    gameoverBox.tween(this)

    const url = "https://meisoudev.com/games/flappyjelly/"
    const tweetURL = `https://twitter.com/intent/tweet?text=超えた土管の数：${this.score.score}&url=${url}&hashtags=飛ぶクラゲ`

    const tweetText = this.add.text(
      WIDTH / 2,
      310,
      "ツイートする",
      createFontStyle("royalblue"))
      .setOrigin(0.5)
      .on("pointerdown", () => {
        window.open(tweetURL, "blank")
      })
      .setAlpha(0)

    this.add.tween({
      targets: tweetText,
      duration: 800,
      alpha: 1,
      onComplete: () => tweetText.setInteractive()
    })
  }
}
