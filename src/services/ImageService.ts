import { IImagePath } from "../interfaces/interface";
import { Canvg } from 'canvg';

export interface IImageFilePromise {
  target: Promise<HTMLImageElement>
  glow: Promise<HTMLImageElement>
  drop: Promise<HTMLImageElement>
}

export default class ImageService {
  constructor(
      private readonly assets_dir: string,
  ) {
  }

  private async renderSVGToCanvas(fileName: string, width: number, height: number): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.dataset.name = fileName;
    canvas.width = width;
    canvas.height = height;

    const v = await Canvg.from(ctx, this.assets_dir + fileName);
    // Start SVG rendering with animations and mouse handling.
    v.start();
    window.onbeforeunload = () => {
      v.stop();
    };

    return canvas;
  }

  async load(fileName: string, width: number, height: number): Promise<HTMLImageElement> {
    const canvas = await this.renderSVGToCanvas(fileName, width, height);

    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = canvas.toDataURL();
      image.onload = () => {
        resolve(image);
      }
      image.onerror = (err) => {
        reject(err);
      }
    })
  }

  loadAnimal(images: IImagePath, width: number, height: number): IImageFilePromise {
    return {
      target: this.load(images.target, width, height),
      glow: this.load(images.glow, width, height),
      drop: this.load(images.drop, width, height),
    }
  }
}
