import HttpStatus from '../Enums/httpStatus';

export default class InvalidError extends Error {
  public message: string;
  public status: number;

  constructor(message: string) {
    super();
    this.message = message;
    this.status = HttpStatus.UNPROCESSABLE_ENTITY;
  }
}
