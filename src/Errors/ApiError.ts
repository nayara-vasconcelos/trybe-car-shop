export default class ApiError extends Error {
  public message: string;
  public status: number | null;

  constructor(message: string) {
    super();
    this.message = message;
    this.status = null;
  }
}
