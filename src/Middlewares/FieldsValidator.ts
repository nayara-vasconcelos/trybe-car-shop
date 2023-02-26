import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarValidator from '../utils/CarValidator';

export default class FieldsValidator {
  public static createCar = (req: Request, _res: Response, next: NextFunction) => {
    new CarValidator(req.body as ICar).validateAll();
    next();
  };

  public static updateCar = (req: Request, _res: Response, next: NextFunction) => {
    new CarValidator(req.body as ICar).validateAll();
    next();
  };
}
