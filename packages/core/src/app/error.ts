export class HttpError extends Error {
  public readonly status: number

  public constructor(message?: string, status = 400) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

export default HttpError
