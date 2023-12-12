export default class CanvasSizeService {
  public readonly canvasWidth: number
  public readonly canvasHeight: number
  public readonly aspect: number

  constructor(
    private readonly windowWidth: number,
    private readonly windowHeight: number,
    imageBackground: HTMLImageElement,
  ) {
    const canvasSize = this.getCanvasSize(imageBackground.width, imageBackground.height)
    this.canvasWidth = canvasSize.width
    this.canvasHeight = canvasSize.height

    this.aspect = imageBackground.width / canvasSize.width
  }

  getCanvasSize(imageWidth: number, imageHeight: number) {
    let width = this.windowWidth;
    let height = this.windowHeight;

    if (width > height) {
      const aspect = imageWidth / imageHeight;
      return { width: height * aspect, height };
    }

    const aspect = imageHeight / imageWidth;
    return { width, height: width * aspect };
  }
}
