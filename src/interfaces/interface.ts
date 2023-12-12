export interface IImagePath {
  target: string
  glow: string
  drop: string
}

export interface IImageFile {
  target: HTMLImageElement
  glow: HTMLImageElement
  drop: HTMLImageElement
}

export interface IAnimal {
  x: number
  y: number
  width: number
  height: number
  dropX: number
  dropY: number
  fileNames: IImagePath
  images?: IImageFile
}

export interface ISources {
  [animalName: string]: IAnimal
}

export interface ISourceBackground {
  src: string
  width: number
  height: number
}

export interface ISourceSounds {
  [trackName: string]: string
}
