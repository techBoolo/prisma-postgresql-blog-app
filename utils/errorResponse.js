export default class ErrorResponse extends Error {
  constructor(attr) {
    super()
    Object.assign(this, { ...attr, name: this.constructor.name })
  }
}
