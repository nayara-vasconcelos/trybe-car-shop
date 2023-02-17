import { NextFunction, Request, Response } from 'express';
import HttpStatus from '../Enums/httpStatus';
import ApiError from '../Errors/ApiError';

export default class ErrorHandler {
  public static handle(err: ApiError, _req: Request, res: Response, _next: NextFunction) {
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
}
