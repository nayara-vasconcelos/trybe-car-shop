import HttpStatus from '../Enums/httpStatus';

export default class NotFoundError extends Error {
  public message: string;
  public status: number;

  constructor(message: string) {
    super();
    this.message = message;
    this.status = HttpStatus.NOT_FOUND;
  }
}
