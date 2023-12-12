import Konva from 'konva'
import { Layer } from 'konva/lib/Layer'
import { Stage } from 'konva/lib/Stage'
import { IAnimal, IImageFile } from '../interfaces/interface'
import AnimalClass from '../class/AnimalClass'
import AudioService from './AudioService'
import CanvasSizeService from "./CanvasService";

export default class KonvaService {
  private readonly stage: Stage
  private readonly animalLayer: Layer
  private readonly dropLayer: Layer
  private success: Function = () => {}

  constructor(
    private readonly audio: AudioService,
    private readonly canvasSize: CanvasSizeService,
    imageBackground: HTMLImageElement,
  ) {

    this.stage = new Konva.Stage({
      container: 'game',
      width: this.canvasSize.canvasWidth,
      height: this.canvasSize.canvasHeight,
    })

    // Add background
    const backgroundLayer = new Konva.Layer()
    backgroundLayer.add(
      new Konva.Image({
        image: imageBackground,
        width: this.canvasSize.canvasWidth,
        height: this.canvasSize.canvasHeight,
      }),
    )
    this.stage.add(backgroundLayer)

    this.dropLayer = new Konva.Layer()
    this.stage.add(this.dropLayer)

    this.animalLayer = new Konva.Layer()
    this.stage.add(this.animalLayer)
  }

  onSuccess(cl: Function) {
    this.success = cl
  }

  addAnimalToLayout(animal: IAnimal, images: IImageFile) {
    const model = new AnimalClass(this.audio, animal, images.target, images.drop, images.glow)
    model.onDropped(this.success)
    model.setSizeStage(this.stage.width(), this.stage.height())

    this.dropLayer.add(model.getDrop())
    this.animalLayer.add(model.getAnimal())
  }

  clear() {
    this.dropLayer.destroyChildren()
    this.animalLayer.destroyChildren()
  }
}
