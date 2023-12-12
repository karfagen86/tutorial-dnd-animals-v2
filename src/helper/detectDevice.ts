const detectDevice = (): boolean => {
  return /Mobi|Android/i.test(navigator.userAgent)
}

export default detectDevice
