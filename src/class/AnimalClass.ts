import { Image } from 'konva/lib/shapes/Image'
import Konva from 'konva'
import { IAnimal } from '../interfaces/interface'
import AudioService from '../services/AudioService'

export default class AnimalClass {
  private readonly animal: Image
  private readonly drop: Image
  private callbackDropped?: Function
  private oldX = 0
  private oldY = 0
  private width = window.innerWidth as number
  private height = window.innerWidth as number

  constructor(
    private readonly audio: AudioService,
    private readonly data: IAnimal,
    private readonly animalImage: HTMLImageElement,
    private readonly dropImage: HTMLImageElement,
    private readonly glowImage: HTMLImageElement,
  ) {
    this.animal = new Konva.Image({
      image: animalImage,
      x: data.x,
      y: data.y,
      width: data.width,
      height: data.height,
      draggable: true,
    })

    this.animal.cache()
    /** @see https://konvajs.org/docs/events/Image_Events.html */
    this.animal.drawHitFromCache()

    this.drop = new Konva.Image({
      image: this.dropImage,
      x: data.dropX,
      y: data.dropY,
      width: data.width,
      height: data.height,
    })

    this.animal.on('dragstart', this.onDragStart.bind(this))

    // check if animal is in the right spot and snap into place if it is
    this.animal.on('dragend', this.onDragEnd.bind(this))
    // make animal glow on mouseover
    this.animal.on('mouseover touchstart', this.onMouseover.bind(this))
    this.animal.on('mouseout', this.onMouseout.bind(this))
  }

  setSizeStage(width: number, height: number) {
    this.width = width
    this.height = height
  }

  onDragStart() {
    this.oldX = this.animal.x()
    this.oldY = this.animal.y()
    this.audio?.play('pop-up-on')
    document.body.style.cursor = 'grabbing'
    this.animal.moveToTop()
  }

  onDragEnd() {
    document.body.style.cursor = 'pointer'

    // Restore position
    if (this.isAnimalOutline()) {
      this.animal.x(this.oldX)
      this.animal.y(this.oldY)
      this.audio?.play('pop-down', 0.3)
      return
    }

    const x = this.animal.x()
    const y = this.animal.y()

    if (!this.isNearOutline(x, y)) {
      this.audio?.play('pop-down', 0.3)
      return
    }

    this.animal.position({
      x: this.data.dropX,
      y: this.data.dropY,
    })

    this.animal.draggable(false)
    this.animal.moveToBottom()
    this.drop.hide()

    this.animal.off('dragstart')
    this.animal.off('dragend')
    this.animal.off('mouseover')
    this.animal.off('touchstart')
    this.animal.off('mouseout')
    this.onMouseout()
    this.audio?.play('pop-up-off')

    if (this.callbackDropped) this.callbackDropped()
  }

  onMouseover() {
    this.animal.clearCache()
    this.animal.image(this.glowImage)
    this.animal.cache()
    this.animal.drawHitFromCache()

    document.body.style.cursor = 'pointer'
  }

  onMouseout() {
    this.animal.image(this.animalImage)
    this.animal.cache()
    this.animal.drawHitFromCache()

    document.body.style.cursor = 'default'
  }

  onDropped(cl: Function) {
    this.callbackDropped = cl
  }

  isAnimalOutline(): boolean {
    const x = this.animal.x()
    const y = this.animal.y()

    const halfWidth = this.animal.width() / 2
    const halfHeight = this.animal.height() / 2

    return (
      x < -halfWidth ||
      x > this.width - halfWidth ||
      y < -halfHeight ||
      y > this.height - halfHeight
    )
  }

  isNearOutline(x: number, y: number) {
    const margin = 20
    return (
      x > this.data.dropX - margin &&
      x < this.data.dropX + margin &&
      y > this.data.dropY - margin &&
      y < this.data.dropY + margin
    )
  }

  getAnimal(): Image {
    return this.animal
  }

  getDrop(): Image {
    return this.drop
  }
}
