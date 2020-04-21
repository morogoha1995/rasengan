import { WIDTH } from "../constants"
import { createFontStyle } from "../utils/text"

export default class Box {
  banner: Phaser.GameObjects.Image
  btn: Phaser.GameObjects.Image
  soundConfig: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene, bannerTexuture: string, btnTexture: string) {
    const x = WIDTH / 2

    this.banner = scene.add.image(x, 130, bannerTexuture)
      .setDisplaySize(240, 100)
      .setAlpha(0)

    const btnX = x / 2
    const btnY = 240

    this.btn = scene.add.image(btnX / 2, btnY, btnTexture)
      .setDisplaySize(120, 50)
      .setAlpha(0)
      .setOrigin(0, 0.5)

    const padding = 20
    this.soundConfig = scene.add.text(btnX * 2 + padding, btnY, "音：有り", createFontStyle("teal"))
      .setOrigin(0, 0.5)
      .setAlpha(0)
  }

  switchSoundConfigText(isMute: boolean) {
    this.soundConfig.text = isMute ? "音：無し" : "音：有り"
  }

  toUnvisible() {
    this.banner.setVisible(false)
    this.btn.setVisible(false)
    this.soundConfig.setVisible(false)
  }

  tween(scene: Phaser.Scene) {
    scene.add.tween({
      targets: [this.banner, this.btn, this.soundConfig],
      duration: 1000,
      alpha: 1,
      onComplete: () => {
        this.btn.setInteractive()
        this.soundConfig.setInteractive()
      }
    })
  }
}
