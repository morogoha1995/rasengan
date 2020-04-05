import { WIDTH } from "../constants"

export default class Box {
  banner: Phaser.GameObjects.Image
  btn: Phaser.GameObjects.Image
  soundConfig: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene, bannerTexuture: string, btnTexture: string) {
    const x = WIDTH / 2

    this.banner = scene.add.image(x, 130, bannerTexuture)
    this.banner.setDisplaySize(240, 100)
    this.banner.setDepth(20)

    this.btn = scene.add.image(x, 240, btnTexture)
    this.btn.setDisplaySize(120, 50)
    this.btn.setDepth(20)
    this.btn.setInteractive()

    this.soundConfig = scene.add.text(x, 300, "音：有り", {
      color: "teal",
      fontSize: "24px",
      fontFamily: "Meiryo",
      fontStyle: "bold",
      strokeThickness: 3,
    })
    this.soundConfig.setOrigin(0.5)
    this.soundConfig.setDepth(20)
    this.soundConfig.setInteractive()

    this.toUnvisible()
  }

  addAlpha() {
    if (this.banner.alpha < 1) {
      this.banner.alpha += 0.02
      this.btn.alpha += 0.02
      this.soundConfig.alpha += 0.02
    }
  }

  switchSoundConfigText(isMute: boolean) {
    if (isMute) {
      this.soundConfig.text = "音：無し"
    } else {
      this.soundConfig.text = "音：有り"
    }
  }

  private initAlpha() {
    this.banner.alpha = 0
    this.btn.alpha = 0
    this.soundConfig.alpha = 0
  }

  toVisible() {
    this.banner.visible = true
    this.btn.visible = true
    this.soundConfig.visible = true
  }

  toUnvisible() {
    this.banner.visible = false
    this.btn.visible = false
    this.soundConfig.visible = false
    this.initAlpha()
  }
}
