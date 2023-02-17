import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarValidator from '../utils/CarValidator';

export default class FiledsValidator {
  public static createCar = (req: Request, _res: Response, next: NextFunction) => {
    new CarValidator(req.body as ICar).validateAll();
    next();
  };
}
