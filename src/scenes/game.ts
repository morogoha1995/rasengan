import Phaser from "phaser"
import Jellyfish from "../objects/jellyfish"
import Pipes from "../objects/pipes"
import Gaps from "../objects/gap"
import Score from "../objects/score"
import Box from "../objects/box"
import { HEIGHT } from "../constants"

export default class Game extends Phaser.Scene {
  private jellyfish!: Jellyfish
  private pipes!: Pipes
  private gaps!: Gaps
  private score!: Score
  private startBox!: Box
  private gameoverBox!: Box

  private isStart = false
  private isGameover = false
  private isMute = false

  constructor() {
    super({ key: "game" })
  }

  preload() {
    this.load.image("pipe-top", "imgs/pipe-top.png")
    this.load.image("pipe-bottom", "imgs/pipe-bottom.png")
    this.load.image("bg", "imgs/bg.jpg")
    this.load.image("1", "imgs/number_1.png")
    this.load.image("2", "imgs/number_2.png")
    this.load.image("3", "imgs/number_3.png")
    this.load.image("4", "imgs/number_4.png")
    this.load.image("5", "imgs/number_5.png")
    this.load.image("6", "imgs/number_6.png")
    this.load.image("7", "imgs/number_7.png")
    this.load.image("8", "imgs/number_8.png")
    this.load.image("9", "imgs/number_9.png")
    this.load.image("0", "imgs/number_0.png")
    this.load.image("start", "imgs/start.png")
    this.load.image("title", "imgs/title.png")
    this.load.image("gameover", "imgs/gameover.png")
    this.load.image("restart", "imgs/restart.png")
    this.load.spritesheet("jellyfish", "imgs/jellyfishsheet.png", { frameWidth: 32, frameHeight: 32 })

    this.load.audio("score", "sound/score.mp3")
    this.load.audio("dead", "sound/dead.mp3")
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
    this.startBox = new Box(this, "title", "start")
    this.gameoverBox = new Box(this, "gameover", "restart")

    this.input.on("pointerdown", () => {
      if (!this.isStart || this.isGameover)
        return

      this.jellyfish.jump()
      this.jellyfish.anims.play("jump")
    })
    this.startBox.btn.on("pointerdown", () => { this.start() })
    this.gameoverBox.btn.on("pointerdown", () => { this.restart() })
    this.startBox.soundConfig.on("pointerdown", () => { this.switchMute() })
    this.gameoverBox.soundConfig.on("pointerdown", () => { this.switchMute() })

    this.physics.add.collider(this.jellyfish, this.pipes, this.dead, undefined, this)
    this.physics.add.overlap(this.jellyfish, this.gaps, this.addScore, undefined, this)

    this.makePipes()
    this.score.init()
    this.startBox.toVisible()
  }

  update() {
    if (!this.isStart) {
      this.startBox.addAlpha()
      return
    }

    if (this.isGameover) {
      this.gameoverBox.addAlpha()
      return
    }

    this.jellyfish.update()
    this.pipes.update()
    this.gaps.update()

    if (this.jellyfish.isOffside()) {
      this.dead()
    }
  }


  private start() {
    this.isStart = true
    this.startBox.toUnvisible()
    this.jellyfish.body.allowGravity = true
  }

  private switchMute() {
    this.isMute = !this.isMute
    this.startBox.switchSoundConfigText(this.isMute)
    this.gameoverBox.switchSoundConfigText(this.isMute)
  }

  private makePipes() {
    const halfHeight = this.pipes.height / 2
    const pipeTopY = Phaser.Math.Between(-halfHeight, halfHeight)

    this.gaps.make(pipeTopY)
    this.pipes.make(pipeTopY)
  }

  private addScore(_: any, gap: any) {
    gap.destroy()
    this.playSound("score")
    this.makePipes()
    this.score.renew()
  }

  private dead() {
    this.physics.pause()
    this.jellyfish.anims.play("dead")
    this.isGameover = true
    this.gameoverBox.toVisible()
    this.playSound("dead")
  }

  private playSound(key: string) {
    if (!this.isMute)
      this.sound.play(key)
  }

  private restart() {
    this.pipes.clear(true, true)
    this.gaps.clear(true, true)
    this.jellyfish.y = 80
    this.jellyfish.body.setVelocityX(0)
    this.makePipes()
    this.score.init()
    this.isGameover = false
    this.gameoverBox.toUnvisible()

    this.physics.resume()
  }
}
