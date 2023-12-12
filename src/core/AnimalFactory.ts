import randomIntFromInterval from "../helper/random";
import { IAnimal } from "../interfaces/interface";
import CanvasSizeService from "../services/CanvasService";

export default class AnimalFactory {
  constructor(
    private readonly canvasSize: CanvasSizeService,
  ) {}

  createAnimal(originalAnimal: IAnimal): IAnimal {
    const newAnimal = {...originalAnimal};

    newAnimal.dropX = newAnimal.dropX / this.canvasSize.aspect;
    newAnimal.dropY = newAnimal.dropY / this.canvasSize.aspect;

    newAnimal.width = newAnimal.width / this.canvasSize.aspect;
    newAnimal.height = newAnimal.height / this.canvasSize.aspect;

    newAnimal.x = randomIntFromInterval(0, this.canvasSize.canvasWidth - newAnimal.width);
    newAnimal.y = randomIntFromInterval(0, this.canvasSize.canvasHeight - newAnimal.height);

    // newAnimal.images = { ...originalAnimal.images }
    // newAnimal.fileNames = { ...originalAnimal.fileNames }

    return newAnimal;
  }
}
