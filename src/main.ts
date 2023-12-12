import sourceImage, { background, sounds } from './data/source'
import ImageService from './services/ImageService'
import AudioService from './services/AudioService'
import ConfettiService from "./services/ConfettiService";
import detectDevice from "./helper/detectDevice";
import GameBuilder from "./core/GameBuilder"
import './style.css'

const BASE_URL = import.meta.env.BASE_URL

const appBuilder = new GameBuilder(
  new ImageService(BASE_URL + ''),
  new AudioService(BASE_URL + 'sound/'),
);

(async () => {
  const game = await appBuilder
    .loadBackground(background)
    .loadAudio(sounds)
    .loadImageAnimals(sourceImage)
    .build()

  game.onEndGame(() => {
    ConfettiService.start(detectDevice())
    setTimeout(() => {
      ConfettiService.stop()
    }, 10000)
  })

  document.querySelector('#restart')?.addEventListener('click', () => {
    game.restart()
  })
})()
