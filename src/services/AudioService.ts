import { Howl } from 'howler'

interface ISound {
  [trackName: string]: Howl
}

export default class AudioService {
  private sounds: ISound = {}

  constructor(
      private readonly assets_dir: string,
  ) {
  }

  load(audioList: ISound) {
    for (const name in audioList) {
      this.sounds[name] = new Howl({
        src: [this.assets_dir + audioList[name]],
      })
    }
  }

  play(track: string, volume?: number, fadeIn?: number) {
    if (!this.sounds[track]) {
      return
    }

    const idSound = this.sounds[track].play()
    if (volume !== void 0) {
      this.sounds[track].volume(volume, idSound)
    }

    if (fadeIn !== void 0) {
      this.sounds[track].fade(1, 0, fadeIn, idSound)
    }
  }
}
