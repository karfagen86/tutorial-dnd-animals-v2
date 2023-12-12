import KonvaService from "../services/KonvaService";
import AudioService from "../services/AudioService";
import { ISourcesResolved } from "./GameBuilder"
import { IAnimal } from "../interfaces/interface";
import AnimalFactory from "../core/AnimalFactory";

export default class Game {
  private callbackEndGame?: Function
  private countAnimals: number = 0

  constructor(
    private readonly animalFactory: AnimalFactory,
    private readonly audioService: AudioService,
    private readonly imageAnimals: ISourcesResolved,
    private readonly konvaService: KonvaService
  ) {
    this.konvaService.onSuccess(() => this.decreaseAnimalCount())
    this.start()
  }

  decreaseAnimalCount() {
    this.countAnimals--

    if (this.countAnimals === 0) {
      this.audioService.play('cheering', 1, 4000)
      if (this.callbackEndGame) this.callbackEndGame()
    }
  }

  start () {
    for (const nameAnimal in this.imageAnimals) {
      const animal: IAnimal = this.animalFactory.createAnimal(this.imageAnimals[nameAnimal])
      if (animal.images === undefined) {
        continue
      }

      this.konvaService.addAnimalToLayout(animal, animal.images)
      this.countAnimals++
    }
  }

  restart () {
    this.konvaService.clear()
    this.countAnimals = 0

    this.start()
  }

  onEndGame (callback: Function) {
    this.callbackEndGame = callback
  }
}
