import { ISourceBackground, ISources, ISourceSounds } from '../interfaces/interface'

// SVG images must specify a width and height in the root <svg> element.
// @see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#drawing_images
const background: Readonly<ISourceBackground> = {
  src: 'background.svg',
  width: 3200,
  height: 2400,
}

const sounds: Readonly<ISourceSounds> = {
  'pop-up-off': 'pop-up-off.mp3',
  'pop-up-on': 'pop-up-on.mp3',
  'pop-down': 'pop-down.mp3',
  cheering: 'kids_cheering.mp3',
}

export { background, sounds }

const dataAnimals: Readonly<ISources> = {
  monkey: {
    x: 0,
    y: 0,
    width: 322.1,
    height: 473.3,
    dropX: 1851,
    dropY: 450,
    fileNames: {
      target: 'monkey.svg',
      glow: 'monkey-glow.svg',
      drop: 'monkey-drop-zone.svg',
    },
  },
  lizard: {
    x: 0,
    y: 0,
    width: 187,
    height: 155,
    dropX: 2822,
    dropY: 406,
    fileNames: {
      target: 'lizard.svg',
      glow: 'lizard-glow.svg',
      drop: 'lizard-drop-zone.svg',
    },
  },
  elephant: {
    x: 0,
    y: 0,
    width: 636,
    height: 880,
    dropX: 2179,
    dropY: 1153,
    fileNames: {
      target: 'elephant.svg',
      glow: 'elephant-glow.svg',
      drop: 'elephant-drop-zone.svg',
    },
  },
  lion: {
    x: 0,
    y: 0,
    width: 714,
    height: 614,
    dropX: 1596,
    dropY: 1484,
    fileNames: {
      target: 'lion.svg',
      glow: 'lion-glow.svg',
      drop: 'lion-drop-zone.svg',
    },
  },
  zebra: {
    x: 0,
    y: 0,
    width: 647,
    height: 958,
    dropX: 884,
    dropY: 1238,
    fileNames: {
      target: 'zebra.svg',
      glow: 'zebra-glow.svg',
      drop: 'zebra-drop-zone.svg',
    },
  },
  pandajir: {
    x: 0,
    y: 0,
    width: 662,
    height: 1253,
    dropX: 326,
    dropY: 835,
    fileNames: {
      target: 'panda-jir.svg',
      glow: 'panda-jir-glow.svg',
      drop: 'panda-jir-drop-zone.svg',
    },
  },
  koala: {
    x: 0,
    y: 0,
    width: 251,
    height: 366,
    dropX: 188,
    dropY: 567,
    fileNames: {
      target: 'koala.svg',
      glow: 'koala-glow.svg',
      drop: 'koala-drop-zone.svg',
    },
  },
}

export default dataAnimals
