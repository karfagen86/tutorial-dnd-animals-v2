// @ts-ignore
import confetti from 'canvas-confetti'
import randomIntFromInterval from '../helper/random'

class ConfettiService {
  private readonly defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 100,
  }
  private timerId: NodeJS.Timeout | undefined

  start(isMobileDevice: boolean) {
    this.timerId = setInterval(() => {
      let setting = Object.assign({}, this.defaults, {
        origin: {
          x: randomIntFromInterval(0.2, 0.8),
          y: isMobileDevice ? 0.1 : Math.random() + 0.1,
        },
        particleCount: isMobileDevice ? 30 : 100,
        decay: isMobileDevice ? 0.5 : 0.9,
      })

      confetti(setting)

      if (isMobileDevice) {
        return
      }

      setting.origin.x = randomIntFromInterval(0.1, 0.4)
      confetti(setting)

      setting.origin.x = randomIntFromInterval(0.6, 0.9)
      confetti(setting)
    }, 250)
  }
  stop() {
    clearInterval(this.timerId)
  }
}

export default new ConfettiService()
