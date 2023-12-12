import ImageService, { IImageFilePromise } from "../services/ImageService";
import AudioService from "../services/AudioService";
import { IAnimal, ISourceBackground, ISources } from "../interfaces/interface";
import Game from "./Game";
import CanvasSizeService from "../services/CanvasService";
import AnimalFactory from "./AnimalFactory";
import KonvaService from "../services/KonvaService";

interface ISourcesPromise {
  [animalName: string]: IImageFilePromise
}

export interface ISourcesResolved {
  [animalName: string]: IAnimal;
}

export default class GameBuilder {
  private resources: ISourcesPromise = {};
  private dataAnimals: ISources = {};
  private imageBackground: Promise<HTMLImageElement> | undefined;

  constructor(
    private readonly imageService: ImageService,
    private readonly audioService: AudioService,
  ) {
  }

  loadBackground(background: Readonly<ISourceBackground>): GameBuilder {
    this.imageBackground = this.imageService.load(background.src, background.width, background.height)
    return this
  }

  loadAudio(sounds: any): GameBuilder {
    this.audioService.load(sounds)
    return this
  }

  loadImageAnimals(sourceImage: ISources): GameBuilder {
    for (const nameAnimal in sourceImage) {
      const animal = sourceImage[nameAnimal]
      this.resources[nameAnimal] = this.imageService.loadAnimal(
        animal.fileNames,
        animal.width,
        animal.height,
      )

      this.dataAnimals[nameAnimal] = animal
    }
    return this
  }

  async build(): Promise<Game> {
    let imageAnimals: ISourcesResolved = {};

    for (const animalName in this.resources) {
      const imagePromise = this.resources[animalName];
      imageAnimals[animalName] = {
        ...this.dataAnimals[animalName],
        images: {
          target: await imagePromise.target,
          glow: await imagePromise.glow,
          drop: await imagePromise.drop,
        }
      }
    }

    const imageBackground = this.imageBackground ? await this.imageBackground : new Image();

    const canvasSize = new CanvasSizeService(window.innerWidth, window.innerHeight, imageBackground)
    const animalFactory = new AnimalFactory(canvasSize)

    const konvaService = new KonvaService(this.audioService, canvasSize, imageBackground)

    return new Game(
      animalFactory,
      this.audioService,
      imageAnimals,
      konvaService,
    )
  }
}

